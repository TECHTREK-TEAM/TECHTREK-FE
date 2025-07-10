import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Analysis from './pages/AnalysisPage.tsx';
import Interview from './pages/InterviewPage.tsx';
import MyPage from './pages/MyPage.tsx';
import NoSessionPage from './pages/NoSessionPage.tsx';
import InterviewResultPage from './pages/InterviewResultPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview/result" element={<InterviewResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/analysis" element={<NoSessionPage />} />
        <Route path="/analysis/:enterprise/:sessionId" element={<Analysis />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
