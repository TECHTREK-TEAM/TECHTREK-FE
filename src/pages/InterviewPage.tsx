import Topbar from '../components/Topbar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';

const InterviewPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      {/* Topbar만큼 위에 패딩주기 */}
      <Topbar />
      <div className="w-full h-[100px] flex justify-between">
        <p className="px-8 pt-8 font-medium text-contentsize1">
          분석하려면 9 개의 질문이 남았어요
        </p>
        <button className="px-8 pt-8 h-fit">
          <img src={leftArrowIcon} alt="나가기 버튼" className="" />
        </button>
      </div>
      <div className=" h-[420px] mx-[270px] rounded-[10px] 2xl:mb-[150px] 2xl:mx-[300px] bg-white"></div>
    </div>
  );
};

export default InterviewPage;
