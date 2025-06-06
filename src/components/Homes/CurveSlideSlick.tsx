import Slider from 'react-slick';
import LeftArrowIcon from '../../assets/icons/leftIcon.svg';
import RightArrowIcon from '../../assets/icons/rightIcon.svg';
import Slide1 from '../../assets/images/enterpriseCardNaver.jpg';
import Slide2 from '../../assets/images/enterpriseCardKakao.jpg';
import Slide3 from '../../assets/images/enterpriseCardPeopleofBaedal.jpg';
import Slide4 from '../../assets/images/enterpriseCardNexon.jpg';
import Slide5 from '../../assets/images/enterpriseCardSamsung.jpg';
import Slide6 from '../../assets/images/enterpriseCardCoupang.jpg';
import Slide7 from '../../assets/images/enterpriseCardToss.jpg';
import Slide8 from '../../assets/images/enterpriseCardDanggeunMarket.jpg';
import './CurveSlideSlick.css';

const CurveSlideSlick = () => {
  const images = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
  ];

  const items = images.map((src, idx) => (
    <div key={idx} className="slide-item">
      <img src={src} alt={`슬라이드 ${idx + 1}`} className="slide-image" />
    </div>
  ));
  const settings = {
    infinite: true,
    slideToScroll: 1,
    slidesToShow: 1,
    arrows: true,
    variableWidth: true,
    centerMode: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  return (
    <div className="curve-slide-wrapper">
      {/* 위쪽 타원 */}
      <div className="curve-overlay top" />

      <Slider {...settings}>{items}</Slider>

      {/* 아래쪽 타원 */}
      <div className="curve-overlay bottom" />
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
