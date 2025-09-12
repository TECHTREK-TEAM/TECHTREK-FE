interface SuccessProps {
  pass: boolean;
}

const SuccessLabel = ({ pass }: SuccessProps) => {
  const bgColor = pass ? '#EBEAFC' : '#FBEDE6';
  const textColor = pass ? 'text-brandcolor' : 'text-[#FE8700]';
  const labelText = pass ? '합격' : '불합격';

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
