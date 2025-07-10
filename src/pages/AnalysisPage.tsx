import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';
import NoSessionFound from '../components/Analyses/NoSessionFound';
import { mockSessions } from '../constants/mockSessions';

const AnalysisPage = () => {
  const { enterprise, sessionId } = useParams<{
    enterprise: string;
    sessionId: string;
  }>();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (sessionId && sessionId !== 'null') {
      setSelectedSessionId(sessionId);
    } else {
      setSelectedSessionId(null);
    }
  }, [sessionId]);

  const handleSelectSession = (newSessionId: string | null) => {
    setSelectedSessionId(newSessionId);
    if (newSessionId) {
      const session = sessions.find((s) => s.sessionInfoId === newSessionId);
      if (session) {
        navigate(`/analysis/${session.enterpriseName}/${newSessionId}`);
      }
    } else {
      // 세션이 없는 경우 명시적으로 'null'을 URL에 표시
      navigate(`/analysis/${enterprise}/null`);
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
            const targetSessions = sessions.filter(
              (s) => s.enterpriseName === label
            );
            if (targetSessions.length > 0) {
              handleSelectSession(targetSessions[0].sessionInfoId);
            } else {
              // 세션이 없더라도 URL 이동
              navigate(`/analysis/${label}/null`);
            }
          }}
        />

        {selectedSession ? (
          <SessionData
            analysis={selectedSession.analysis}
            interview={selectedSession.interview}
            feedback={selectedSession.feedback}
            enterpriseName={selectedSession.enterpriseName}
          />
        ) : (
          <NoSessionFound />
        )}

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
