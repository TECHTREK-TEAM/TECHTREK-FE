import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';

const AnalysisPage = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      {/* 탑바 */}
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <LeftNavbar />

        {/* 중앙 콘텐츠 */}
        <SessionData />

        {/* 오른쪽 사이드바 */}
        <RightNavbar />
      </div>
    </div>
  );
};

export default AnalysisPage;
