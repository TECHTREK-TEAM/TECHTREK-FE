// src/components/Topbar.tsx
import { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const menuItems = [
  { label: '홈', path: '/' },
  { label: '내 정보', path: '/interview' },
  { label: '면접 분석', path: '/analysis' },
];

const Topbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isScrolledPast, setIsScrolledPast] = useState(false);

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

  let bgClass;

  if (!isHome) {
    bgClass = 'bg-primary';
  } else if (isScrolledPast) {
    bgClass = 'bg-primary';
  } else {
    bgClass = 'bg-transparent';
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full min-h-[80px] ${bgClass} transition-colors duration-300 flex items-center justify-between px-8`}
    >
      <div className="flex items-center justify-between w-1/3 min-w-[450px] gap-13">
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
        </nav>
      </div>
      <button className="text-contentsize1 font-medium text-white px-4 py-2">
        로그인
      </button>
    </header>
  );
};

export default Topbar;
