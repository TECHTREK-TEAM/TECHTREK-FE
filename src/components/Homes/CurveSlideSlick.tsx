import { useState } from 'react';
import Slider from 'react-slick';
import LeftArrowIcon from '../../assets/icons/leftIcon.svg';
import RightArrowIcon from '../../assets/icons/rightIcon.svg';
import Slide1 from '../../assets/images/naverLogo.png';
import Slide2 from '../../assets/images/kakaoLogo.png';
import Slide3 from '../../assets/images/peopleofBaedalLogo.png';
import Slide4 from '../../assets/images/nexonLogo.png';
import Slide5 from '../../assets/images/samsungLogo.png';
import Slide6 from '../../assets/images/coupangLogo.png';
import Slide7 from '../../assets/images/tossLogo.png';
import Slide8 from '../../assets/images/danggeunMarketLogo.png';
import './CurveSlideSlick.css';

const CurveSlideSlick = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: Slide1,
      bgColor: 'bg-[#1EC960]',
      imageWidth: 'w-[100%]',
      imageHeight: 'h-[100%]',
    },
    {
      src: Slide2,
      bgColor: 'bg-[#FFDC00]',
      imageWidth: 'w-[80%]',
      imageHeight: 'h-[80%]',
    },
    {
      src: Slide3,
      bgColor: 'bg-[#00C4BD]',
      imageWidth: 'w-[80%]',
      imageHeight: 'h-[80%]',
    },
    {
      src: Slide4,
      bgColor: 'bg-[#F6F6F6]',
      imageWidth: 'w-[100%]',
      imageHeight: 'h-[100%]',
    },
    {
      src: Slide5,
      bgColor: 'bg-[#0E4194]',
      imageWidth: 'w-[80%]',
      imageHeight: 'h-[80%]',
    },
    {
      src: Slide6,
      bgColor: 'bg-[#F6F6F6]',
      imageWidth: 'w-[80%]',
      imageHeight: 'h-[80%]',
    },
    {
      src: Slide7,
      bgColor: 'bg-[#0050FF]',
      imageWidth: 'w-[100%]',
      imageHeight: 'h-[100%]',
    },
    {
      src: Slide8,
      bgColor: 'bg-[#FB6614]',
      imageWidth: 'w-[80%]',
      imageHeight: 'h-[80%]',
    },
  ];

  const isHoverable = (index: number) => {
    const total = images.length;
    const diff = Math.abs(index - currentSlide);
    const circularDiff = Math.min(diff, total - diff);
    return circularDiff <= 1;
  };

  const items = images.map((item, idx) => (
    <div
      key={idx}
      className={`slide-item ${item.bgColor} group relative ${isHoverable(idx) ? 'hoverable' : ''}`}
    >
      <img
        src={item.src}
        alt={`슬라이드 ${idx + 1}`}
        className={`slide-image ${item.imageWidth} ${item.imageHeight}`}
      />
      <div className="hover-overlay absolute inset-0 bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center gap-4 z-10">
        <button className="w-[100px] h-10 rounded-[10px] border border-white text-white">
          채용 공고
        </button>
        <button className="w-[100px] h-10 rounded-[10px] bg-primary text-white">
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
