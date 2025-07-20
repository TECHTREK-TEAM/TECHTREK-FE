import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';
import InterviewTitle from '../components/InterviewTitle';
import ChatBubble from '../components/ChatBubble';
import AnswerInput from '../components/Interviews/AnswerInput';

// URL 파라미터로 전달되는 기업명(영문)을 한글명으로 매핑
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
  const [answer, setAnswer] = useState(''); // 사용자의 답변 상태 관리
  const [isLoading, setIsLoading] = useState(true); // API 호출 및 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  // URL에서 enterprise 파라미터 추출 (ex: /interview/napver)
  const { enterprise } = useParams<{ enterprise?: string }>();
  const slug = enterprise?.toLowerCase() ?? '';
  const displayName = ENTERPRISE_MAP[slug] || '알 수 없음 기업';

  useEffect(() => {
    // 면접 시작 API 호출
    const startInterview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await axios.post('http://localhost:8081/api/interview/start', {
          enterpriseName: displayName, // 한글 기업명 전달
        });
      } catch {
        setError('면접 시작에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    // 매핑된 기업명이 유효한 경우에만 API 호출
    if (displayName !== '알 수 없음 기업') {
      startInterview();
    } else {
      setError('기업명이 올바르지 않습니다.');
      setIsLoading(false);
    }
  }, [displayName]);

  const REMAINING_QUESTIONS = 9;

  // 임시로 하드코딩된 질문 및 답변 데이터
  const interviewData = [
    {
      questionNumber: 1,
      question: 'HTTP와 HTTPS의 차이를 설명하세요.',
      answer:
        'HTTP는 데이터를 암호화하지 않고 평문으로 전송하는 프로토콜로, 중간에서 데이터가 가로채일 수 있습니다. 반면, HTTPS는 SSL/TLS를 사용해 데이터를 암호화하여 안전하게 전송합니다. HTTP는 80번 포트를 사용하고, HTTPS는 443번 포트를 사용합니다. 즉, HTTPS는 보안이 강화된 HTTP로, 민감한 정보를 안전하게 전달할 수 있습니다.',
    },
    {
      questionNumber: 2,
      question: 'HTTP와 HTTPS의 차이를 설명하세요.',
      answer:
        'HTTP는 데이터를 암호화하지 않고 평문으로 전송하는 프로토콜로, 중간에서 데이터가 가로채일 수 있습니다. 반면, HTTPS는 SSL/TLS를 사용해 데이터를 암호화하여 안전하게 전송합니다. HTTP는 80번 포트를 사용하고, HTTPS는 443번 포트를 사용합니다. 즉, HTTPS는 보안이 강화된 HTTP로, 민감한 정보를 안전하게 전달할 수 있습니다.',
    },
  ];

  // 로딩 중 UI 렌더링
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        면접을 시작하는 중입니다...
      </div>
    );
  }

  // 에러 발생 시 UI 렌더링
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-600">
        {error}
      </div>
    );
  }

  // 메인 UI 렌더링
  return (
    <div className="h-[900px] 2xl:h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />

      {/* 상단 남은 질문 수 및 나가기 버튼 영역 */}
      <div className="w-full h-[100px] flex justify-between 2xl:h-[150px]">
        <p className="px-8 pt-8 font-medium text-contentsize1">
          분석하려면 {REMAINING_QUESTIONS} 개의 질문이 남았어요
        </p>
        <button className="px-8 pt-8 h-fit">
          <img src={leftArrowIcon} alt="나가기 버튼" />
        </button>
      </div>

      {/* 면접 질문 및 답변 영역 */}
      <div className="h-[550px] 2xl:h-[700px] mx-[270px] px-[50px] bg-white rounded-[10px] 2xl:mb-[150px] 2xl:mx-[300px] flex flex-col justify-between">
        <InterviewTitle>{displayName} 기술면접</InterviewTitle>

        <div className="flex-1 overflow-y-auto px-[20px] pt-[30px] space-y-10 scrollbar-hide">
          {interviewData.map(({ questionNumber, question, answer }, index) => (
            <div key={questionNumber}>
              <ChatBubble
                type="question"
                content={`${questionNumber}. ${question}`}
              />
              <ChatBubble type="answer" content={answer} />

              {index === interviewData.length - 1 && (
                <div className="flex justify-end gap-2 mt-4">
                  <button className="text-contentsize1 h-8 px-4 bg-white border border-gray-300 text-brandcolor rounded-md font-medium">
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

        {/* 답변 입력 컴포넌트 */}
        <div className="mt-4 mb-9">
          <AnswerInput value={answer} onChange={setAnswer} />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
