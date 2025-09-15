import Naver1 from '../assets/images/enterprise/naver1.png';
import Kakao1 from '../assets/images/enterprise/kakao1.png';
import Baemin1 from '../assets/images/enterprise/baemin1.png';
import Nexon1 from '../assets/images/enterprise/nexon1.png';
import Samsung1 from '../assets/images/enterprise/samsung1.png';
import Coupang1 from '../assets/images/enterprise/coupang1.png';
import Toss1 from '../assets/images/enterprise/toss1.png';
import DanggeunMarket1 from '../assets/images/enterprise/danggeunMarket1.png';
import Naver2 from '../assets/images/enterprise/naver2.png';
import Kakao2 from '../assets/images/enterprise/kakao2.png';
import Baemin2 from '../assets/images/enterprise/baemin2.png';
import Nexon2 from '../assets/images/enterprise/nexon2.png';
import Samsung2 from '../assets/images/enterprise/samsung2.png';
import Coupang2 from '../assets/images/enterprise/coupang2.png';
import Toss2 from '../assets/images/enterprise/toss2.png';
import DanggeunMarket2 from '../assets/images/enterprise/danggeunMarket2.png';

export interface Company {
    enterprise: string;
    name: string;
    mainLogo: string;
    mainBgColor: string;
    mainWidth: string;
    mainHeight: string;
    subLogo: string;
}

// 배열
export const companyList: Company[] = [
    {
        enterprise: "TOSS",
        name: "토스",
        mainLogo: Toss1,
        mainBgColor: "bg-[#0050FF]",
        mainWidth: "w-[100%]",
        mainHeight: "h-[100%]",
        subLogo: Toss2,
    },
    {
        enterprise: "NAVER",
        name: "네이버",
        mainLogo: Naver1,
        mainBgColor: "bg-[#1EC960]",
        mainWidth: "w-[100%]",
        mainHeight: "h-[100%]",
        subLogo: Naver2,
    },
    {
        enterprise: "DANGGEUN_MARKET",
        name: "당근마켓",
        mainLogo: DanggeunMarket1,
        mainBgColor: "bg-[#FB6614]",
        mainWidth: "w-[80%]",
        mainHeight: "h-[80%]",
        subLogo: DanggeunMarket2,
    },
    {
        enterprise: "SAMSUNG",
        name: "삼성전자",
        mainLogo: Samsung1,
        mainBgColor: "bg-[#0E4194]",
        mainWidth: "w-[80%]",
        mainHeight: "h-[80%]",
        subLogo: Samsung2,
    },
    {
        enterprise: "BAEMIN",
        name: "배달의민족",
        mainLogo: Baemin1,
        mainBgColor: "bg-[#00C4BD]",
        mainWidth: "w-[80%]",
        mainHeight: "h-[80%]",
        subLogo: Baemin2,
    },
    {
        enterprise: "NEXON",
        name: "넥슨",
        mainLogo: Nexon1,
        mainBgColor: "bg-[#F6F6F6]",
        mainWidth: "w-[100%]",
        mainHeight: "h-[100%]",
        subLogo: Nexon2,
    },
    {
        enterprise: "KAKAO",
        name: "카카오",
        mainLogo: Kakao1,
        mainBgColor: "bg-[#FFDC00]",
        mainWidth: "w-[80%]",
        mainHeight: "h-[80%]",
        subLogo: Kakao2,
    },
    {
        enterprise: "COUPANG",
        name: "쿠팡",
        mainLogo: Coupang1,
        mainBgColor: "bg-[#F6F6F6]",
        mainWidth: "w-[80%]",
        mainHeight: "h-[80%]",
        subLogo: Coupang2,
    },
];

// 객체
export const companyMap = companyList.reduce(
    (acc, company) => {
        acc[company.enterprise] = company; // enterprise 값이 key가 됨
        return acc;
    },
    {} as Record<string, Company> // 초기값은 빈 객체 {}
);
