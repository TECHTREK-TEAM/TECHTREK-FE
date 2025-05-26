import React from 'react';

interface ProgressBarProps {
  percentage: number; // 진행률 (0~100)
  label?: string; // 옵션: 텍스트 라벨
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, label }) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <span className="text-sm text-basic font-medium">{label}</span>}
      <div
        className="w-full h-[60px] rounded-xl relative"
        style={{
          background: '#EBE9FB',
          boxShadow: 'inset 1px 1px 1.5px rgba(17, 0, 116, 0.15)',
        }}
      >
        {/* 배경 그림자 바 */}
        <div
          className="absolute top-0 left-0 h-full rounded-md z-0 transition-all duration-500 ease-in-out bg-gradientColor"
          style={{
            width: `calc(${clampedPercentage}% + 20px)`,
            maxWidth: '100%',
          }}
        />
        {/* 실제 진행 바 */}
        <div
          className="absolute top-0 left-0 h-full rounded-md z-10 transition-all duration-500 ease-in-out"
          style={{
            width: `${clampedPercentage}%`,
            background: 'linear-gradient(to right, #5f43ff, #8243FF)',
            boxShadow: '0px 4px 16px rgba(38, 0, 255, 0.3)',
          }}
        />

        {/* 텍스트 */}
        <div className="absolute inset-0 pl-6 flex items-center justify-start text-white font-semibold text-2xl z-20">
          {clampedPercentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
