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
  const [error, setError] = useState<string | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [previousId, setPreviousId] = useState<string | null>(null);

  // 질문 리스트 상태
  const [interviewData, setInterviewData] = useState<
    { questionNumber: string; question: string; answer?: string }[]
  >([]);

  const { enterprise } = useParams<{ enterprise?: string }>();
  const slug = enterprise?.toLowerCase() ?? '';
  const displayName = ENTERPRISE_MAP[slug] || '알 수 없음 기업';

  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          'http://localhost:8081/api/interview/start',
          {
            enterpriseName: displayName,
          }
        );
        const data = res.data.data;

        // 세션ID, 이전 질문ID(fieldId), 첫 질문 세팅
        setSessionId(data.sessionId);
        setPreviousId(data.fieldId);

        setInterviewData([
          {
            questionNumber: data.questionNumber,
            question: data.question,
          },
        ]);
      } catch {
        setError('면접 시작에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (displayName !== '알 수 없음 기업') {
      startInterview();
    } else {
      setError('기업명이 올바르지 않습니다.');
      setIsLoading(false);
    }
  }, [displayName]);

  const fetchNewQuestion = async () => {
    if (!sessionId || !previousId) {
      setError('세션 정보가 올바르지 않습니다.');
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

      // 새 질문을 질문 리스트에 추가
      setInterviewData((prev) => [
        ...prev,
        {
          questionNumber: data.questionNumber,
          question: data.question,
        },
      ]);

      // 이전 질문 ID 갱신
      setPreviousId(data.fieldId);
    } catch {
      setError('새로운 질문 요청에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        면접을 시작하는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-600">
        {error}
      </div>
    );
  }

  // TODO: 남은 질문 수 계산 로직 적용 필요 (현재 고정값)
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
          {interviewData.map(({ questionNumber, question }, index) => (
            <div key={questionNumber}>
              <ChatBubble
                type="question"
                content={`${questionNumber}. ${question}`}
              />
              {/* 답변은 필요시 추가 가능 */}
              {index === interviewData.length - 1 && (
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium"
                    onClick={fetchNewQuestion}
                  >
                    새로운 질문
                  </button>
                  <button className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium">
                    연계 질문
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 mb-9">
          <AnswerInput value={answer} onChange={setAnswer} />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
