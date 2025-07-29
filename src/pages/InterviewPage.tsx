import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';
import InterviewTitle from '../components/InterviewTitle';
import ChatBubble from '../components/ChatBubble';
import AnswerInput from '../components/Interviews/AnswerInput';

const ENTERPRISE_MAP: Record<string, string> = {
  naver: '네이버',
  kakao: '카카오',
  samsung: '삼성전자',
  coupang: '쿠팡',
  toss: '토스',
  dangguen: '당근마켓',
  pob: '배달의민족',
  nexon: '넥슨',
};

const InterviewPage = () => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null); // 꼬리 질문의 부모 필드ID 저장
  const [isTailQuestion, setIsTailQuestion] = useState<boolean>(false); // 꼬리 질문 모드 여부

  const [interviewData, setInterviewData] = useState<
    { questionNumber: string; question: string; answer?: string }[]
  >([]);

  const { enterprise } = useParams<{ enterprise?: string }>();
  const slug = enterprise?.toLowerCase() ?? '';
  const displayName = ENTERPRISE_MAP[slug] || '알 수 없음 기업';

  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          'http://localhost:8081/api/interview/start',
          {
            enterpriseName: displayName,
          }
        );
        const data = res.data.data;

        setSessionId(data.sessionId);
        setPreviousId(data.fieldId);

        // 꼬리 질문 시작 전이므로 parentId는 null 초기화
        setParentId(null);
        setIsTailQuestion(false);

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
      const res = await axios.post(
        'http://localhost:8081/api/interview/questions/new',
        {
          sessionId,
          previousId,
        }
      );
      const data = res.data.data;

      setInterviewData((prev) => [
        ...prev,
        {
          questionNumber: data.questionNumber,
          question: data.question,
        },
      ]);

      setPreviousId(data.fieldId);
      setParentId(null); // 새로운 질문이므로 꼬리 질문 초기화
      setIsTailQuestion(false);
    } catch {
      alert('새로운 질문 요청에 실패했습니다.');
    }
  };

  // 연계질문 요청 API
  const fetchTailQuestion = async () => {
    if (!sessionId || !previousId) {
      alert('세션 정보가 올바르지 않습니다.');
      return;
    }

    try {
      // 최초 꼬리질문 요청 시 parentId가 null이면 previousId를 부모로 설정
      // 이후 꼬리질문 요청 시 parentId는 고정 유지
      const requestBody: {
        sessionId: string;
        parentId: string;
        previousId?: string;
      } = {
        sessionId,
        parentId: parentId ?? previousId,
      };

      if (parentId) {
        // 꼬리의 꼬리질문일 경우 previousId 포함
        requestBody.previousId = previousId!;
      }

      const res = await axios.post(
        'http://localhost:8081/api/interview/questions/tail',
        requestBody
      );
      const data = res.data.data;

      setInterviewData((prev) => [
        ...prev,
        {
          questionNumber: `${data.parentQuestionNumber}-${data.tailQuestionNumber}`,
          question: data.question,
        },
      ]);

      setPreviousId(data.fieldId); // 꼬리질문 마지막 fieldId 갱신
      setParentId(requestBody.parentId); // 부모 fieldId 고정
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
      const res = await axios.post(
        'http://localhost:8081/api/interview/answers',
        {
          sessionId,
          fieldId: previousId,
          type: isTailQuestion ? 'tail' : 'new',
          answer: answer.trim(),
        }
      );

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
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
