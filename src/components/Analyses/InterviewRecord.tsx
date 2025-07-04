import InterviewTitle from '../../components/InterviewTitle';
import ChatBubble from '../../components/ChatBubble';

const InterviewRecord = () => {
  // 상수 정의
  const ENTERPRISE_NAME = '네이버';

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

  return (
    <div className="w-full h-[655px] mt-5 px-[50px] bg-white rounded-2xl flex flex-col justify-between">
      <InterviewTitle>{ENTERPRISE_NAME} 기술면접</InterviewTitle>

      <div className="flex-1 overflow-y-auto px-[20px] pt-[30px] space-y-6">
        {interviewData.map(({ questionNumber, question, answer }) => (
          <div key={questionNumber}>
            <ChatBubble
              type="question"
              content={`${questionNumber}. ${question}`}
            />
            <ChatBubble type="answer" content={answer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewRecord;
