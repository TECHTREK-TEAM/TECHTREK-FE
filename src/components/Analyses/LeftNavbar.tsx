import type { FC } from 'react';

import tossTabIcon from '../../assets/icons/tossTabIcon.svg';
import tossTabIconSelected from '../../assets/icons/tossTabIconSelected.svg';
import naverTabIcon from '../../assets/icons/naverTabIcon.svg';
import naverTabIconSelected from '../../assets/icons/naverTabIconSelected.svg';
import DMTabIcon from '../../assets/icons/DMTabIcon.svg';
import DMTabIconSelected from '../../assets/icons/DMTabIconSelected.svg';
import samsungTabIcon from '../../assets/icons/samsungTabIcon.svg';
import samsungTabIconSelected from '../../assets/icons/samsungTabIconSelected.svg';
import PoBTabIcon from '../../assets/icons/PoBTabIcon.svg';
import PoBTabIconSelected from '../../assets/icons/PoBTabIconSelected.svg';
import nexonTabIcon from '../../assets/icons/nexonTabIcon.svg';
import nexonTabIconSelected from '../../assets/icons/nexonTabIconSelected.svg';
import kakaoTabIcon from '../../assets/icons/kakaoTabIcon.svg';
import kakaoTabIconSelected from '../../assets/icons/kakaoTabIconSelected.svg';
import coupangTabIcon from '../../assets/icons/coupangTabIcon.svg';
import coupangTabIconSelected from '../../assets/icons/coupangTabIconSelected.svg';

// 탭 항목 정의
const tabItems = [
  { label: '토스', icon: tossTabIcon, selectedIcon: tossTabIconSelected },
  { label: '네이버', icon: naverTabIcon, selectedIcon: naverTabIconSelected },
  { label: '당근마켓', icon: DMTabIcon, selectedIcon: DMTabIconSelected },
  {
    label: '삼성전자',
    icon: samsungTabIcon,
    selectedIcon: samsungTabIconSelected,
  },
  { label: '배달의 민족', icon: PoBTabIcon, selectedIcon: PoBTabIconSelected },
  { label: '넥슨', icon: nexonTabIcon, selectedIcon: nexonTabIconSelected },
  { label: '카카오', icon: kakaoTabIcon, selectedIcon: kakaoTabIconSelected },
  { label: '쿠팡', icon: coupangTabIcon, selectedIcon: coupangTabIconSelected },
];

interface LeftNavbarProps {
  selectedTab: string;
  onSelectTab: (label: string) => void;
}

const LeftNavbar: FC<LeftNavbarProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="w-64 h-screen border-r border-[#E5E5EC] py-4">
      <ul className="flex flex-col items-center mx-5">
        {tabItems.map(({ label, icon, selectedIcon }) => {
          const isSelected = selectedTab === label;
          return (
            <li
              key={label}
              onClick={() => onSelectTab(label)}
              className={`cursor-pointer w-full px-3 py-[17px] text-contentsize1 rounded-lg text-left transition-all flex items-center gap-3
                ${
                  isSelected
                    ? 'bg-[#EBE9FB] text-brandcolor font-semibold shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]'
                    : 'text-[#505050] font-medium'
                }
              `}
            >
              <img
                src={isSelected ? selectedIcon : icon}
                alt={`${label} Icon`}
                className="w-5 h-5"
              />
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftNavbar;
