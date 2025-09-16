import { useEffect, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import LoginModal from '../components/Homes/LoginModal';
import { companyList } from '../constants/companyMap';
import dropdownIcon from '../assets/icons/dropdownIcon.svg'; // 화살표 아이콘 추가

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
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function openLogin() {
    setIsLoginOpen(true);
  }

  function closeLogin() {
    setIsLoginOpen(false);
  }

  // 토큰/이름 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    if (token && name) {
      setUsername(name);
    } else {
      setUsername(null);
    }
  }, []);

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

  // 면접 분석 클릭
  const handleAnalysisClick = () => {
    if (companyList.length === 0) {
      navigate('/analysis'); // 안내 페이지
    } else {
      const first = companyList[0];
      navigate(`/analysis/${first.enterprise}`);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    setIsDropdownOpen(false);
    navigate('/'); // 홈으로 이동
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

        {/* 로그인 / 사용자 이름 + 드롭다운 */}
        {username ? (
            <div className="relative">
              <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-white font-medium px-4 py-2 gap-1"
              >
                {username}님
                <img src={dropdownIcon} alt="드롭다운" className="w-6 h-6"/>
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      로그아웃
                    </button>
                  </div>
              )}
            </div>
        ) : (
            <button
                onClick={openLogin}
                className="text-contentsize1 font-medium text-white px-4 py-2"
            >
              로그인
            </button>
        )}

        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </header>
  );
};

export default Topbar;
