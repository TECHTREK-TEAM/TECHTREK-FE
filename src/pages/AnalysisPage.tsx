import { useState } from 'react';
import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';

// mock 질문 데이터 (RightNavbar 기존 데이터 옮김)
const mockInterviewMap: Record<
  string,
  { questionNumber: string; question: string; tailQuestionNumber?: string }[]
> = {
  '2': [
    {
      questionNumber: '1',
      question: '자기소개 해주세요.',
    },
    {
      questionNumber: '1',
      tailQuestionNumber: '1',
      question: '자기소개에서 언급한 강점을 프로젝트에서 어떻게 발휘했나요?',
    },
    {
      questionNumber: '2',
      question: '백엔드 개발에서 가장 중요하다고 생각하는 역량은 무엇인가요?',
    },
    {
      questionNumber: '2',
      tailQuestionNumber: '1',
      question: '그 역량을 기를 수 있었던 경험은 무엇인가요?',
    },
    {
      questionNumber: '2',
      tailQuestionNumber: '2',
      question: '그 역량이 팀에 어떤 영향을 미쳤다고 생각하나요?',
    },
  ],
  '3': [
    {
      questionNumber: '1',
      question: '최근에 공부한 기술 중 가장 인상 깊었던 것은 무엇인가요?',
    },
    {
      questionNumber: '2',
      question: 'REST API와 GraphQL의 차이점을 설명해주세요.',
    },
    {
      questionNumber: '2',
      tailQuestionNumber: '1',
      question: 'GraphQL을 실제 프로젝트에 적용해본 경험이 있나요?',
    },
  ],
};

const AnalysisPage = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  // 선택된 세션 ID에 따른 질문 목록 가져오기, 없으면 빈 배열
  const questions = selectedSessionId
    ? (mockInterviewMap[selectedSessionId] ?? [])
    : [];

  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      {/* 탑바 */}
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <LeftNavbar />

        {/* 중앙 콘텐츠: 질문 목록 전달 */}
        <SessionData questions={questions} />

        {/* 오른쪽 사이드바: 선택된 세션 ID 및 선택 변경 함수 전달 */}
        <RightNavbar
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
