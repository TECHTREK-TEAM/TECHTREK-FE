import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Analysis from './pages/AnalysisPage.tsx';
import Interview from './pages/InterviewPage.tsx';
import MyPage from './pages/MyPage.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 기업명과 세션 ID를 포함한 상세 분석 페이지 */}
        <Route path="/analysis/:enterprise/:sessionId" element={<Analysis />} />

        {/* 기존 /analysis 경로는 리다이렉트 또는 안내 페이지 */}
        <Route path="/analysis" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
