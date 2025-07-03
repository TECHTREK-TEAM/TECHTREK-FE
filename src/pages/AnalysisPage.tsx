import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';

const AnalysisPage = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      {/* Topbar */}
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <LeftNavbar />

        {/* 중앙 콘텐츠 */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <h1 className="text-2xl font-bold">분석 페이지</h1>
          <div className="h-[2000px] bg-gray-200 mt-4">
            중앙 콘텐츠 스크롤 테스트
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <RightNavbar />
      </div>
    </div>
  );
};

export default AnalysisPage;
