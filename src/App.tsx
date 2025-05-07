import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Analysis from './pages/AnalysisPage.tsx';
import Interview from './pages/InterviewPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Analysis />} />
        <Route path="/" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
