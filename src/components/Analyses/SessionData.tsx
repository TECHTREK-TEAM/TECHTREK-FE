import enhanceIcon from '../../assets/icons/enhanceIcon.svg';
import decreaseIcon from '../../assets/icons/decreaseIcon.svg';
import ProgressBar from '../ProgressBar';
import InterviewRecord from './InterviewRecord';

interface Analysis {
  status: boolean;
  followScore: number;
  followAveragePercent: number;
  resultScore: number;
  duration: number;
  durationAveragePercent: number;
  TopScore: number;
}

interface InterviewQA {
  question: string;
  answer: string;
  questionNumber: string;
  tailQuestionNumber?: string;
}

interface Feedback {
  keyword: string;
  questionNumber: string;
  result: string;
}

interface SessionDataProps {
  analysis?: Analysis | null;
  interview: InterviewQA[];
  feedback?: Feedback | null;
  enterpriseName: string;
}

const SessionData = ({
  analysis,
  interview,
  feedback,
  enterpriseName,
}: SessionDataProps) => {
  const safeAnalysis: Analysis = analysis ?? {
    status: false,
    followScore: 0,
    followAveragePercent: 0,
    resultScore: 0,
    duration: 0,
    durationAveragePercent: 0,
    TopScore: 0,
  };

  const safeFeedback: Feedback = feedback ?? {
    keyword: '',
    questionNumber: '',
    result: '',
  };

  const interviewData = interview.map(
    ({ question, answer, questionNumber, tailQuestionNumber }) => ({
      questionNumber: tailQuestionNumber
        ? `${questionNumber}-${tailQuestionNumber}`
        : questionNumber,
      question,
      answer,
    })
  );

  return (
    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
      <div className="h-fit">
        <p className="text-left ml-2 text-contentsize2 text-[#505050] font-semibold">
          분석 결과
        </p>
        <div className="w-full h-fit flex flex-col gap-3 mt-7">
          <div className="w-full h-[157px] flex gap-3">
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-12">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                합격예측 결과
              </p>
              <p
                className="font-semibold text-[28px] text-left"
                style={{ color: safeAnalysis.status ? '#5f43ff' : '#FE8700' }}
              >
                {safeAnalysis.status ? '합격' : '불합격'}
              </p>
            </div>

            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                연계질문 대응력
              </p>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-[28px] text-primary text-left">
                  {safeAnalysis.followScore}점
                </p>
                <p className="flex items-center gap-[6px] font-medium text-sm text-customgray">
                  <img
                    src={
                      safeAnalysis.followAveragePercent >= 0
                        ? enhanceIcon
                        : decreaseIcon
                    }
                    className="select-none"
                  />
                  <span
                    className={
                      safeAnalysis.followAveragePercent >= 0
                        ? 'text-[#0c8800]'
                        : 'text-[#880000]'
                    }
                  >
                    {Math.round(
                      Math.abs(safeAnalysis.followAveragePercent) * 100
                    )}
                    %
                  </span>{' '}
                  {safeAnalysis.followAveragePercent >= 0
                    ? '평균보다 높음'
                    : '평균보다 낮음'}
                </p>
              </div>
            </div>

            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                답변 일치율
              </p>
              <div className="flex gap-6">
                <div className="flex flex-col gap-[2px] min-w-fit">
                  <p className="font-semibold text-[28px] text-primary text-left">
                    {Math.round(safeAnalysis.resultScore)}%
                  </p>
                  <p className="flex items-center gap-[6px] font-medium text-sm text-customgray whitespace-nowrap">
                    {(() => {
                      const score = safeAnalysis.resultScore;
                      if (score >= 76) return '월등히 합격';
                      if (score >= 70) return '간신히 합격';
                      if (score >= 65) return '아쉽게 불합격';
                      return '불합격';
                    })()}
                  </p>
                </div>
                <div className="flex-1">
                  <ProgressBar
                    percentage={Math.round(safeAnalysis.resultScore)}
                    showShadowBar={false}
                    showPercentageText={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                면접 소요시간
              </p>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-[28px] text-primary text-left">
                  {safeAnalysis.duration}분
                </p>
                <p className="flex items-center gap-[6px] font-medium text-sm text-customgray">
                  <img
                    src={
                      safeAnalysis.durationAveragePercent >= 0
                        ? enhanceIcon
                        : decreaseIcon
                    }
                    className="select-none"
                  />
                  <span
                    className={
                      safeAnalysis.durationAveragePercent >= 0
                        ? 'text-[#0c8800]'
                        : 'text-[#880000]'
                    }
                  >
                    {Math.abs(safeAnalysis.durationAveragePercent)}%
                  </span>{' '}
                  {safeAnalysis.durationAveragePercent >= 0
                    ? '평균보다 빠름'
                    : '평균보다 느림'}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[237px] p-6 bg-white flex flex-col gap-6 rounded-2xl">
            <div className="flex flex-col gap-4">
              <p className="text-contentsize1 text-customgray font-medium text-left">
                {enterpriseName} 기업에서 나는 상위 몇 %?
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[28px] text-primary font-semibold">
                  상위 {safeAnalysis.TopScore}%
                </p>
                <p className="text-sm font-medium text-customgray">
                  유일한 님의 면접 결과
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-sm text-customgray font-medium">상위 100%</p>
                <p className="text-sm text-customgray font-medium">상위 80%</p>
                <p className="text-sm text-customgray font-medium">상위 60%</p>
                <p className="text-sm text-customgray font-medium">상위 40%</p>
                <p className="text-sm text-customgray font-medium">상위 20%</p>
                <p className="text-sm text-customgray font-medium">상위 0%</p>
              </div>
              <ProgressBar
                percentage={100 - safeAnalysis.TopScore}
                showPercentageText={false}
              />
            </div>
          </div>
        </div>

        <p className="text-left ml-2 mt-10 text-contentsize2 text-[#505050] font-semibold">
          면접 내용
        </p>
        <InterviewRecord
          interviewData={interviewData}
          enterpriseName={enterpriseName}
        />

        <p className="text-left ml-2 mt-10 text-contentsize2 text-[#505050] font-semibold">
          면접 피드백
        </p>
        <div className="w-full h-fit bg-white rounded-2xl p-[37px] mt-5 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-contentsize1 text-customgray font-medium text-left">
              핵심 키워드
            </p>
            <div className="flex gap-5 items-center">
              <p className="text-subtitlesize text-brandcolor font-semibold">
                {safeFeedback.keyword}
              </p>
              <div className="px-2 py-1 bg-[#EBEAFC] text-brandcolor rounded-full text-xs font-medium">
                질문 {safeFeedback.questionNumber}
              </div>
            </div>
          </div>
          <p className="font-regular text-contentsize1 text-primary text-left">
            {safeFeedback.result}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionData;
