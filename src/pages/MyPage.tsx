import Topbar from '../components/Topbar';
import InterviewCard from '../components/MyPages/InterviewCard';
import ProgressBar from '../components/ProgressBar';
import ResumeUploader from '../components/MyPages/ResumeUploader';
import interestedEnterpriseIcon from '../assets/icons/interestedEnterpriseIcon.svg';
import interviewTotalIcon from '../assets/icons/interviewTotalIcon.svg';
import interviewPassIcon from '../assets/icons/interviewPassIcon.svg';
import ProfileCard from '../components/MyPages/ProfileCard';

const MyPage = () => {
  const name = 'hiya';
  const group = 'Frontend Developer';
  const seniority = 1;
  const InterviewTotal = 50;
  const InterviewPass = 30;
  const InterviewPercent = (InterviewPass / InterviewTotal) * 100;
  const averageResultScore = 60.6;
  const enhancedPercent = 11.0;

  // 관심기업 상위 3개 리스트(임시)
  const companies = [
    { companyName: '네이버', companyPercent: 50 },
    { companyName: '카카오', companyPercent: 30 },
    { companyName: '토스', companyPercent: 20 },
  ];

  const interviews = [
    {
      highestScore: {
        enterpriseName: '네이버',
        resultScore: 72.0,
        analysisGroup: 'Frontend Developer',
      },
      recentInterview: {
        enterpriseName: '카카오',
        resultScore: 55.0,
        analysisGroup: 'Backend Developer',
      },
      resume: {
        status: true,
      },
    },
  ];

  const interviewCardsData = [
    {
      title: '내가 가장 높게 점수를 받았던 면접',
      resultScore: interviews[0].highestScore.resultScore,
      enterpriseName: interviews[0].highestScore.enterpriseName,
      analysisGroup: interviews[0].highestScore.analysisGroup,
    },
    {
      title: '내가 가장 최근에 본 면접',
      resultScore: interviews[0].recentInterview.resultScore,
      enterpriseName: interviews[0].recentInterview.enterpriseName,
      analysisGroup: interviews[0].recentInterview.analysisGroup,
    },
  ];

  return (
    <div className="min-h-screen max-h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />

      <div className="w-full h-full max-w-[1920px] mx-auto px-[80px] 2xl:px-[172px] pt-[60px] pb-[60px] flex flex-col gap-10">
        <p className="font-semibold text-[40px] text-primary text-left">
          내 정보
        </p>
        <div className="w-full max-h-[686px] h-full flex gap-5 2xl:gap-10">
          {/* 왼쪽 박스 영역 */}
          <div className="w-full max-w-[280px] 2xl:max-w-[328px] h-full flex flex-col justify-start gap-5">
            {/* 프로필 영역 */}
            <ProfileCard name={name} group={group} seniority={seniority} />
            {/* 프로필 영역 */}

            {/* 관심기업 영역 */}
            <div className="bg-white w-full max-w-[328px] max-h-[200px] h-fit flex flex-col rounded-xl">
              <div className="px-5 py-3 w-full h-fit flex items-center gap-[9px] border-b border-[#e9e9e9]">
                <img
                  src={interestedEnterpriseIcon}
                  className="w-6 h-6 select-none"
                />
                <p className="font-semibold text-[15px]">관심기업</p>
              </div>
              <div className="w-full h-fit px-8">
                {companies.map((item, index) => (
                  <div
                    key={item.companyName}
                    className={`px-3 py-3 flex justify-between items-center ${
                      index !== companies.length - 1
                        ? 'border-b border-[#e9e9e9]'
                        : ''
                    }`}
                  >
                    <div className="flex gap-[15px] items-center">
                      <div className="w-6 h-6 select-none bg-gray-300 rounded-md" />
                      <p className="font-regular text-[15px]">
                        {item.companyName}
                      </p>
                    </div>
                    <div className="font-regular px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                      {item.companyPercent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 관심기업 영역 */}

            {/* 사용자 합격률 영역 */}
            <div className="bg-white w-full max-w-[328px] max-h-[150px] h-fit flex flex-col rounded-xl">
              <div className="px-5 py-3 w-full h-fit flex justify-between items-center border-b border-[#e9e9e9]">
                <div className="flex gap-[9px] items-center">
                  <img
                    src={interestedEnterpriseIcon}
                    className="w-6 h-6 select-none"
                  />
                  <p className="font-semibold text-[15px]">나의 합격률</p>
                </div>
                <p className="font-semibold text-[15px]">
                  {InterviewPercent} %
                </p>
              </div>
              <div className="w-full h-fit px-8">
                <div className="px-3 py-3 flex justify-between items-center border-b border-[#e9e9e9]">
                  <div className="flex gap-[15px] items-center">
                    <img
                      src={interviewTotalIcon}
                      className="w-6 h-6 select-none"
                    />
                    <p className="font-regular text-[15px]">전체 면접 수</p>
                  </div>
                  <div className="font-regular px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                    {InterviewTotal}회
                  </div>
                </div>
                <div className="px-3 py-3 flex justify-between items-center">
                  <div className="flex gap-[15px] items-center">
                    <img
                      src={interviewPassIcon}
                      className="w-6 h-6 select-none"
                    />
                    <p className="font-regular text-[15px]">합격 면접 수</p>
                  </div>
                  <div className="font-regular px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                    {InterviewPass}회
                  </div>
                </div>
              </div>
            </div>
            {/* 사용자 합격률 영역 */}
          </div>
          {/* 왼쪽 박스 영역 */}

          {/* 오른쪽 박스 영역 */}
          <div className="w-full max-w-[1209px] h-full flex flex-col justify-start gap-5">
            {/* 그래프 영역 */}
            <div className="bg-white w-full max-w-[1209px] max-h-[276px] h-fit flex flex-col rounded-xl px-10 py-[35px]">
              <div className="w-full h-fit flex flex-col gap-16">
                <p className="w-full font-semibold text-logosize text-left select-none">
                  답변 일치율
                </p>
                <div className="flex flex-col gap-5">
                  <ProgressBar percentage={averageResultScore} />
                  <p className="w-full font-medium text-contentsize2 text-customgray text-left select-none">
                    저번달 대비{' '}
                    <span className="text-[#119200]">{enhancedPercent}%</span>{' '}
                    증가
                  </p>
                </div>
              </div>
            </div>
            {/* 그래프 영역 */}

            {/* 면접 세션 바로가기 영역 */}
            <div className="max-w-[1209px] w-full h-[379px] flex gap-3">
              {interviewCardsData.map((card, idx) => (
                <InterviewCard
                  key={idx}
                  title={card.title}
                  resultScore={card.resultScore}
                  enterpriseName={card.enterpriseName}
                  analysisGroup={card.analysisGroup}
                  name={name}
                />
              ))}

              {/* 파일 첨부 컴포넌트 */}
              <ResumeUploader />
            </div>
            {/* 면접 세션 바로가기 영역 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
