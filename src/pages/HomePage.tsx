import Topbar from '../components/Topbar';
import mainBanner from '../assets/images/mainBanner.jpg';
import downIcon from '../assets/icons/downIcon.svg';

function HomePage() {
  return (
    <div className="min-h-[2000px] flex flex-col">
      <Topbar />
      {/* 배너 영역 div */}
      <div className="w-full h-[670px] lg:pl-[180px] pt-[155px] 2xl:pl-[300px]">
        {/* 배너 영역 안 스타일 */}
        <div className="w-[494px] h-[210px] flex flex-col justify-between">
          <div className="w-full h-[120px] flex flex-col gap-4 overflow-y-auto">
            <p className="text-left text-white font-semibold text-[40px]">
              유형화된 면접 시뮬레이션
            </p>
            <p className="text-left text-white font-medium text-contentsize1">
              네이버, 카카오, 토스 등 국내 유명 기업의 CS 면접을 미리 경험하고,
              실전처럼 대비하세요!
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
    </div>
  );
}

export default HomePage;
