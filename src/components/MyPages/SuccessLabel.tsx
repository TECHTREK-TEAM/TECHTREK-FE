interface SuccessProps {
  resultScore: number;
}

const SuccessLabel = ({ resultScore }: SuccessProps) => {
  const isPassed = resultScore >= 70;

  const bgColor = isPassed ? '#EBEAFC' : '#FBEDE6';
  const textColor = isPassed ? 'text-brandcolor' : 'text-[#FE8700]';
  const labelText = isPassed ? '합격' : '불합격';

  return (
    <p
      className={`px-2 py-1 font-medium text-[12px] rounded-full w-fit h-fit ${textColor}`}
      style={{ backgroundColor: bgColor }}
    >
      {labelText}
    </p>
  );
};

export default SuccessLabel;
