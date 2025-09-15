import React from 'react';
// import axios from 'axios';
import closeIcon from '../../assets/icons/closeIcon.svg';

// interface QA {
//   questionNumber: string;
//   question: string;
//   tailQuestionNumber?: string;
// }

// 세션 리스트 응답
interface Session {
  analysisId: number;
  enterpriseName: string;
  createdAt: string;
}

interface RightNavbarProps {
  sessionList: Session[];
  selectedSessionId: number | null;
  onSelectSession?: (id: number) => void; // 선택 콜백
  onDeleteSession: (id: number) => void;
}

// const RightNavbar: React.FC<RightNavbarProps> = ({
//   sessionList
//   // selectedSessionId,
//   // onSelectSession,
//   // onDeleteSession,
// }) => {
//   const [expandedQuestion, setExpandedQuestion] = React.useState<string | null>(
//     null
//   );

// 세션 클릭 시 선택 토글 및 질문 확장 초기화
// const handleSessionClick = (sessionId: string) => {
//   if (selectedSessionId === sessionId) {
//     // 이미 선택된 세션이면 아무 동작도 하지 않음 (선택해제 금지)
//     return;
//   }
//   onSelectSession(sessionId);
//   setExpandedQuestion(null);
// };

// 질문 클릭 시 연계질문 확장 토글
// const handleQuestionClick = (questionNumber: string) => {
//   setExpandedQuestion((prev) =>
//     prev === questionNumber ? null : questionNumber
//   );
// };

// 삭제 확인 후 API 호출 및 삭제 처리
// const handleDeleteClick = async (
//   e: React.MouseEvent<HTMLButtonElement>,
//   sessionInfoId: string
// ) => {
//   e.stopPropagation();
//
//   if (!window.confirm('정말 이 세션을 삭제하시겠습니까?')) return;
//
//   try {
//     const res = await axios.delete(
//       `http://localhost:8080/api/analyses/${sessionInfoId}`
//     );
//
//     if (res.data?.success) {
//       onDeleteSession(sessionInfoId);
//     } else {
//       alert('세션 삭제에 실패했습니다.');
//     }
//   } catch (error) {
//     console.error('세션 삭제 실패:', error);
//     alert('세션 삭제 중 오류가 발생했습니다.');
//   }
// };

