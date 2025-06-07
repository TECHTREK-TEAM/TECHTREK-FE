import Topbar from '../components/Topbar.tsx';
import CurveSlideSlick from '../components/Homes/CurveSlideSlick.tsx';
import mainBanner from '../assets/images/mainBanner.jpg';
import introImage1 from '../assets/images/introImage1.jpg';
import introImage2 from '../assets/images/introImage2.jpg';
import introImage3 from '../assets/images/introImage3.jpg';
import downIcon from '../assets/icons/downIcon.svg';

function HomePage() {
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
          <button className="w-[149px] h-[50px] border border-white text-white font-medium text-contentsize1 flex justify-center items-center gap-3">
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

      <div className="flex flex-col w-full h-fit items-center mt-[120px]">
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

        <div className="w-full max-w-[1320px] h-fit gap-3 flex justify-between px-[100px] mt-[55px] 2xl:px-[300px]">
          {/* 플랫폼 소개 섹션 */}
          <div className="w-[432px] h-full flex flex-col gap-5">
            <img src={introImage1} alt="소개 이미지1" className="" />
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
            <img src={introImage2} alt="소개 이미지1" className="" />
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
            <img src={introImage3} alt="소개 이미지1" className="" />
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
      </div>
    </div>
  );
}

export default HomePage;
