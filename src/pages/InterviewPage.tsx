import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';
import InterviewTitle from '../components/InterviewTitle';
import ChatBubble from '../components/ChatBubble';
import AnswerInput from '../components/Interviews/AnswerInput';

const ENTERPRISE_MAP: Record<string, string> = {
  NAVER: '네이버',
  KAKAO: '카카오',
  SAMSUNG: '삼성전자',
  COUPANG: '쿠팡',
  TOSS: '토스',
  DANGGEUN_MARKET: '당근마켓',
  BAEMIN: '배달의민족',
  NEXON: '넥슨'
};

const InterviewPage = () => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [isTailQuestion, setIsTailQuestion] = useState(false);
  const [interviewData, setInterviewData] = useState<
    { questionNumber: string; question: string; answer?: string }[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null); // 분석용 시작 시간
  const { enterprise } = useParams<{ enterprise?: string }>();
  const navigate = useNavigate();
  const slug = enterprise?.toLowerCase() ?? '';
  console.log(ENTERPRISE_MAP[slug]);
  const displayName = ENTERPRISE_MAP[slug] || '알 수 없음 기업';
  console.log(displayName);

  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      try {
        // 면접 시작 API
        // 기업명을 전달하여 면접 세션을 생성하고 첫 질문을 받아옴
        const res = await axios.post(
          'http://localhost:8080/api/interview/start',
          {
            enterpriseName: displayName,
          }
        );
        const data = res.data.data;

        // 응답: sessionId, fieldId(첫 질문), question, questionNumber
        setSessionId(data.sessionId);
        setPreviousId(data.fieldId);
        setParentId(null);
        setIsTailQuestion(false);
        setStartTime(Date.now()); // 시작 시간 기록

        setInterviewData([
          {
            questionNumber: data.questionNumber,
            question: data.question,
          },
        ]);
      } catch {
        alert('면접 시작에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (displayName !== '알 수 없음 기업') {
      startInterview();
    } else {
      alert('기업명이 올바르지 않습니다.');
      setIsLoading(false);
    }
  }, [displayName]);

  const fetchNewQuestion = async () => {
    if (!sessionId || !previousId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    try {
      // 새로운 질문 요청 API
      // 직전 질문의 fieldId를 바탕으로 새로운 질문을 요청
      const correctedPreviousId =
        isTailQuestion && parentId ? parentId : previousId;

      const res = await axios.post(
        'http://localhost:8080/api/interview/questions/new',
        {
          sessionId,
          previousId: correctedPreviousId,
        }
      );
      const data = res.data.data;

      // 응답: 새 질문 내용, fieldId, questionNumber
      setInterviewData((prev) => [
        ...prev,
        {
          questionNumber: data.questionNumber,
          question: data.question,
        },
      ]);

      setPreviousId(data.fieldId);
      setParentId(null);
      setIsTailQuestion(false);
    } catch {
      alert('새로운 질문 요청에 실패했습니다.');
    }
  };

  const fetchTailQuestion = async () => {
    if (!sessionId || !previousId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    // 꼬리 질문 요청 API
    // parentId 기준으로 꼬리 질문을 요청 (이전 질문과의 연관성 유지)
    const requestBody: {
      sessionId: string;
      parentId: string;
      previousId?: string;
    } = {
      sessionId,
      parentId: parentId ?? previousId,
    };

    if (parentId) requestBody.previousId = previousId!;

    try {
      const res = await axios.post(
        'http://localhost:8080/api/interview/questions/tail',
        requestBody
      );
      const data = res.data.data;

      // 응답: 꼬리 질문, fieldId, parentQuestionNumber, tailQuestionNumber
      setInterviewData((prev) => [
        ...prev,
        {
          questionNumber: `${data.parentQuestionNumber}-${data.tailQuestionNumber}`,
          question: data.question,
        },
      ]);

      setPreviousId(data.fieldId);
      setParentId(requestBody.parentId);
      setIsTailQuestion(true);
    } catch {
      alert('연계 질문 요청에 실패했습니다.');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!sessionId || !previousId) {
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

    setIsLoading(true);

    try {
      // 답변 제출 API
      // 현재 질문의 fieldId와 세션 정보를 바탕으로 답변을 제출
      const res = await axios.post(
        'http://localhost:8080/api/interview/answers',
        {
          sessionId,
          fieldId: previousId,
          type: isTailQuestion ? 'tail' : 'new',
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
      setIsLoading(false);
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

    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:8080/api/analyses', {
        sessionId,
        duration,
      });

      console.log('분석 응답 데이터:', res.data);

      if (res.data.success) {
        navigate(`/interview/${slug}/result`, {
          state: { result: res.data.data },
        });
      } else {
        alert('분석에 실패했습니다.');
      }
    } catch {
      alert('분석 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        면접을 시작하는 중입니다...
      </div>
    );
  }

  const REMAINING_QUESTIONS = 9;

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
        <InterviewTitle>{displayName} 기술면접</InterviewTitle>
        <div className="flex-1 overflow-y-auto px-[20px] pt-[30px] space-y-10 scrollbar-hide">
          {interviewData.map(({ questionNumber, question, answer }, index) => (
            <div key={questionNumber}>
              <ChatBubble
                type="question"
                content={`${questionNumber}. ${question}`}
              />
              {answer && <ChatBubble type="answer" content={answer} />}

              {/* 마지막 질문이며 답변이 있을 때만 버튼 노출 */}
              {index === interviewData.length - 1 && answer && (
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium"
                    onClick={fetchNewQuestion}
                  >
                    새로운 질문
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
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
