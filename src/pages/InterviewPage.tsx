import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';
import InterviewTitle from '../components/InterviewTitle';
import ChatBubble from '../components/ChatBubble';
import AnswerInput from '../components/Interviews/AnswerInput';
import { companyMap } from '../constants/companyMap';

const InterviewPage = () => {
  const navigate = useNavigate();

  // 상수
  const REMAINING_QUESTIONS = 9;

  // 기업이름
  const { enterprise } = useParams<{ enterprise?: string }>();
  const company = enterprise ? companyMap[enterprise.toUpperCase()] : undefined;

  // 질문 데이터
  const [currentQuestionType, setCurrentQuestionType] = useState<'basic' | 'resume' | 'tail'>('basic');
  const [isResume, setIsResume] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [interviewData, setInterviewData] = useState<{ questionNumber: string; question: string; answer?: string }[]>([]);

  // 로딩
  const [isStarting, setIsStarting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 분석용 시간
  const [startTime, setStartTime] = useState<number | null>(null);

  // alert중복 실행 방지
  const hasStarted = useRef(false);

  // 면접 시작 API
  useEffect(() => {
    // 이미 실행되었으면 종료
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startInterview = async () => {
      setIsStarting(true);
      //setIsLoading(true);
      try {
        // 면접 시작 API
        const res = await axios.post(
          'http://localhost:8080/api/interview/start',
          {
            enterpriseName: company?.enterprise,
          }
        );
        // 응답
        const data = res.data.data;
        setSessionId(data.sessionId);
        setFieldId(data.fieldId);
        setParentId(data.fieldId);
        setPreviousId(null);
        setCurrentQuestionType('basic');
        setIsResume(data.resumeStatus);
        setStartTime(Date.now());
        setInterviewData([
          {
            questionNumber: data.questionNumber,
            question: data.question,
          },
        ]);
      } catch {
        alert('면접 시작에 실패했습니다.');
        navigate('/');
      } finally {
        setIsStarting(false);
        //setIsLoading(false);
      }
    };

    if (company?.enterprise !== '알 수 없음 기업') {
      startInterview();
    } else {
      alert('기업명이 올바르지 않습니다.');
      //setIsLoading(false);
    }
  }, [company?.enterprise]);

  // 기본 질문 API
  const fetchBasicQuestion = async () => {
    if (!sessionId || !fieldId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    try {
      // 새 질문 자리 임시 말풍선 추가
      setInterviewData((prev) => [
        ...prev,
        { questionNumber: '', question: '질문 생성 중...' },
      ]);

      const res = await axios.post(
        'http://localhost:8080/api/interview/questions/basic',
        {
          sessionId
        }
      );
      // 응답
      const data = res.data.data;
      setFieldId(data.fieldId);
      setParentId(data.fieldId);
      setPreviousId(null);
      setCurrentQuestionType('basic');

      // 마지막 항목을 실제 질문으로 교체
      setInterviewData((prev) =>
          prev.map((item, idx) =>
              idx === prev.length - 1
                  ? { questionNumber: data.questionNumber, question: data.question }
                  : item
          )
      );
    } catch {
      alert('새로운 질문 요청에 실패했습니다.');
    }

  };

  // 이력서 질문 API
  const fetchResumeQuestion = async () => {
    if (!sessionId || !fieldId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    // 이력서 존재 여부 체크
    if (!isResume) {
      alert('이력서가 존재하지 않습니다. 내 정보에서 이력서를 업로드 해주세요!');
      return;
    }

    try {
      // 새 질문 자리 임시 말풍선 추가
      setInterviewData((prev) => [
        ...prev,
        { questionNumber: '', question: '질문 생성 중...' },
      ]);

      const res = await axios.post(
          'http://localhost:8080/api/interview/questions/resume',
          {
            sessionId
          }
      );
      // 응답
      const data = res.data.data;
      setFieldId(data.fieldId);
      setParentId(data.fieldId);
      setPreviousId(null);
      setCurrentQuestionType('resume');

      // 마지막 항목을 실제 질문으로 교체
      setInterviewData((prev) =>
          prev.map((item, idx) =>
              idx === prev.length - 1
                  ? { questionNumber: data.questionNumber, question: data.question }
                  : item
          )
      );
    } catch {
      alert('새로운 질문 요청에 실패했습니다.');
    }

  };

  // 꼬리 질문 API
  const fetchTailQuestion = async () => {
    if (!sessionId || (!previousId && !parentId)) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    try {
      let requestBody: { sessionId: string; parentId?: string; previousId?: string };

      if (!previousId) {
        // 첫 번째 꼬리 질문
        requestBody = {
          sessionId,
          parentId: parentId!,
        };
      } else {
        // 두 번째 이후 꼬리 질문
        requestBody = {
          sessionId,
          previousId,
        };
      }

      // 새 질문 자리 임시 말풍선 추가
      setInterviewData((prev) => [
        ...prev,
        { questionNumber: '', question: '질문 생성 중...' },
      ]);

      const res = await axios.post(
          'http://localhost:8080/api/interview/questions/tail',
          requestBody
      );

      // 응답
      const data = res.data.data;
      setFieldId(data.fieldId);
      setPreviousId(data.fieldId); // 이전 질문 업데이트
      if (!parentId) setParentId(data.fieldId); // 첫 꼬리 질문이면 parentId도 설정
      setCurrentQuestionType('tail');

      // 마지막 항목을 실제 질문으로 교체
      setInterviewData((prev) =>
          prev.map((item, idx) =>
              idx === prev.length - 1
                  ? {
                    questionNumber: `${data.parentQuestionNumber}-${data.tailQuestionNumber}`,
                    question: data.question,
                  }
                  : item
          )
      );
    } catch {
      alert('연계 질문 요청에 실패했습니다.');
    }
  };

  // 답변 API
  const handleSubmitAnswer = async () => {
    if (!sessionId || !fieldId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    if (answer.trim().length === 0) {
      alert('답변을 입력해주세요.');
      return;
    }

    if (answer.length > 300) {
      alert('답변은 300자 이내로 작성해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        'http://localhost:8080/api/interview/answers',
        {
          sessionId,
          fieldId: fieldId,
          type: currentQuestionType,
          answer: answer.trim(),
        }
      );

      // 응답 성공 시, 마지막 질문에 답변 저장
      if (res.data.success) {
        setInterviewData((prev) =>
          prev.map((item, idx) =>
            idx === prev.length - 1 ? { ...item, answer: answer.trim() } : item
          )
        );
        setAnswer('');
      } else {
        alert('답변 등록에 실패했습니다.');
      }
    } catch {
      alert('답변 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 분석 요청 핸들러 함수 추가
  const handleAnalyze = async () => {
    if (!sessionId || interviewData.length === 0 || !startTime) {
      alert('분석을 위한 정보가 부족합니다.');
      return;
    }

    const elapsedMs = Date.now() - startTime;
    const duration = Math.floor(elapsedMs / 1000 / 60); // 분 단위

    // 최소 1분 이상 진행해야 분석 가능
    if (elapsedMs < 60 * 1000) {
      alert('분석을 위해서는 최소 1분 이상 면접을 진행해야 합니다.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/analyses', {
        sessionId,
        duration,
      });

      console.log('분석 응답 데이터:', res.data);

      if (res.data.success) {
        navigate(`/interview/${company?.enterprise}/result`, {
          state: { result: res.data.data },
        });
      } else {
        alert('분석에 실패했습니다.');
      }
    } catch {
      alert('분석 요청에 실패했습니다.');
    } finally {
     //  setIsLoading(false);
    }
  };

  // 면접 시작 시, 로딩
  if (isStarting) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        면접을 시작하는 중입니다...
      </div>
    );
  }

  return (
    <div className="h-[900px] 2xl:h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />
      <div className="w-full h-[100px] flex justify-between 2xl:h-[150px]">
        <p className="px-8 pt-8 font-medium text-contentsize1">
          분석하려면 {REMAINING_QUESTIONS} 개의 질문이 남았어요
        </p>
        <button className="px-8 pt-8 h-fit">
          <img src={leftArrowIcon} alt="나가기 버튼" />
        </button>
      </div>

      <div className="h-[550px] 2xl:h-[700px] mx-[270px] px-[50px] bg-white rounded-[10px] 2xl:mb-[150px] 2xl:mx-[300px] flex flex-col justify-between">
        <InterviewTitle>{company?.name} 기술면접</InterviewTitle>
        <div className="flex-1 overflow-y-auto px-[20px] pt-[30px] space-y-10 scrollbar-hide">
          {interviewData.map(({ questionNumber, question, answer }, index) => (
            <div key={questionNumber}>
              <ChatBubble
                type="question"
                content={questionNumber ? `${questionNumber}. ${question}` : question}
              />
              {answer && <ChatBubble type="answer" content={answer} />}

              {/* 마지막 질문이며 답변이 있을 때만 버튼 노출 */}
              {index === interviewData.length - 1 && answer && (
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium"
                        onClick={fetchBasicQuestion}
                    >
                      기본 질문
                    </button>
                    <button
                        className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium"
                        onClick={fetchResumeQuestion}
                    >
                      이력서 질문
                    </button>
                    <button
                        className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium"
                        onClick={fetchTailQuestion}
                    >
                      연계 질문
                    </button>
                  </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 mb-9">
          <AnswerInput
              value={answer}
              onChange={setAnswer}
              onSubmit={handleSubmitAnswer}
              onAnalyze={handleAnalyze} // 분석 버튼 핸들러 추가
              isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
