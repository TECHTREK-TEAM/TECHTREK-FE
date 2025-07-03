import { useState } from 'react';

interface Session {
  sessionInfoId: string;
  enterpriseName: string;
  createdAt: string;
}

// 예시 세션 데이터
const sessions: Session[] = [
  {
    sessionInfoId: '2',
    enterpriseName: '네이버',
    createdAt: '2025-05-19',
  },
  {
    sessionInfoId: '1',
    enterpriseName: '네이버',
    createdAt: '2025-05-18',
  },
];

const RightNavbar = () => {
  const [selectedTabId, setSelectedTabId] = useState<string>(
    sessions[0].sessionInfoId
  );

  return (
    <div className="w-[360px] h-full border-l border-[#E5E5EC]">
      <div className="h-full overflow-y-auto py-4 px-2">
        <ul className="flex flex-col items-center mx-3">
          {sessions.map((session) => {
            const isSelected = selectedTabId === session.sessionInfoId;

            return (
              <li
                key={session.sessionInfoId}
                onClick={() => setSelectedTabId(session.sessionInfoId)}
                className={`cursor-pointer w-full px-5 py-[18px] text-contentsize1 rounded-lg font-semibold transition-all
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
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RightNavbar;
