import type { FC } from 'react';
import type { Company } from '../../constants/companyMap';
import { companyList } from '../../constants/companyMap';

interface LeftNavbarProps {
  selectedTab: string; // 현재 선택된 기업 탭
  onSelectTab: (enterprise: string) => void; // 탭 클릭 시 호출
}

// 왼쪽 사이드 바
const LeftNavbar: FC<LeftNavbarProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="w-64 h-screen border-r border-[#E5E5EC] py-4">
      <ul className="flex flex-col items-center mx-5">
        {companyList.map((company: Company) => {
          const isSelected = selectedTab === company.enterprise; // 선택된 탭 확인
          return (
            <li
              key={company.enterprise}
              onClick={() => onSelectTab(company.name)} // 클릭 시 부모에 전달
              className={`cursor-pointer w-full px-3 py-[17px] text-contentsize1 rounded-lg text-left transition-all flex items-center gap-3
                ${
                  isSelected
                    ? 'bg-[#EBE9FB] text-brandcolor font-semibold shadow-[inset_1px_1px_2px_rgba(17,0,116,0.15),inset_-1px_-1px_1px_white]'
                    : 'text-[#505050] font-medium'
                }
              `}
            >
              <img
                src={isSelected ? company.tapIconSelected : company.tapIcon}
                alt={`${company.name} Icon`}
                className="w-5 h-5"
              />
              {company.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftNavbar;
