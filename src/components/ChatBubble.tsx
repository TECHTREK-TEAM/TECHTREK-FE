// components/ChatBubble.tsx
import React from 'react';

interface ChatBubbleProps {
  type: 'question' | 'answer'; // 말풍선 유형
  content: string; // 말풍선 텍스트 내용
  highlight?: boolean; // 강조 표시 여부 (선택적)
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  type,
  content,
  highlight = false,
}) => {
  // 말풍선의 배경 및 텍스트 색상 클래스 지정
  const baseStyle =
    type === 'question' ? 'bg-white text-basic' : 'bg-brandcolor text-white';

  // 강조 테두리 스타일 조건부 추가
  const highlightStyle = highlight ? 'border border-red-600' : '';

  return (
    <div
      className={`rounded-xl px-4 py-2 max-w-[80%] text-contentsize1 ${baseStyle} ${highlightStyle}`}
    >
      <p className="text-contentsize1">{content}</p>
    </div>
  );
};

export default ChatBubble;
