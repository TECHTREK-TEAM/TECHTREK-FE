import Topbar from '../components/Topbar.tsx';
import CurveSlideSlick from '../components/Homes/CurveSlideSlick.tsx';
import mainBanner from '../assets/images/mainBanner.jpg';
import introImage1 from '../assets/images/introImage1.jpg';
import introImage2 from '../assets/images/introImage2.jpg';
import introImage3 from '../assets/images/introImage3.jpg';
import introImage4 from '../assets/images/introImage4.png';
import introVideoSample from '../assets/images/introVideoSample.png';
import logoBanner from '../assets/images/logoBanner.png';
import downIcon from '../assets/icons/downIcon.svg';
import questionIcon from '../assets/icons/questionIcon.svg';
import trainingIcon from '../assets/icons/trainingIcon.svg';
import bookIcon from '../assets/icons/bookIcon.svg';
import smileIcon from '../assets/icons/smileIcon.svg';
import { useRef } from 'react';

const HomePage = () => {
  const curveSlideRef = useRef<HTMLDivElement>(null);

  const handleScrollToSlide = () => {
    curveSlideRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full pt-[80px] w-full flex flex-col">
      <Topbar />
      {/* 배너 영역 div */}
      <div className="w-full h-[590px] lg:pl-[180px] pt-[155px] 2xl:pl-[300px]">
        {/* 배너 영역 안 스타일 */}
        <div className="w-[494px] h-fit gap-10 flex flex-col justify-between">
          <div className="w-full h-fit flex flex-col gap-4 overflow-y-auto">
            <p className="text-left text-white font-semibold text-[40px]">
              유형화된 면접 시뮬레이션
            </p>
            <p className="text-left text-white font-medium text-contentsize1">
              네이버, 카카오, 토스 등 국내 유명 기업의 CS 면접을 미리 경험하고,
              실전처럼
              <br /> 대비하세요!
            </p>
          </div>
          <button
            onClick={handleScrollToSlide}
            className="w-[149px] h-[50px] border border-white text-white font-medium text-contentsize1 flex justify-center items-center gap-3"
          >
            면접 보러가기
            <img src={downIcon} alt="아래화살표 아이콘" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 배너 이미지 div */}
      <div
        className="absolute top-0 left-0 w-full h-[670px] -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainBanner})`,
        }}
      />

      <div
        ref={curveSlideRef}
        className="flex flex-col w-full h-fit items-center pt-[120px]"
      >
        {/* 섹션 타이틀 div */}
        <div className="flex flex-col gap-4 w-fit h-fit">
          <p className="text-subtitlesize font-semibold text-primary">
            기업별 TECHTREK
          </p>
          <p className="text-contentsize1 font-medium text-customgray">
            관심 있는 회사를 골라 연습해보세요
          </p>
        </div>

        {/* 커브 슬라이드 */}
        <CurveSlideSlick />

        {/* 섹션 타이틀 div */}
        <div className="flex flex-col gap-4 w-fit h-fit mt-7">
          <p className="text-subtitlesize font-semibold text-primary">
            모의 면접 시뮬레이션
          </p>
          <p className="text-contentsize1 font-medium text-customgray">
            질문에 실시간으로 답변하고, 다양한 직군과 난이도의 질문을 경험하세요
          </p>
        </div>

        <div className="w-full max-w-[1920px] h-fit gap-3 flex justify-between px-[100px] mt-[55px] 2xl:px-[300px]">
          {/* 플랫폼 소개 섹션 */}
          <div className="w-[432px] h-full flex flex-col gap-5">
            <img src={introImage1} alt="소개 이미지1" className="select-none" />
            <div className="flex flex-col gap-3 w-fit h-fit">
              <p className="text-contentsize2 text-left font-semibold text-primary">
                기업 경향성 반영
              </p>
              <p className="text-[14px] text-left font-medium text-customgray">
                단순히 정답을 맞추는데 그치지 않고, 기업마다 중요하게 여기는
                사고방식이나 커뮤니케이션 스타일을 반영하여 면접 결과를
                제공합니다.
              </p>
            </div>
          </div>
          <div className="w-[432px] h-full flex flex-col gap-5">
            <img src={introImage2} alt="소개 이미지2" className="" />
            <div className="flex flex-col gap-3 w-fit h-fit">
              <p className="text-contentsize2 text-left font-semibold text-primary">
                키워드 분석
              </p>
              <p className="text-[14px] text-left font-medium text-customgray">
                면접 답변에서 반드시 언급해야 할 핵심 키워드를 분석해 제공하여,
                답변의 완성도를 높일 수 있도록 도와줍니다.
              </p>
            </div>
          </div>
          <div className="w-[432px] h-full flex flex-col gap-5">
            <img src={introImage3} alt="소개 이미지3" className="" />
            <div className="flex flex-col gap-3 w-fit h-fit">
              <p className="text-contentsize2 text-left font-semibold text-primary">
                답변 구조 분석
              </p>
              <p className="text-[14px] text-left font-medium text-customgray">
                답변이 단순히 맞는지를 넘어, 얼마나 논리적으로 시작부터 결론까지
                자연스럽게 전개되었는지 분석하여 피드백합니다.
              </p>
            </div>
          </div>
        </div>
        {/* 섹션 타이틀 div */}
        <div className="flex flex-col gap-4 w-fit h-fit mt-[120px]">
          <p className="text-subtitlesize font-semibold text-primary">
            TECHTREK의 도움을 받아 면접의
            <br /> 주인공이 되세요
          </p>
          <p className="text-contentsize1 font-medium text-customgray">
            면접 질문에 답하고, 키워드 분석과 기업 경향 피드백을 통해 나만의
            답변 전략을 만들어보세요.
          </p>
        </div>
        <div className="w-full max-w-[1920px] h-fit gap-12 flex flex-col justify-between px-[100px] mt-[55px] 2xl:px-[300px] 2xl:gap-20">
          <img
            src={introImage4}
            alt="소개 이미지4"
            className="w-full max-h-[450px]"
          />
          <div className="w-full h-[320px] flex justify-between gap-12 2xl:gap-20 2xl:h-[372px]">
            <img
              src={introVideoSample}
              alt="소개 동영상 샘플이미지"
              className="w-[55%]"
            />
            <div className="max-w-[587px] w-fit h-full flex flex-col justify-start gap-12">
              <div className="flex h-[40px] gap-5 items-center text-left text-contentsize1 text-primary w-fit 2xl:gap-9 2xl:h-[55px]">
                <img
                  src={questionIcon}
                  alt="질문 아이콘"
                  className="w-[40px] h-[40px] 2xl:w-[55px] 2xl:h-[55px]"
                />
                질문에 실시간으로 답변하고, 다양한 직군과 난이도의 질문을
                경험하세요
              </div>
              <div className="flex h-[40px] gap-5 items-center text-left text-contentsize1 text-primary w-fit 2xl:gap-9 2xl:h-[55px]">
                <img
                  src={trainingIcon}
                  alt="트레이닝 아이콘"
                  className="w-[40px] h-[40px] 2xl:w-[55px] 2xl:h-[55px]"
                />
                혼자하는 연습을 넘어 전략적인 면접 트레이닝을 시작해보세요
              </div>
              <div className="flex h-[40px] gap-5 items-center text-left text-contentsize1 text-primary w-fit 2xl:gap-9 2xl:h-[55px]">
                <img
                  src={bookIcon}
                  alt="책 아이콘"
                  className="w-[40px] h-[40px] 2xl:w-[55px] 2xl:h-[55px]"
                />
                답변 즉시 키워드부터 기업 경향 분석까지, 완성도 있는 준비를
                지원합니다
              </div>
              <div className="flex h-[40px] gap-5 items-center text-left text-contentsize1 text-primary w-fit 2xl:gap-9 2xl:h-[55px]">
                <img
                  src={smileIcon}
                  alt="스마일 아이콘"
                  className="w-[40px] h-[40px] 2xl:w-[55px] 2xl:h-[55px]"
                />
                면접의 감을 키우는 가장 빠른 방법, 테크트랙에서 시작하세요
              </div>
            </div>
          </div>
        </div>

        <div className="w-fit h-fit gap-[50px] flex flex-col items-center">
          {/* 섹션 타이틀 div */}
          <div className="flex flex-col gap-4 w-fit h-fit mt-[120px]">
            <p className="text-subtitlesize font-semibold text-primary">
              TECHTREK의 개선할 점을 알려주세요
            </p>
            <p className="text-contentsize1 font-medium text-customgray">
              TECHTREK을 사용하며 느낀 장점이나 개선되었으면 하는 점을 자유롭게
              공유해주세요.
            </p>
          </div>
          <button className="w-[146px] h-[40px] bg-blue-500 text-white font-medium text-contentsize1 rounded-[10px]">
            피드백 하러가기 →
          </button>
        </div>
        <div className="w-full h-[200px] flex items-center justify-center mt-[100px] 2xl:mt-[150px]">
          <img src={logoBanner} alt="로고 배너" className="w-[1320px] 2xl:" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
