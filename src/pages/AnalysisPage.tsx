import { useState } from 'react';
import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';
import { mockSessions } from '../constants/mockSessions';

const AnalysisPage = () => {
  // 세션 리스트 상태 (삭제 가능하도록)
  const [sessions, setSessions] = useState(mockSessions);

  // 선택된 세션 ID 상태
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    sessions.length > 0 ? sessions[0].sessionInfoId : null
  );

  const handleSelectSession = (sessionId: string | null) => {
    if (sessionId === null) {
      setSelectedSessionId(null);
    } else {
      setSelectedSessionId(sessionId);
    }
  };

  // 세션 삭제 핸들러
  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.sessionInfoId !== sessionId));
    if (selectedSessionId === sessionId) {
      // 삭제한 세션이 선택된 상태면 선택 초기화 또는 첫 세션 선택
      setSelectedSessionId((prev) => {
        if (prev === sessionId) {
          const remaining = sessions.filter(
            (s) => s.sessionInfoId !== sessionId
          );
          return remaining.length > 0 ? remaining[0].sessionInfoId : null;
        }
        return prev;
      });
    }
  };

  // 현재 선택된 세션 데이터
  const selectedSession =
    sessions.find((s) => s.sessionInfoId === selectedSessionId) ?? null;

  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        <LeftNavbar />

        {/* SessionData에 현재 선택된 세션 데이터 전달 */}
        <SessionData
          analysis={selectedSession?.analysis}
          interview={selectedSession?.interview || []}
          feedback={selectedSession?.feedback}
        />

        {/* RightNavbar에 세션 리스트, 선택/삭제 함수, 선택된 ID 전달 */}
        <RightNavbar
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
