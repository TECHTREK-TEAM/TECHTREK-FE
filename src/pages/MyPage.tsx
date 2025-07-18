import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Topbar from '../components/Topbar';
import InterviewCard from '../components/MyPages/InterviewCard';
import ProgressBar from '../components/ProgressBar';
import ResumeUploader from '../components/MyPages/ResumeUploader';
import interestedEnterpriseIcon from '../assets/icons/interestedEnterpriseIcon.svg';
import interviewTotalIcon from '../assets/icons/interviewTotalIcon.svg';
import interviewPassIcon from '../assets/icons/interviewPassIcon.svg';
import ProfileCard from '../components/MyPages/ProfileCard';

interface Company {
  companyName: string;
  companyPercent: number;
}

// API 함수
const fetchUserInfo = async () => {
  const response = await axios.get('http://localhost:8081/api/users/info');
  return response.data.data;
};

const fetchUserScore = async () => {
  const response = await axios.get('http://localhost:8081/api/users/score');
  return response.data.data;
};

const fetchUserPassInfo = async () => {
  const response = await axios.get('http://localhost:8081/api/users/pass');
  return response.data.data;
};

const fetchUserInterviews = async () => {
  const response = await axios.get(
    'http://localhost:8081/api/users/interviews'
  );
  return response.data.data;
};

const fetchUserCompanies = async (): Promise<Company[]> => {
  const response = await axios.get('http://localhost:8081/api/users/companies');
  return response.data.data.companies;
};

