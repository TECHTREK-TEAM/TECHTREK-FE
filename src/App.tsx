import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Analysis from './pages/AnalysisPage.tsx';
import Interview from './pages/InterviewPage.tsx';
import MyPage from './pages/MyPage.tsx';
import NoSessionPage from './pages/NoSessionPage.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/analysis" element={<NoSessionPage />} />
        <Route path="/analysis/:enterprise/:sessionId" element={<Analysis />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
