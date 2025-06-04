import Slider from 'react-slick';
import LeftArrowIcon from '../../assets/icons/leftIcon.svg';
import RightArrowIcon from '../../assets/icons/rightIcon.svg';
import './CurveSlideSlick.css';

const CurveSlideSlick = () => {
  const items = Array.from({ length: 8 }, (_, idx) => (
    <div key={idx} className="slide-item">
      박스 {idx + 1}
    </div>
  ));

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true, // 중요!
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  return (
    <div className="curve-slide-wrapper">
      <Slider {...settings}>{items}</Slider>
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
