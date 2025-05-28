// components/ChatBubble.tsx
type ChatBubbleProps = {
  type: 'question' | 'answer';
  content: string;
  highlight?: boolean;
};

export const ChatBubble = ({ type, content, highlight }: ChatBubbleProps) => (
  <div
    className={`rounded-xl px-4 py-2 max-w-[80%] ${type === 'question' ? 'bg-white' : 'bg-brandcolor text-white'} ${highlight ? 'border border-red-600' : ''}`}
  >
    <p className="text-sm">{content}</p>
  </div>
);
