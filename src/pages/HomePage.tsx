import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import { ChatBubble } from '../components/Chatbubble';

function HomePage() {
  return (
    <div className="min-h-[2000px] flex flex-col">
      <Topbar />
      <div className="h-screen w-[600px] flex flex-col justify-center items-center">
        <ProgressBar percentage={65} />
        <div className="w-full h-[500px] flex gap-5 flex-col justify-center items-center">
          <ChatBubble type="question" content="자기소개 해주세요" />
          <ChatBubble
            type="answer"
            content="저는 프론트엔드 개발자이며..."
            highlight
          />
          <ChatBubble type="answer" content="저는 프론트엔드 개발자이며..." />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