const RightNavbar: React.FC<RightNavbarProps> = ({
  sessionList,
  selectedSessionId,
  onSelectSession,
  onDeleteSession,
}) => {
  return (
    <div className="w-[360px] h-full border-l border-[#E5E5EC]">
      <p className="ml-8 mt-8 font-medium text-contentsize2 text-[#505050] text-left">
        면접 세션
      </p>
      <div className="h-full overflow-y-auto py-5 px-2">
        <ul className="flex flex-col items-center mx-3">
          {sessionList.map((session) => {
            const isSelected = selectedSessionId === session.analysisId;
            return (
              <li key={session.analysisId} className="w-full mb-2">
                <div
                  onClick={() => onSelectSession?.(session.analysisId)}
                  className={`cursor-pointer w-full px-5 py-[18px] rounded-lg font-semibold transition-all flex justify-between items-center
                    ${isSelected ? 'bg-[#EBE9FB] shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]' : ''}`}
                >
                  <div className="flex gap-3 items-center text-[#505050]">
                    <span>{session.enterpriseName}</span>
                    <span className="text-sm">
                      {session.createdAt ? session.createdAt.split('T')[0] : ''}
                    </span>
                  </div>

                    {/* 삭제 버튼 */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // 클릭이 세션 선택으로 전파되지 않도록
                            onDeleteSession(session.analysisId); // 부모에서 정의한 handleDeleteSession 호출
                        }}
                        className="w-4 h-4"
                        aria-label="Delete session"
                        type="button"
                    >
                        <img src={closeIcon} alt="close" className="w-full h-full"/>
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

{
    /*<ul className="flex flex-col items-center mx-3">*/
}
{
    /*  {sessions.map((session) => {*/
}
{
    /*    const isSelected = selectedSessionId === session.sessionInfoId;*/
}

{
  /*    // 기본 질문(연계질문 없는 질문) 필터링*/
}
{
  /*    const baseQuestions = session.interview.filter(*/
}
{
  /*      (q) => !q.tailQuestionNumber*/
}
{
  /*    );*/
}

{
  /*    return (*/
}
{
  /*      <li key={session.sessionInfoId} className="w-full mb-2">*/
}
{
  /*        <div*/
}
{
  /*          // onClick={() => handleSessionClick(session.sessionInfoId)}*/
}
{
  /*          className={`cursor-pointer w-full px-5 py-[18px] rounded-lg font-semibold transition-all flex justify-between items-center*/
}
{
  /*            ${*/
}
{
  /*              isSelected*/
}
{
  /*                ? 'bg-[#EBE9FB] shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]'*/
}
{
  /*                : ''*/
}
{
  /*            }*/
}
{
  /*          `}*/
}
{
  /*        >*/
}
{
  /*          <div className="flex gap-3 items-center text-[#505050]">*/
}
{
  /*            <span>{session.enterpriseName}</span>*/
}
{
  /*            <span className="text-sm">*/
}
{
  /*              {session.createdAt ? session.createdAt.split('T')[0] : ''}*/
}
{
  /*            </span>*/
}
{
  /*          </div>*/
}

{
  /*          /!*<button*!/*/
}
{
  /*          /!*  onClick={(e) => handleDeleteClick(e, session.sessionInfoId)}*!/*/
}
{
  /*          /!*  className="w-4 h-4"*!/*/
}
{
  /*          /!*  aria-label="Delete session"*!/*/
}
{
  /*          /!*  type="button"*!/*/
}
{
  /*          /!*>*!/*/
}
{
  /*          /!*  <img*!/*/
}
{
  /*          /!*    src={closeIcon}*!/*/
}
{
  /*          /!*    alt="close"*!/*/
}
{
  /*          /!*    className="w-full h-full"*!/*/
}
{
  /*          /!*  />*!/*/
}
{
  /*          /!*</button>*!/*/
}
{
  /*        </div>*/
}

{
  /*        {isSelected && (*/
}
{
  /*          <div className="pl-3 pt-3">*/
}
{
  /*            {baseQuestions.map((qa, index) => {*/
}
{
  /*              // 연계질문 필터링 (tailQuestionNumber가 존재하는 질문들)*/
}
{
  /*              const tailQuestions = session.interview.filter(*/
}
{
  /*                (tq) =>*/
}
{
  /*                  tq.questionNumber === qa.questionNumber &&*/
}
{
  /*                  !!tq.tailQuestionNumber*/
}
{
  /*              );*/
}

{
  /*              const isExpanded = expandedQuestion === qa.questionNumber;*/
}

{
  /*              return (*/
}
{
  /*                <div key={qa.questionNumber} className="mb-4">*/
}
{
  /*                  <div*/
}
{
  /*                    onClick={() =>*/
}
{
  /*                      handleQuestionClick(qa.questionNumber)*/
}
{
  /*                    }*/
}
{
  /*                    className="flex items-start gap-3 cursor-pointer px-2 py-1"*/
}
{
  /*                  >*/
}
{
  /*                    <div className="w-8 h-8 flex-none shrink-0 rounded-full bg-[#EBE9FB] flex items-center justify-center text-sm font-semibold text-brandcolor">*/
}
{
  /*                      {qa.questionNumber}*/
}
{
  /*                    </div>*/
}
{
  /*                    <div className="flex flex-col text-left">*/
}
{
  /*                      <span className="text-[14px] font-semibold text-[#505050]">*/
}
{
  /*                        질문 {qa.questionNumber.padStart(2, '0')}*/
}
{
  /*                      </span>*/
}
{
  /*                      <span className="text-sm font-medium text-customgray break-words">*/
}
{
  /*                        {qa.question}*/
}
{
  /*                      </span>*/
}
{
  /*                    </div>*/
}
{
  /*                  </div>*/
}

{
  /*                  {tailQuestions.length > 0 && isExpanded && (*/
}
{
  /*                    <div className="w-[1px] h-4 bg-[#C4C4C4] mx-6 my-2" />*/
}
{
  /*                  )}*/
}

{
  /*                  {isExpanded &&*/
}
{
  /*                    tailQuestions.map((tq, idx) => (*/
}
{
  /*                      <div*/
}
{
  /*                        key={`${tq.questionNumber}-${tq.tailQuestionNumber}`}*/
}
{
  /*                        className="ml-12 flex items-start gap-2 px-2 py-1"*/
}
{
  /*                      >*/
}
{
  /*                        <div className="text-[#505050] text-sm mt-[2px]">*/
}
{
  /*                          -*/
}
{
  /*                        </div>*/
}
{
  /*                        <div className="flex flex-col text-left">*/
}
{
  /*                          <span className="text-[14px] font-semibold text-customgray">*/
}
{
  /*                            연계질문 {String(idx + 1).padStart(2, '0')}*/
}
{
  /*                          </span>*/
}
{
  /*                          <span className="text-sm font-medium text-customgray break-words">*/
}
{
  /*                            {tq.question}*/
}
{
  /*                          </span>*/
}
{
  /*                        </div>*/
}
{
  /*                      </div>*/
}
{
  /*                    ))}*/
}

{
  /*                  {index < baseQuestions.length - 1 && (*/
}
{
  /*                    <div className="w-[1px] h-4 bg-[#C4C4C4] mx-6 my-2" />*/
}
{
  /*                  )}*/
}
{
  /*                </div>*/
}
{
  /*              );*/
}
{
  /*            })}*/
}
{
  /*          </div>*/
}
{
  /*        )}*/
}
{
  /*      </li>*/
}
{
  /*    );*/
}
{
  /*  })}*/
}
{
  /*</ul>*/
}
//       </div>
//     </div>
//   );
// };

export default RightNavbar;