const MyPage = () => {
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });

  const { data: userScore, isLoading: scoreLoading } = useQuery({
    queryKey: ['userScore'],
    queryFn: fetchUserScore,
  });

  const { data: passInfo, isLoading: isPassLoading } = useQuery({
    queryKey: ['userPassInfo'],
    queryFn: fetchUserPassInfo,
  });

  const { data: interviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ['userInterviews'],
    queryFn: fetchUserInterviews,
  });

  const { data: companies, isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ['userCompanies'],
    queryFn: fetchUserCompanies,
  });

  const interviewCardsData =
    interviews?.highestScore && interviews?.recentInterview
      ? [
          {
            title: '내가 가장 높게 점수를 받았던 면접',
            resultScore: interviews.highestScore.resultScore,
            enterpriseName: interviews.highestScore.enterpriseName,
            analysisGroup: interviews.highestScore.analysisGroup,
          },
          {
            title: '내가 가장 최근에 본 면접',
            resultScore: interviews.recentInterview.resultScore,
            enterpriseName: interviews.recentInterview.enterpriseName,
            analysisGroup: interviews.recentInterview.analysisGroup,
          },
        ]
      : [];

  // 업로드 성공 콜백
  const handleResumeUploadSuccess = (data: any) => {
    // 사용자 정보 다시 불러오기
    refetchUserInfo();
  };

  return (
    <div className="min-h-screen max-h-[1080px] w-full flex flex-col bg-[#F1F4F6] pt-[80px]">
      <Topbar />
      <div className="w-full h-full max-w-[1920px] mx-auto px-[80px] 2xl:px-[172px] pt-[60px] pb-[60px] flex flex-col gap-10">
        <p className="font-semibold text-[40px] text-primary text-left">
          내 정보
        </p>
        <div className="w-full max-h-[686px] h-full flex gap-5 2xl:gap-10">
          {/* 왼쪽 영역 */}
          <div className="w-full max-w-[280px] 2xl:max-w-[328px] h-full flex flex-col justify-start gap-5">
            {!userInfoLoading && userInfo && (
              <ProfileCard
                name={userInfo.name}
                userGroup={userInfo.seniority}
                seniority={userInfo.userGroup}
                stacks={userInfo.stacks}
              />
            )}

            {/* 관심기업 */}
            <div className="bg-white w-full max-w-[328px] max-h-[200px] h-fit flex flex-col rounded-xl">
              <div className="px-5 py-3 flex items-center gap-[9px] border-b border-[#e9e9e9]">
                <img src={interestedEnterpriseIcon} className="w-6 h-6" />
                <p className="font-semibold text-[15px]">관심기업</p>
              </div>
              <div className="w-full h-fit px-8">
                {companiesLoading ? (
                  <p className="text-customgray text-[15px] py-4">로딩 중...</p>
                ) : companies && companies.length > 0 ? (
                  companies.map((item, index) => (
                    <div
                      key={item.companyName}
                      className={`px-3 py-3 flex justify-between items-center ${
                        index !== companies.length - 1
                          ? 'border-b border-[#e9e9e9]'
                          : ''
                      }`}
                    >
                      <div className="flex gap-[15px] items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-md" />
                        <p className="text-[15px]">{item.companyName}</p>
                      </div>
                      <div className="px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                        {item.companyPercent}%
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-customgray text-[15px] py-4">
                    관심 기업이 없습니다
                  </p>
                )}
              </div>
            </div>

            {/* 합격률 */}
            <div className="bg-white w-full max-w-[328px] max-h-[150px] h-fit flex flex-col rounded-xl">
              <div className="px-5 py-3 flex justify-between items-center border-b border-[#e9e9e9]">
                <div className="flex gap-[9px] items-center">
                  <img src={interestedEnterpriseIcon} className="w-6 h-6" />
                  <p className="font-semibold text-[15px]">나의 합격률</p>
                </div>
                <p className="font-semibold text-[15px]">
                  {isPassLoading
                    ? '로딩 중...'
                    : `${passInfo?.interviewPercent ?? 0}%`}
                </p>
              </div>
              <div className="w-full h-fit px-8">
                <div className="px-3 py-3 flex justify-between items-center border-b border-[#e9e9e9]">
                  <div className="flex gap-[15px] items-center">
                    <img src={interviewTotalIcon} className="w-6 h-6" />
                    <p className="text-[15px]">전체 면접 수</p>
                  </div>
                  <div className="px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                    {passInfo?.interviewTotal ?? 0}회
                  </div>
                </div>
                <div className="px-3 py-3 flex justify-between items-center">
                  <div className="flex gap-[15px] items-center">
                    <img src={interviewPassIcon} className="w-6 h-6" />
                    <p className="text-[15px]">합격 면접 수</p>
                  </div>
                  <div className="px-2 py-1 bg-[#EFF0FF] text-[13px] text-[#7778EF] rounded-md">
                    {passInfo?.interviewPass ?? 0}회
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className="w-full max-w-[1209px] h-full flex flex-col justify-start gap-5">
            {/* 일치율 */}
            <div className="bg-white w-full max-w-[1209px] max-h-[276px] h-fit flex flex-col rounded-xl px-10 py-[35px]">
              <div className="w-full flex flex-col gap-16">
                <p className="text-logosize font-semibold text-left">
                  답변 일치율
                </p>
                <div className="flex flex-col gap-5">
                  {scoreLoading ? (
                    <p>로딩 중...</p>
                  ) : (
                    <>
                      <ProgressBar
                        percentage={userScore?.averageResultScore ?? 0}
                      />
                      <p className="text-contentsize2 text-customgray text-left">
                        저번달 대비{' '}
                        <span className="text-[#119200]">
                          {userScore?.enhancedPercent ?? 0}%
                        </span>{' '}
                        증가
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 면접 카드 */}
            <div className="w-full h-[379px] flex gap-3">
              {interviewsLoading ? (
                <p>로딩 중...</p>
              ) : interviewCardsData.length > 0 ? (
                <>
                  {interviewCardsData.map((card, idx) => (
                    <div key={idx} className="flex-1 max-w-[33.333%]">
                      <InterviewCard
                        title={card.title}
                        resultScore={card.resultScore}
                        enterpriseName={card.enterpriseName}
                        analysisGroup={card.analysisGroup}
                        name={userInfo?.name ?? ''}
                      />
                    </div>
                  ))}

                  <ResumeUploader onUploadSuccess={handleResumeUploadSuccess} />
                </>
              ) : (
                <>
                  <div className="flex-1 max-w-[33.333%]">
                    <div className="w-full h-full bg-white  rounded-xl flex items-center justify-center">
                      <p className="text-customgray text-[15px]">
                        해당하는 세션이 없습니다
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 max-w-[33.333%]">
                    <div className="w-full h-full bg-white  rounded-xl flex items-center justify-center">
                      <p className="text-customgray text-[15px]">
                        해당하는 세션이 없습니다
                      </p>
                    </div>
                  </div>

                  <ResumeUploader onUploadSuccess={handleResumeUploadSuccess} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
