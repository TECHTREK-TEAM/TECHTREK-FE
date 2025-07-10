import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import leftArrowIcon from '../assets/icons/leftArrowIcon.svg';

const InterviewResultPage = () => {
  const resultData = {
    status: true,
    resultScore: 78.7,
    followScore: 79.0,
    duration: 32,
    keywords: '수직적 샤딩 / 수평적 샤딩',
  };

  return (
    <div className="h-[900px] 2xl:h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />

      <div className="w-full h-[100px] flex justify-end 2xl:h-[150px]">
        <button className="px-8 pt-8 h-fit">
          <img src={leftArrowIcon} alt="나가기 버튼" />
        </button>
      </div>

      <div className="h-[550px] 2xl:h-[700px] mx-[270px] px-10 py-8 bg-white rounded-[10px] 2xl:mb-[150px] 2xl:mx-[300px] flex flex-col justify-between">
        {/* 시험 결과 */}
        <div className="w-full h-full max-h-[190px] max-w-[812px] flex flex-col gap-7">
          <p className="font-medium text-contentsize2 text-primary text-left">
            시험 결과
          </p>
          <div className="flex gap-7">
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6 border border-customgray">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                합격예측 결과
              </p>
              <p className="font-semibold text-[28px] text-left text-brandcolor">
                {resultData.status ? '합격' : '불합격'}
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6 border border-customgray">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                연계질문 대응력
              </p>
              <p className="font-semibold text-[28px] text-left text-primary">
                {resultData.followScore}점
              </p>
            </div>
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6 border border-customgray">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                면접 소요시간
              </p>
              <p className="font-semibold text-[28px] text-left text-primary">
                {resultData.duration}분
              </p>
            </div>
          </div>
        </div>

        {/* 답변 일치율 */}
        <div className="w-full flex flex-col gap-7">
          <p className="font-medium text-contentsize2 text-primary text-left">
            답변 일치율
          </p>
          <ProgressBar percentage={resultData.resultScore} />
        </div>

        {/* 놓친 키워드 */}
        <div className="w-full flex flex-col gap-7">
          <p className="font-medium text-contentsize2 text-primary text-left">
            놓친 키워드
          </p>
          <p className="text-[28px] text-primary font-bold text-left">
            {resultData.keywords}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewResultPage;
