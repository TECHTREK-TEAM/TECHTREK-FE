import React from 'react';

interface TinyBarProps {
  percentage: number; // 진행률 (예: 52.3)
}

const TinyBar: React.FC<TinyBarProps> = ({ percentage }) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div
      className="w-full h-1 rounded-full relative"
      style={{
        background: '#EBE9FB',
        boxShadow: 'inset 0.5px 0.5px 1px rgba(17, 0, 116, 0.15)',
      }}
    >
      {/* 실제 진행 바 */}
      <div
        className="absolute top-0 left-0 h-full rounded-md z-10 transition-all duration-500 ease-in-out"
        style={{
          width: `${clampedPercentage}%`,
          background: 'linear-gradient(to right, #5f43ff, #8243FF)',
          boxShadow: '0px 1px 2px rgba(38, 0, 255, 0.3)',
        }}
      />
    </div>
  );
};

export default TinyBar;
