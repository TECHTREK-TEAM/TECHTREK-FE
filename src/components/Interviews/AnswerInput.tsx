import React from 'react';
import upArrowIcon from '../../assets/icons/upArrowIcon.svg';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative w-full h-[150px] border border-gray-300 rounded-lg px-4 py-2 bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '답변을 입력하세요'}
        className="w-full h-full resize-none outline-none text-contentsize1 pr-[140px] leading-[1.5] text-left"
      />

      {/* 버튼 그룹 */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button className="text-contentsize1 h-8 px-3 bg-white border-[1px] text-brandcolor font-medium border-gray-300 rounded-md">
          분석하기
        </button>
        <button className="text-contentsize1 h-8 px-3 bg-brandcolor text-white rounded-md">
          <img
            src={upArrowIcon}
            alt="입력 아이콘"
            className="h-[14px] w-[11px]"
          />
        </button>
      </div>
    </div>
  );
};

export default AnswerInput;
