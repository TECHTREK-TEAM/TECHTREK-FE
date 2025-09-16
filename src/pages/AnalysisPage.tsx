import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import AnalysisData from '../components/Analyses/SessionData';
import NoAnalysisFound from '../components/Analyses/NoSessionFound';
import { companyList } from '../constants/companyMap';
import axiosInstance from '../api';

// API 응답
interface Analysis {
  pass: boolean;
  score: number;
  duration: number;
  averageDurationPercent: number;
  topScore: number;
}

interface InterviewQA {
  question: string;
  answer: string;
  questionNumber: string;
  similarity: number;
}

interface Feedback {
  keyword: string;
  keywordNumber: string;
  feedback: string;
}

interface AnalysisResponse {
  analysisId: number;
  analysis: Analysis;
  interview: InterviewQA[];
  feedback: Feedback | null;
}

// 세션 리스트 응답
interface Session {
  analysisId: number;
  enterpriseName: string;
  createdAt: string;
}


const AnalysisPage = () => {
  const navigate = useNavigate();

  // 기업 이름
  const { enterprise } = useParams<{ enterprise: string }>();

  // 응답 데이터
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [sessionList, setSessionList] = useState<Session[]>([]); // 세션 목록만 저장
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null); // 현재 선택한 세션

  // 최근 세션 조회
  useEffect(() => {
    if (!enterprise) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/analyses/recent/${enterprise}`
        );
        setAnalysisData(res.data.data);
        // 최근 세션이 있으면 selectedSessionId로 설정
        if (res.data.data?.analysisId) {
          setSelectedSessionId(res.data.data.analysisId);
        }
      } catch (error) {
        console.error('분석 데이터 불러오기 실패:', error);
        setAnalysisData(null);
        setSelectedSessionId(null);
      }
    };

    fetchData();
  }, [enterprise]);

  // 세션 리스트 조회
  useEffect(() => {
    if (!enterprise) return;

    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/analyses/sessions/${enterprise}`
        );
        const sessions = res.data?.data?.sessions ?? [];

        const validSessions = sessions.filter(
          (s: Session) => s.analysisId && s.analysisId !== 0
        );

        setSessionList(validSessions);
      } catch (err) {
        console.error('세션 목록 불러오기 실패:', err);
        setSessionList([]);
      }
    };

    fetchSessions();
  }, [enterprise]);

  // 선택한 세션 조회
  const handleSelectSession = async (id: number) => {
    setSelectedSessionId(id);

    try {
      const res = await axiosInstance.get(`/api/analyses/${id}`);
      setAnalysisData(res.data.data); // 클릭한 세션 데이터로 화면 갱신
    } catch (err) {
      console.error('세션 분석 데이터 불러오기 실패:', err);
      setAnalysisData(null);
    }
  };

  // 선택한 세션 삭제
  const handleDeleteSession = async (id: number) => {
    // 사용자 확인
    if (!window.confirm('정말 이 세션을 삭제하시겠습니까?')) return;

    try {
      const res = await axiosInstance.delete(`/api/analyses/${id}`);

      if (res.data?.success) {
        // 삭제 후 상태 업데이트
        setSessionList((prevSessions) => {
          const filtered = prevSessions.filter((s) => s.analysisId !== id);

          // 삭제한 세션이 현재 선택된 세션이면
          if (selectedSessionId === id) {
            if (filtered.length > 0) {
              // 남은 세션 중 첫 번째 선택
              handleSelectSession(filtered[0].analysisId);
            } else {
              setSelectedSessionId(null);
              setAnalysisData(null);
            }
          }

          return filtered;
        });
      } else {
        alert('세션 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('세션 삭제 실패:', error);
      alert('세션 삭제 중 오류가 발생했습니다.');
    }
  };


  return (
    <div className="h-screen w-full flex flex-col bg-[#F1F4F6]">
      <Topbar />

      <div className="flex flex-1 pt-[80px] overflow-hidden">
        {/*왼쪽 사이드 바 */}
        <LeftNavbar
          selectedTab={enterprise || ''} // 선택된 기업 이름
          onSelectTab={(name) => {
            const target = companyList.find((c) => c.name === name);
            if (target) {
              navigate(`/analysis/${target.enterprise}`);
            }
          }}
        />

        {analysisData?.analysis && enterprise ? (
          <AnalysisData
            analysis={analysisData.analysis}
            interview={analysisData.interview}
            feedback={analysisData.feedback}
            enterprise={enterprise}
          />
        ) : (
          <NoAnalysisFound />
        )}

        {/*오른쪽 사이드 바 */}
        <RightNavbar
          sessionList={sessionList}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
