import { useEffect, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import LoginModal from '../components/Homes/LoginModal';
import { mockSessions } from '../constants/mockSessions';

const menuItems = [
  { label: '홈', path: '/' },
  { label: '내 정보', path: '/mypage' },
];

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  function openLogin() {
    setIsLoginOpen(true);
  }

  function closeLogin() {
    setIsLoginOpen(false);
  }

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY >= 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const handleAnalysisClick = () => {
    if (mockSessions.length === 0) {
      navigate('/analysis'); // 안내 페이지로 이동
    } else {
      const first = mockSessions[0];
      navigate(`/analysis/${first.enterpriseName}/${first.sessionInfoId}`);
    }
  };

  const bgClass = !isHome || isScrolledPast ? 'bg-primary' : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 min-h-[80px] ${bgClass} transition-colors duration-300 flex items-center justify-between px-8`}
      style={{ width: '100%' }}
    >
      <div className="flex items-center justify-between w-1/3 min-w-[450px]">
        <div className="text-logosize font-semibold text-white">TECHTREK</div>

        <nav className="flex items-center gap-12">
          {menuItems.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `text-white transition-font ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={handleAnalysisClick}
            className="text-white font-medium text-contentsize1"
          >
            면접 분석
          </button>
        </nav>
      </div>
      <button
        onClick={openLogin}
        className="text-contentsize1 font-medium text-white px-4 py-2"
      >
        로그인
      </button>
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </header>
  );
};

export default Topbar;
