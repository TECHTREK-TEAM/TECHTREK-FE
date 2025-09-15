import InterviewTitle from '../../components/InterviewTitle';
import ChatBubble from '../../components/ChatBubble';

interface InterviewDataItem {
  questionNumber: string | number;
  question: string;
  answer: string;
}

interface InterviewRecordProps {
  interviewData: InterviewDataItem[];
  enterprise: string;
}

const InterviewRecord = ({
  interviewData,
  enterprise,
}: InterviewRecordProps) => {
  return (
    <div className="w-full h-[655px] mt-5 px-[50px] bg-white rounded-2xl flex flex-col justify-between">
      <InterviewTitle>{enterprise} 기술면접</InterviewTitle>

      <div className="flex-1 overflow-y-auto px-[20px] pt-[30px] space-y-10 scrollbar-hide">
        {interviewData.map(({ questionNumber, question, answer }) => (
          <div
            key={questionNumber}
            className={
              typeof questionNumber === 'string' && questionNumber.includes('-')
                ? 'ml-12'
                : ''
            }
          >
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
