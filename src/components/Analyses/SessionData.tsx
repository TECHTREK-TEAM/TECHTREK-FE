import enhanceIcon from '../../assets/icons/enhanceIcon.svg';
import ProgressBar from '../ProgressBar';
import InterviewRecord from './InterviewRecord';

const SessionData = () => {
  const enhancedRate = 0.3; // 향상 점수 지수
  const enhancedDuration = 11; // 향상 시간 지수

  return (
    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
      <div className="h-[2000px] bg-gray-200 ">
        {/* 분석 결과 지표 */}
        <p className="text-left ml-2 text-contentsize2 text-[#505050] font-semibold">
          분석 결과
        </p>
        <div className="w-full h-fit flex flex-col gap-3 mt-7">
          <div className="w-full h-[157px] flex gap-3">
            {/* 합격예측 결과 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-12">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                합격예측 결과
              </p>
              <p className="font-semibold text-[28px] text-brandcolor text-left">
                합격
              </p>
            </div>

            {/* 연계질문 대응력 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                연계질문 대응력
              </p>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-[28px] text-primary text-left">
                  79점
                </p>
                <p className="flex items-center gap-[6px] font-medium text-contentsize1 text-customgray">
                  <img src={enhanceIcon} className="select-none" />
                  <span className="text-[#0c8800]">{enhancedRate}%</span>{' '}
                  평균보다 높음
                </p>
              </div>
            </div>

            {/* 답변 일치율 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                답변 일치율
              </p>
              <div className="flex gap-6">
                {/* 텍스트 영역 - 고정 넓이 */}
                <div className="flex flex-col gap-[2px] min-w-fit">
                  <p className="font-semibold text-[28px] text-primary text-left">
                    71%
                  </p>
                  <p className="flex items-center gap-[6px] font-medium text-contentsize1 text-customgray whitespace-nowrap">
                    간신히 합격
                  </p>
                </div>

                {/* 그래프 - 답변 일치율 */}
                <div className="flex-1">
                  <ProgressBar
                    percentage={71}
                    showShadowBar={false}
                    showPercentageText={false}
                  />
                </div>
              </div>
            </div>

            {/* 면접 소요시간 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                면접 소요시간
              </p>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-[28px] text-primary text-left">
                  32분
                </p>
                <p className="flex items-center gap-[6px] font-medium text-contentsize1 text-customgray">
                  <img src={enhanceIcon} className="select-none" />
                  <span className="text-[#0c8800]">
                    {enhancedDuration}%
                  </span>{' '}
                  평균보다 빠름
                </p>
              </div>
            </div>
          </div>

          {/* 해당 세션 상위 퍼센티지 */}
          <div className="w-full h-[237px] p-6 bg-white flex flex-col gap-6 rounded-2xl">
            {/* 타이틀 */}
            <div className="flex flex-col gap-4">
              <p className="text-contentsize1 text-customgray font-medium text-left">
                네이버 기업에서 나는 상위 몇 %?
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[28px] text-primary font-semibold">
                  상위 31%
                </p>
                <p className="text-sm font-medium text-customgray">
                  유일한 님의 면접 결과
                </p>
              </div>
            </div>

            {/* 그래프 바 - 상위 퍼센티지 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-sm text-customgray font-medium">상위 100%</p>
                <p className="text-sm text-customgray font-medium">상위 80%</p>
                <p className="text-sm text-customgray font-medium">상위 60%</p>
                <p className="text-sm text-customgray font-medium">상위 40%</p>
                <p className="text-sm text-customgray font-medium">상위 20%</p>
                <p className="text-sm text-customgray font-medium">상위 0%</p>
              </div>
              <ProgressBar percentage={69} showPercentageText={false} />
            </div>
          </div>
        </div>
        {/* 면접 내용 */}
        <p className="text-left ml-2 mt-10 text-contentsize2 text-[#505050] font-semibold">
          면접 내용
        </p>

        <InterviewRecord />
      </div>
    </div>
  );
};

export default SessionData;
