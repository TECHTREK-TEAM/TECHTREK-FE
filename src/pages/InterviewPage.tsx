import { useState } from 'react';
import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';
import InterviewTitle from '../components/InterviewTitle';
import ChatBubble from '../components/ChatBubble';
import AnswerInput from '../components/Interviews/AnswerInput';

// 임의값
const ENTERPRISE_NAME = '네이버';
const REMAINING_QUESTIONS = 9;
const SAMPLE_QUESTION = '1. HTTP와 HTTPS의 차이를 설명하세요.';
const SAMPLE_ANSWER =
  'HTTP는 데이터를 암호화하지 않고 평문으로 전송하는 프로토콜로, 중간에서 데이터가 가로채일 수 있습니다. 반면, HTTPS는 SSL/TLS를 사용해 데이터를 암호화하여 안전하게 전송합니다. HTTP는 80번 포트를 사용하고, HTTPS는 443번 포트를 사용합니다. 즉, HTTPS는 보안이 강화된 HTTP로, 민감한 정보를 안전하게 전달할 수 있습니다.';

const InterviewPage = () => {
  const [answer, setAnswer] = useState('');

  return (
    <div className="min-h-screen max-h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />

      <div className="w-full h-[100px] flex justify-between 2xl:h-[150px]">
        <p className="px-8 pt-8 font-medium text-contentsize1">
          분석하려면 {REMAINING_QUESTIONS} 개의 질문이 남았어요
        </p>
        <button className="px-8 pt-8 h-fit">
          <img src={leftArrowIcon} alt="나가기 버튼" />
        </button>
      </div>

      <div className="h-[450px] 2xl:h-[700px] mx-[270px] px-[50px] bg-white rounded-[10px] 2xl:mb-[150px] 2xl:mx-[300px] flex flex-col justify-between">
        <InterviewTitle>{ENTERPRISE_NAME} 기술면접</InterviewTitle>

        <div className="flex-1 overflow-y-auto px-[20px] pt-[30px]">
          <ChatBubble type="question" content={SAMPLE_QUESTION} />
          <ChatBubble type="answer" content={SAMPLE_ANSWER} />
        </div>

        <div className="mt-4 mb-9">
          <AnswerInput value={answer} onChange={setAnswer} />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
