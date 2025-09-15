import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router-dom';

import Topbar from '../components/Topbar';
import LeftNavbar from '../components/Analyses/LeftNavbar';
import RightNavbar from '../components/Analyses/RightNavbar';
import AnalysisData from '../components/Analyses/SessionData';
import NoAnalysisFound from '../components/Analyses/NoSessionFound';
import { companyList } from '../constants/companyMap';

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

// RightNavbar에서 요구하는 세션 타입 (createdAt은 string 필수)
// interface SessionForRightNavbar {
//   sessionInfoId: string;
//   enterpriseName: string;
//   createdAt: string; // 필수
//   interview: InterviewQA[];
// }

const AnalysisPage = () => {
  const navigate = useNavigate();

  // 기업 이름
  const { enterprise } = useParams<{ enterprise: string }>();

  // 응답 데이터
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [sessionList, setSessionList] = useState<Session[]>([]); // 세션 목록만 저장
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null); // 현재 선택한 세션

  // 현재 선택된 세션 ID
  // const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  // 선택된 세션의 분석 데이터
  // const [selectedSessionData, setSelectedSessionData] = useState<AnalysisResponse | null>(null);

  // const { enterprise, sessionId } = useParams<{
  //   enterprise: string;
  //   sessionId: string;
  // }>();
  // const navigate = useNavigate();

  // 최근 세션 조회
  useEffect(() => {
    if (!enterprise) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/analyses/recent/${enterprise}`
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
        const res = await axios.get(
          `http://localhost:8080/api/analyses/sessions/${enterprise}`
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
      const res = await axios.get(`http://localhost:8080/api/analyses/${id}`);
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
      const res = await axios.delete(`http://localhost:8080/api/analyses/${id}`);

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


  // URL의 sessionId 변경 시 상태 동기화
  // useEffect(() => {
  //   if (sessionId && sessionId !== 'null') {
  //     setSelectedSessionId(sessionId);
  //   } else {
  //     setSelectedSessionId(null);
  //   }
  // }, [sessionId]);

  // if (!enterprise) return;

  // const fetchAllSessions = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:8080/api/analyses/sessions/${enterprise}`
  //     );
  //
  //     const sessionList = res.data?.data?.session ?? [];
  //
  //     // sessionInfoId가 '0'이거나 없는 경우 제거
  //     const validSessions = sessionList.filter(
  //       (s: Session) =>
  //         s.sessionInfoId && s.sessionInfoId !== '0' && s.sessionInfoId !== 0
  //     );
  //
  //     if (validSessions.length > 0) {
  //       // 각 세션의 인터뷰 데이터를 병렬로 조회
  //       const detailedSessions = await Promise.all(
  //         validSessions.map(async (s: Session) => {
  //           try {
  //             const detailRes = await axios.get(
  //               `http://localhost:8080/api/analyses/recent/${enterprise}`
  //             );
  //             const detailData = detailRes.data?.data;
  //             return {
  //               ...s,
  //               interview: detailData?.interview ?? [],
  //               // createdAt: s.createdAt ?? '',
  //             };
  //           } catch {
  //             return {
  //               ...s,
  //               interview: [],
  //               // createdAt: s.createdAt ?? '',
  //             };
  //           }
  //         })
  //       );
  //
  //       setSessions(detailedSessions);
  //       //setSelectedSessionId(detailedSessions[0].sessionInfoId);
  //       navigate(
  //         `/analysis/${enterprise}`,
  //         {
  //           replace: true,
  //         }
  //       );
  //     } else {
  //       setSessions([]);
  //       setSelectedSessionId(null);
  //       setSelectedSessionData(null);
  //       navigate(`/analysis/${enterprise}`, { replace: true });
  //     }
  //   } catch (err) {
  //     console.error('세션 목록 불러오기 실패:', err);
  //     setSessions([]);
  //     setSelectedSessionId(null);
  //     setSelectedSessionData(null);
  //     navigate(`/analysis/${enterprise}`, { replace: true });
  //   }
  // };
  //
  // fetchAllSessions();
  // }, [enterprise, navigate]);

  // 선택된 세션 ID가 변경되면 해당 분석 데이터 불러오기
  // useEffect(() => {
  //   if (!selectedSessionId || selectedSessionId === 'null') {
  //     setSelectedSessionData(null);
  //     return;
  //   }
  //
  //   const fetchSessionData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/api/analyses/recent/${enterprise}?sessionId=${selectedSessionId}`
  //       );
  //
  //       const data = res.data?.data;
  //
  //       // sessionInfoId가 0이면 무효 처리
  //       if (!data || data.sessionInfoId === '0' || data.sessionInfoId === 0) {
  //         setSelectedSessionData(null);
  //       } else {
  //         setSelectedSessionData(data);
  //       }
  //     } catch (err) {
  //       console.error('분석 데이터 불러오기 실패:', err);
  //       setSelectedSessionData(null);
  //     }
  //   };
  //
  //   fetchSessionData();
  // }, [selectedSessionId, enterprise]);

  // 세션 선택 시 URL 이동
  // const handleSelectSession = (newSessionId: string | null) => {
  //   setSelectedSessionId(newSessionId);
  //   if (newSessionId) {
  //     navigate(`/analysis/${enterprise}/${newSessionId}`);
  //   } else {
  //     navigate(`/analysis/${enterprise}/null`);
  //   }
  // };

  // 세션 삭제 시 상태 업데이트 및 선택된 세션 변경
  // const handleDeleteSession = (sessionInfoIdToDelete: string) => {
  //   setSessions((prevSessions) => {
  //     const filtered = prevSessions.filter(
  //       (s) => s.sessionInfoId !== sessionInfoIdToDelete
  //     );
  //
  //     // 현재 선택된 세션이 삭제된 경우 선택 세션 변경 처리
  //     if (selectedSessionId === sessionInfoIdToDelete) {
  //       if (filtered.length > 0) {
  //         handleSelectSession(filtered[0].sessionInfoId);
  //       } else {
  //         handleSelectSession(null);
  //       }
  //     }
  //
  //     return filtered;
  //   });
  // };

  // 선택된 분석 데이터에서 기본값을 보장한 분석 정보 생성
  // const normalizedAnalysis = selectedSessionData
  //   ? {
  //       ...selectedSessionData.analysis,
  //       resultScore: selectedSessionData.analysis.resultScore ?? 0,
  //       followScore: selectedSessionData.analysis.followScore ?? 0,
  //       followAveragePercent:
  //         selectedSessionData.analysis.followAveragePercent ?? 0,
  //       durationAveragePercent:
  //         selectedSessionData.analysis.durationAveragePercent ?? 0,
  //       TopScore: selectedSessionData.analysis.TopScore ?? 0,
  //     }
  //   : null;

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
          // onSelectSession={(id) => setSelectedSessionId(id)}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
            //onSelectSession={handleSelectSession} // 세션을 클릭했을 때 호출되는 콜백.
          // onDeleteSession={handleDeleteSession} // 사용자가 세션 삭제 버튼(X)을 클릭했을 때 호출
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
