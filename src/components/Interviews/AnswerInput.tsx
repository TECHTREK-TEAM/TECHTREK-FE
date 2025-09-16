import upArrowIcon from '../../assets/icons/upArrowIcon.svg';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit: () => void;
  onAnalyze?: () => void; // 분석 버튼 클릭 시 실행할 콜백
  isSubmitting?: boolean;
}

function AnswerInput({
  value,
  onChange,
  placeholder,
  onSubmit,
  onAnalyze, // 분석 콜백 추가
  isSubmitting = false,
}: AnswerInputProps) {
  return (
    <div className="relative w-full h-[150px] border border-gray-300 rounded-lg px-4 py-2 bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '답변을 입력하세요'}
        data-gramm="false"
        className="w-full h-full resize-none outline-none text-contentsize1 leading-[1.5] text-left pb-10"
      />

      {/* 버튼 그룹 */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button
          className="text-contentsize1 h-8 px-3 bg-white border-[1px] text-brandcolor font-medium border-gray-300 rounded-md"
          onClick={onAnalyze} // 분석 버튼 누르면 실행됨
        >
          분석하기
        </button>
        <button
          className="text-contentsize1 h-8 px-3 bg-brandcolor text-white rounded-md flex items-center justify-center"
          onClick={onSubmit}
          disabled={isSubmitting} // 제출 중엔 버튼 비활성화
        >
          {isSubmitting ? (
            '제출중...'
          ) : (
            <img
              src={upArrowIcon}
              alt="입력 아이콘"
              className="h-[14px] w-[11px]"
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default AnswerInput;
