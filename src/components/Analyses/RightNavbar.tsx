import { useState } from 'react';

interface QA {
  questionNumber: string;
  question: string;
  tailQuestionNumber?: string;
}

interface Session {
  sessionInfoId: string;
  enterpriseName: string;
  createdAt: string;
}

const sessions: Session[] = [
  {
    sessionInfoId: '2',
    enterpriseName: '네이버',
    createdAt: '2025-05-19',
  },
];

const mockInterviewMap: Record<string, QA[]> = {
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
};

const RightNavbar = () => {
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const handleSessionClick = (sessionId: string) => {
    setSelectedTabId((prev) => (prev === sessionId ? null : sessionId));
    setExpandedQuestion(null); // 세션 전환 시 꼬리질문 닫기
  };

  const handleQuestionClick = (questionNumber: string) => {
    setExpandedQuestion((prev) =>
      prev === questionNumber ? null : questionNumber
    );
  };

  return (
    <div className="w-[360px] h-full border-l border-[#E5E5EC]">
      <div className="h-full overflow-y-auto py-4 px-2">
        <ul className="flex flex-col items-center mx-3">
          {sessions.map((session) => {
            const isSelected = selectedTabId === session.sessionInfoId;
            const interviewList = mockInterviewMap[session.sessionInfoId] || [];
            const baseQuestions = interviewList.filter(
              (q) => !q.tailQuestionNumber
            );

            return (
              <li key={session.sessionInfoId} className="w-full mb-2">
                <div
                  onClick={() => handleSessionClick(session.sessionInfoId)}
                  className={`cursor-pointer w-full px-5 py-[18px] rounded-lg font-semibold transition-all
                    ${
                      isSelected
                        ? 'bg-[#EBE9FB] shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]'
                        : ''
                    }
                  `}
                >
                  <div className="flex justify-start gap-3 items-center text-[#505050]">
                    <span>{session.enterpriseName}</span>
                    <span className="text-sm">{session.createdAt}</span>
                  </div>
                </div>

                {/* 질문 리스트 */}
                {isSelected && (
                  <div className="px-2 mt-2">
                    {baseQuestions.map((qa) => {
                      const tailQuestions = interviewList.filter(
                        (tq) => tq.tailQuestionNumber === qa.questionNumber
                      );
                      const isExpanded = expandedQuestion === qa.questionNumber;

                      return (
                        <div key={qa.questionNumber} className="mb-2">
                          <p
                            onClick={() =>
                              handleQuestionClick(qa.questionNumber)
                            }
                            className="cursor-pointer text-sm text-[#505050] px-2 py-1 hover:underline"
                          >
                            Q{qa.questionNumber}. {qa.question}
                          </p>

                          {/* 꼬리질문 표시 */}
                          {isExpanded &&
                            tailQuestions.map((tq) => (
                              <p
                                key={`${tq.questionNumber}-${tq.tailQuestionNumber}`}
                                className="ml-4 text-sm text-[#505050] pl-2 border-l border-gray-300"
                              >
                                Q{tq.questionNumber}-{tq.tailQuestionNumber}.{' '}
                                {tq.question}
                              </p>
                            ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RightNavbar;
