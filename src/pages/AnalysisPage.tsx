import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';
import { mockSessions } from '../constants/mockSessions';

const AnalysisPage = () => {
  const { enterprise, sessionId } = useParams<{
    enterprise: string;
    sessionId: string;
  }>();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState(mockSessions);

  // 선택된 세션 ID 상태 (URL 파라미터 기반)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    sessionId || null
  );

  // URL 파라미터와 상태 동기화
  useEffect(() => {
    setSelectedSessionId(sessionId || null);
  }, [sessionId]);

  const handleSelectSession = (newSessionId: string | null) => {
    setSelectedSessionId(newSessionId);
    if (newSessionId) {
      // 선택된 세션 찾기
      const session = sessions.find((s) => s.sessionInfoId === newSessionId);
      if (session) {
        // URL 변경
        navigate(`/analysis/${session.enterpriseName}/${newSessionId}`);
      }
    } else {
      // 선택 해제 시 홈 또는 다른 페이지로 이동 가능
      navigate(`/`);
    }
  };

  const handleDeleteSession = (sessionIdToDelete: string) => {
    setSessions((prev) =>
      prev.filter((s) => s.sessionInfoId !== sessionIdToDelete)
    );
    if (selectedSessionId === sessionIdToDelete) {
      const remaining = sessions.filter(
        (s) => s.sessionInfoId !== sessionIdToDelete
      );
      if (remaining.length > 0) {
        handleSelectSession(remaining[0].sessionInfoId);
      } else {
        handleSelectSession(null);
      }
    }
  };

  const selectedSession =
    sessions.find((s) => s.sessionInfoId === selectedSessionId) ?? null;

  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        <LeftNavbar
          selectedTab={enterprise || ''}
          onSelectTab={(label) => {
            // enterprise 탭 변경 시 첫 세션으로 이동
            const targetSessions = sessions.filter(
              (s) => s.enterpriseName === label
            );
            if (targetSessions.length > 0) {
              handleSelectSession(targetSessions[0].sessionInfoId);
            }
          }}
        />

        <SessionData
          analysis={selectedSession?.analysis}
          interview={selectedSession?.interview || []}
          feedback={selectedSession?.feedback}
        />

        <RightNavbar
          sessions={sessions.filter((s) => s.enterpriseName === enterprise)}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
