import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar'; // ✅ 추가

const AnalysisPage = () => {
  return (
    <div className="min-h-screen max-h-[1080px] w-full flex flex-col bg-[#F1F4F6]">
      {/* 상단 고정 Topbar */}
      <Topbar />

      <div className="flex flex-1 pt-[80px]">
        {/* 왼쪽 사이드바 */}
        <LeftNavbar />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">분석 페이지</h1>
          {/* 여기에 분석 내용 등 추가 */}
        </div>

        {/* 오른쪽 사이드바 */}
        <RightNavbar />
      </div>
    </div>
  );
};

export default AnalysisPage;
