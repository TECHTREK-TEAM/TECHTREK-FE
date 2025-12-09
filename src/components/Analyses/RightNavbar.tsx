import React from 'react';
import closeIcon from '../../assets/icons/closeIcon.svg';

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

export default RightNavbar;
