import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import LeftArrowIcon from '../../assets/icons/leftIcon.svg';
import RightArrowIcon from '../../assets/icons/rightIcon.svg';
import { companyList } from '../../constants/companyMap';
import './CurveSlideSlick.css';

const CurveSlideSlick = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleInterviewClick = (enterprise: string) => {
    navigate(`/interview/${enterprise}`);
  };

  const isHoverable = (index: number) => {
    const total = companyList.length;
    const diff = Math.abs(index - currentSlide);
    const circularDiff = Math.min(diff, total - diff);
    return circularDiff <= 1;
  };

  const items = companyList.map((item, idx) => (
    <div
      key={idx}
      className={`slide-item ${item.mainBgColor} group relative ${isHoverable(idx) ? 'hoverable' : ''}`}
    >
      <img
        src={item.mainLogo}
        alt={`슬라이드 ${idx + 1}`}
        className={`slide-image ${item.mainWidth} ${item.mainHeight}`}
      />
      <div className="hover-overlay absolute inset-0 bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center gap-2 z-10 2xl:gap-4">
        <button className="w-[100px] h-10 rounded-[10px] border border-white text-white">
          채용 공고
        </button>
        <button onClick={() => handleInterviewClick(item.enterprise)} className="w-[100px] h-10 rounded-[10px] bg-primary text-white">
          면접 보기
        </button>
      </div>
    </div>
  ));

  const settings = {
    infinite: true,
    slideToScroll: 1,
    slidesToShow: 1,
    arrows: true,
    variableWidth: true,
    centerMode: true,
    afterChange: (index: number) => setCurrentSlide(index),
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  return (
    <div className="curve-slide-wrapper">
      <div className="curve-overlay top pointer-blocker" />
      <Slider {...settings}>{items}</Slider>
      <div className="curve-overlay bottom pointer-blocker" />
    </div>
  );
};

const CustomArrow = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick?: () => void;
}) => {
  const icon = direction === 'left' ? LeftArrowIcon : RightArrowIcon;
  const positionClass = direction === 'left' ? 'left-arrow' : 'right-arrow';

  return (
    <button className={`arrow-button ${positionClass}`} onClick={onClick}>
      <img src={icon} alt={`${direction} arrow`} className="w-4 h-4" />
    </button>
  );
};

export default CurveSlideSlick;
