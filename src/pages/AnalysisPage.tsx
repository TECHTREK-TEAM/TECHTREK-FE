import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Topbar from '../components/Topbar';
// import LeftNavbar from '../components/Analyses/LeftNavbar';
// import RightNavbar from '../components/Analyses/RightNavbar';
import SessionData from '../components/Analyses/SessionData';
import NoSessionFound from '../components/Analyses/NoSessionFound';

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

// RightNavbar에서 요구하는 세션 타입 (createdAt은 string 필수)
// interface SessionForRightNavbar {
//   sessionInfoId: string;
//   enterpriseName: string;
//   createdAt: string; // 필수
//   interview: InterviewQA[];
// }

const AnalysisPage = () => {
  // 응답 분석 데이터
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);

  // 기업 이름
  const { enterprise } = useParams<{ enterprise: string }>();

  // 현재 선택된 세션 ID
  // const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
  //     null
  // );
  // 선택된 세션의 분석 데이터
  // const [selectedSessionData, setSelectedSessionData] =
  //     useState<AnalysisResponse | null>(null);

  // const { enterprise, sessionId } = useParams<{
  //   enterprise: string;
  //   sessionId: string;
  // }>();
  // const navigate = useNavigate();

  // 최근 세션, 리스트 조회
  useEffect(() => {
    if (!enterprise) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
            `http://localhost:8080/api/analyses/recent/${enterprise}`
        );
        setAnalysisData(res.data.data);

      } catch (error) {
        console.error("분석 데이터 불러오기 실패:", error);
        setAnalysisData(null);
      }
    };

    fetchData();
  }, [enterprise]);


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
        {/*<LeftNavbar*/}
        {/*  // selectedTab={enterprise || ''}*/}
        {/*  // onSelectTab={(label) => {*/}
        {/*  //   const targetSessions = sessions.filter(*/}
        {/*  //     (s) => s.enterpriseName === label*/}
        {/*  //   );*/}
        {/*  //   if (targetSessions.length > 0) {*/}
        {/*  //     handleSelectSession(targetSessions[0].sessionInfoId);*/}
        {/*  //   } else {*/}
        {/*  //     navigate(`/analysis/${label}/null`);*/}
        {/*  //   }*/}
        {/*  //   console*/}
        {/*  // }}*/}
        {/*/>*/}

        {analysisData?.analysis && enterprise ? (
            <SessionData
                analysis={analysisData.analysis}
                interview={analysisData.interview}
                feedback={analysisData.feedback}
                enterprise={enterprise}
            />
        ) : (
            <NoSessionFound />
        )}

        {/*<RightNavbar*/}
        {/*  selectedSessionId={selectedSessionId}*/}
        {/*  onSelectSession={handleSelectSession}*/}
        {/*  onDeleteSession={handleDeleteSession} // 삭제 후 상태 갱신 콜백*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default AnalysisPage;
