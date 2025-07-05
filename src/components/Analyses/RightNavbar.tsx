import React from 'react';
import closeIcon from '../../assets/icons/closeIcon.svg';

interface QA {
  questionNumber: string;
  question: string;
  tailQuestionNumber?: string;
}

interface Session {
  sessionInfoId: string;
  enterpriseName: string;
  createdAt: string;
  interview: QA[];
}

interface RightNavbarProps {
  sessions: Session[];
  selectedSessionId: string | null;
  onSelectSession: (id: string | null) => void;
  onDeleteSession: (id: string) => void;
}

const RightNavbar: React.FC<RightNavbarProps> = ({
  sessions,
  selectedSessionId,
  onSelectSession,
  onDeleteSession,
}) => {
  const [expandedQuestion, setExpandedQuestion] = React.useState<string | null>(
    null
  );

  // 세션 클릭 시 선택 토글 및 질문 확장 초기화
  const handleSessionClick = (sessionId: string) => {
    if (selectedSessionId === sessionId) {
      // 이미 선택된 세션이면 아무 동작도 하지 않음 (선택해제 금지)
      return;
    }
    onSelectSession(sessionId);
    setExpandedQuestion(null);
  };

  // 질문 클릭 시 연계질문 확장 토글
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
            const isSelected = selectedSessionId === session.sessionInfoId;

            // 기본 질문(연계질문 없는 질문) 필터링
            const baseQuestions = session.interview.filter(
              (q) => !q.tailQuestionNumber
            );

            return (
              <li key={session.sessionInfoId} className="w-full mb-2">
                <div
                  onClick={() => handleSessionClick(session.sessionInfoId)}
                  className={`cursor-pointer w-full px-5 py-[18px] rounded-lg font-semibold transition-all flex justify-between items-center
                    ${isSelected ? 'bg-[#EBE9FB] shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]' : ''}
                  `}
                >
                  <div className="flex gap-3 items-center text-[#505050]">
                    <span>{session.enterpriseName}</span>
                    <span className="text-sm">{session.createdAt}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.sessionInfoId);
                    }}
                    className="w-4 h-4"
                    aria-label="Delete session"
                  >
                    <img
                      src={closeIcon}
                      alt="close"
                      className="w-full h-full"
                    />
                  </button>
                </div>

                {isSelected && (
                  <div className="pl-3 pt-3">
                    {baseQuestions.map((qa, index) => {
                      // 연계질문 필터링 (tailQuestionNumber 존재하는 것)
                      const tailQuestions = session.interview.filter(
                        (tq) =>
                          tq.questionNumber === qa.questionNumber &&
                          tq.tailQuestionNumber
                      );

                      const isExpanded = expandedQuestion === qa.questionNumber;

                      return (
                        <div key={qa.questionNumber} className="mb-4">
                          <div
                            onClick={() =>
                              handleQuestionClick(qa.questionNumber)
                            }
                            className="flex items-start gap-3 cursor-pointer px-2 py-1"
                          >
                            <div className="w-8 h-8 flex-none shrink-0 rounded-full bg-[#EBE9FB] flex items-center justify-center text-sm font-semibold text-brandcolor">
                              {qa.questionNumber}
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-[14px] font-semibold text-[#505050]">
                                질문 {qa.questionNumber.padStart(2, '0')}
                              </span>
                              <span className="text-sm font-medium text-customgray break-words">
                                {qa.question}
                              </span>
                            </div>
                          </div>

                          {tailQuestions.length > 0 && isExpanded && (
                            <div className="w-[1px] h-4 bg-[#C4C4C4] mx-6 my-2" />
                          )}

                          {isExpanded &&
                            tailQuestions.map((tq, idx) => (
                              <div
                                key={`${tq.questionNumber}-${tq.tailQuestionNumber}`}
                                className="ml-12 flex items-start gap-2 px-2 py-1"
                              >
                                <div className="text-[#505050] text-sm mt-[2px]">
                                  -
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[14px] font-semibold text-customgray">
                                    연계질문 {String(idx + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-sm font-medium text-customgray break-words">
                                    {tq.question}
                                  </span>
                                </div>
                              </div>
                            ))}

                          {index < baseQuestions.length - 1 && (
                            <div className="w-[1px] h-4 bg-[#C4C4C4] mx-6 my-2" />
                          )}
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
