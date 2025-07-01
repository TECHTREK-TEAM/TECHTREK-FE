import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';

const AnalysisPage = () => {
  return (
    <div className="min-h-screen max-h-[1080px] w-full flex flex-col bg-[#F1F4F6]">
      {/* 상단 고정 Topbar */}
      <Topbar />

      {/* 본문 영역: 좌측 LeftNavbar + 우측 메인 컨텐츠 */}
      <div className="flex flex-1 pt-[80px]">
        <LeftNavbar />

        {/* 오른쪽 내용 영역 */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">분석 페이지</h1>
          {/* 여기에 분석 내용 등 추가 */}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
