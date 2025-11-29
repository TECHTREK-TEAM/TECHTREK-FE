import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/Homes/LoginModal';
import { companyList } from '../constants/companyMap';
import dropdownIcon from '../assets/icons/dropdownIcon.svg';
import axiosInstance from "../api.tsx";

const Topbar = () => {
  const navigate = useNavigate();
  const isHome = location.pathname === '/'; // 현재 경로가 홈인지 확인

  // 상태 관리
  const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 열림 상태
  const [isScrolledPast, setIsScrolledPast] = useState(false); // 스크롤 위치 상태
  const [username, setUsername] = useState<string | null>(null); // 로그인한 사용자 이름
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 메뉴 상태

  // 로컬스토리지에서 토큰/이름 가져오기
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('username');

  // 로그인 모달 열기/닫기
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  // 컴포넌트 마운트 시 토큰/이름 확인 후 상태 설정
  useEffect(() => {
    if (token && name) {
      setUsername(name);
    } else {
      setUsername(null);
    }
  }, [token, name]);

  // 스크롤 이벤트에 따른 배경 색상 변경
  useEffect(() => {
    const handleScroll = () => setIsScrolledPast(window.scrollY >= 100);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 메뉴 클릭 시 로그인 확인 + 이동
  const handleNavigation = (path: string) => {
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    navigate(path);
  };

  // 면접 분석 버튼 클릭
  const handleAnalysisClick = () => {
    if (!token) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    if (companyList.length === 0) {
      navigate('/analysis'); // 면접 분석 안내 페이지로 이동
    } else {
      const first = companyList[0];
      navigate(`/analysis/${first.enterprise}`); // 첫 번째 기업 분석 페이지로 이동
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      console.log("dkdkdk")
      await axiosInstance.post('/api/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('로그아웃 실패', error);
    } finally {
      // 로컬 토큰 제거
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setUsername(null);
      setIsDropdownOpen(false);
      //window.location.href = '/'; // 홈으로 이동
    }
  };

  // 스크롤 상태에 따른 배경 클래스
  const bgClass =  !isHome ||isScrolledPast ? 'bg-primary' : 'bg-transparent';

  return (
      <header
          className={`fixed top-0 left-0 right-0 z-50 min-h-[80px] ${bgClass} transition-colors duration-300 flex items-center justify-between px-8`}
          style={{ width: '100%' }}
      >
        {/* 좌측: 로고 + 메뉴 */}
        <div className="flex items-center justify-between w-1/3 min-w-[450px]">
          <div className="text-logosize font-semibold text-white">TECHTREK</div>

          <nav className="flex items-center gap-12">
            {/* 홈 버튼 */}
            <button
                onClick={() => navigate('/')}
                className="text-white font-medium text-contentsize1"
            >
              홈
            </button>

            {/* 내 정보 버튼 */}
            <button
                onClick={() => handleNavigation('/mypage')}
                className="text-white font-medium text-contentsize1"
            >
              내 정보
            </button>

            {/* 면접 분석 버튼 */}
            <button
                onClick={handleAnalysisClick}
                className="text-white font-medium text-contentsize1"
            >
              면접 분석
            </button>
          </nav>
        </div>

        {/* 우측: 로그인 상태 / 사용자 이름 + 드롭다운 */}
        {username ? (
            <div className="relative">
              {/* 사용자 이름 + 드롭다운 버튼 */}
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
            // 로그인 버튼
            <button
                onClick={openLogin}
                className="text-contentsize1 font-medium text-white px-4 py-2"
            >
              로그인
            </button>
        )}

        {/* 로그인 모달 */}
        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </header>
  );
};

export default Topbar;
