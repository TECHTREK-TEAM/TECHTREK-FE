import React from 'react';

interface ProgressBarProps {
  percentage: number; // 진행률 (예: 52.3)
  showShadowBar?: boolean; // 그림자 바 표시 여부
  showPercentageText?: boolean; // 퍼센트 텍스트 표시 여부
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  showShadowBar = true,
  showPercentageText = true,
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div
      className="w-full h-[60px] rounded-xl relative"
      style={{
        background: '#EBE9FB',
        boxShadow: 'inset 1px 1px 1.5px rgba(17, 0, 116, 0.15)',
      }}
    >
      {/* 배경 그림자 바 */}
      {showShadowBar && (
        <div
          className="absolute top-0 left-0 h-full z-0 transition-all duration-500 ease-in-out bg-gradientColor"
          style={{
            width: `calc(${clampedPercentage}% + 38px)`,
            maxWidth: '100%',
            borderTopLeftRadius: '0.75rem', // rounded-xl
            borderBottomLeftRadius: '0.75rem',
            borderTopRightRadius: '0.375rem', // rounded-md
            borderBottomRightRadius: '0.375rem',
          }}
        />
      )}

      {/* 실제 진행 바 */}
      <div
        className="absolute top-0 left-0 h-full z-10 transition-all duration-500 ease-in-out"
        style={{
          width: `${clampedPercentage}%`,
          background: 'linear-gradient(to right, #5f43ff, #8243FF)',
          boxShadow: '0px 4px 16px rgba(38, 0, 255, 0.3)',
          borderTopLeftRadius: '0.75rem', // rounded-xl
          borderBottomLeftRadius: '0.75rem',
          borderTopRightRadius: '0.375rem', // rounded-md
          borderBottomRightRadius: '0.375rem',
        }}
      />

      {/* 퍼센티지 텍스트 */}
      {showPercentageText && (
        <div className="absolute inset-0 pl-6 flex items-center justify-start text-white font-semibold text-2xl z-20">
          {clampedPercentage.toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
