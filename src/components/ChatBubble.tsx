import React from 'react';
import questionBubbleIcon from '../assets/icons/questionBubbleIcon.svg';

interface ChatBubbleProps {
  type: 'question' | 'answer';
  content: string;
  highlight?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  type,
  content,
  highlight = false,
}) => {
  const baseStyle =
    type === 'question'
      ? 'bg-white text-basic pb-6 font-medium text-contentsize2'
      : 'bg-brandcolor text-white px-9 py-6 font-light text-contentsize1';

  const highlightStyle = highlight ? 'border border-red-600' : '';

  return (
    <div className={`rounded-xl max-w-[100%] ${baseStyle} ${highlightStyle}`}>
      {type === 'question' ? (
        <div className="flex items-center gap-2">
          <img
            src={questionBubbleIcon}
            className="mt-[2px] w-[40px] h-[40px]"
          />
          <p className="text-left">{content}</p>
        </div>
      ) : (
        <p className="text-left">{content}</p>
      )}
    </div>
  );
};

export default ChatBubble;
