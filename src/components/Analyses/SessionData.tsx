import ProgressBar from '../ProgressBar';
import InterviewRecord from './InterviewRecord';
import { companyMap } from '../../constants/companyMap';

interface Analysis {
  pass: boolean;
  score: number;
  duration: number;
  averageDurationPercent: number;
  topScore?: number;
}

interface InterviewQA {
  question: string;
  answer: string;
  questionNumber: string;
  similarity: number;
}

interface Feedback {
  keyword: string;
  keywordNumber: string;
  feedback: string;
}

interface SessionDataProps {
  analysis: Analysis;
  interview: InterviewQA[];
  feedback?: Feedback | null;
  enterprise: string;
}

const SessionData = ({
  analysis,
  interview,
  feedback,
  enterprise,
}: SessionDataProps) => {
  // analysis 옵셔널 필드에 기본값 할당 (타입 안정성 위해)
  const {
    pass,
    score,
    duration,
    //averageDurationPercent = 0,
    topScore = 0,
  } = analysis;

  // 피드백이 없을 때 빈 값 객체 기본 설정
  const safeFeedback: Feedback = feedback ?? {
    keyword: '',
    keywordNumber: '',
    feedback: '',
  };

  // 기업이름
  const company = enterprise ? companyMap[enterprise.toUpperCase()] : undefined;

  return (
    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
      <div className="h-fit">
        <p className="text-left ml-2 text-contentsize2 text-[#505050] font-semibold">
          분석 결과
        </p>

        <div className="w-full h-fit flex flex-col gap-3 mt-7">
          <div className="w-full h-[157px] flex gap-3">
            {/* 합격 예측 결과 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-12">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                합격예측 결과
              </p>
              <p
                className="font-semibold text-[28px] text-left"
                style={{ color: pass ? '#5f43ff' : '#FE8700' }}
              >
                {pass ? '합격' : '불합격'}
              </p>
            </div>

            {/* 답변 일치율 */}
            <div className="flex flex-col flex-1 bg-white rounded-2xl p-6 gap-6">
              <p className="font-medium text-contentsize1 text-customgray text-left">
                답변 일치율
              </p>
              <div className="flex gap-6">
                <div className="flex flex-col gap-[2px] min-w-fit">
                  <p className="font-semibold text-[28px] text-primary text-left">
                    {Math.round(score)}%
                  </p>
                  <p className="flex items-center gap-[6px] font-medium text-sm text-customgray whitespace-nowrap">
                    {(() => {
                      if (score >= 76) return '월등히 합격';
                      if (score >= 70) return '간신히 합격';
                      if (score >= 65) return '아쉽게 불합격';
                      return '불합격';
                    })()}
                  </p>
                </div>
                <div className="flex-1">
                  <ProgressBar
                    percentage={Math.round(score)}
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
                  {duration}분
                </p>
                {/*<p className="flex items-center gap-[6px] font-medium text-sm text-customgray">*/}
                {/*  <img*/}
                {/*    src={*/}
                {/*      averageDurationPercent >= 0 ? enhanceIcon : decreaseIcon*/}
                {/*    }*/}
                {/*    className="select-none"*/}
                {/*    alt={averageDurationPercent >= 0 ? '빠름' : '느림'}*/}
                {/*  />*/}
                {/*  <span*/}
                {/*    className={*/}
                {/*      averageDurationPercent >= 0*/}
                {/*        ? 'text-[#0c8800]'*/}
                {/*        : 'text-[#880000]'*/}
                {/*    }*/}
                {/*  >*/}
                {/*    {Math.round(Math.abs(averageDurationPercent))}%*/}
                {/*  </span>{' '}*/}
                {/*  {averageDurationPercent >= 0*/}
                {/*    ? '평균보다 빠름'*/}
                {/*    : '평균보다 느림'}*/}
                {/*</p>*/}
              </div>
            </div>
          </div>

          {/* 상위 점수 박스 */}
          <div className="w-full h-[237px] p-6 bg-white flex flex-col gap-6 rounded-2xl">
            <div className="flex flex-col gap-4">
              <p className="text-contentsize1 text-customgray font-medium text-left">
                {company?.name} 기업에서 나는 상위 몇 %?
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[28px] text-primary font-semibold">
                  상위 {topScore}%
                </p>
                <p className="text-sm font-medium text-customgray">
                  유일한 님의 면접 결과
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                {[100, 80, 60, 40, 20, 0].map((v) => (
                  <p key={v} className="text-sm text-customgray font-medium">
                    상위 {v}%
                  </p>
                ))}
              </div>
              <ProgressBar
                percentage={100 - topScore}
                showPercentageText={false}
              />
            </div>
          </div>
        </div>

        {/* 면접 내용 */}
        <p className="text-left ml-2 mt-10 text-contentsize2 text-[#505050] font-semibold">
          면접 내용
        </p>
        <InterviewRecord
          interviewData={interview}
          enterprise={company?.name ?? ''}
        />

        {/* 면접 피드백 */}
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
                질문 {safeFeedback.keywordNumber}
              </div>
            </div>
          </div>
          <p className="font-regular text-contentsize1 text-primary text-left">
            {safeFeedback.feedback}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionData;
