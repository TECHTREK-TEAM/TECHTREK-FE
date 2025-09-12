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

// 실제 이름, 로고 이미지 매핑
export const companyMap: Record<string, { name: string; mainLogo: string; mainBgColor: string; subLogo: string}> = {
    SAMSUNG: {
        name: "삼성전자",
        mainLogo: Samsung1,
        mainBgColor: 'bg-[#0E4194]',
        subLogo: Samsung2
    },
    NAVER: {
        name: "네이버",
        mainLogo: Naver1,
        mainBgColor: 'bg-[#1EC960]',
        subLogo: Naver2
    },
    KAKAO: {
        name: "카카오",
        mainLogo: Kakao1,
        mainBgColor: 'bg-[#FFDC00]',
        subLogo: Kakao2
    },
    NEXON: {
        name: "넥슨",
        mainLogo: Nexon1,
        mainBgColor: 'bg-[#F6F6F6]',
        subLogo: Nexon2
    },
    COUPANG: {
        name: "쿠팡",
        mainLogo: Coupang1,
        mainBgColor: 'bg-[#F6F6F6]',
        subLogo: Coupang2
    },
    TOSS: {
        name: "토스",
        mainLogo: Toss1,
        mainBgColor: 'bg-[#0050FF]',
        subLogo: Toss2
    },
    DANGGEUN_MARKET: {
        name: "당근마켓",
        mainLogo: DanggeunMarket1,
        mainBgColor: 'bg-[#FB6614]',
        subLogo: DanggeunMarket2
    },
    BAEMIN: {
        name: "배달의민족",
        mainLogo: Baemin1,
        mainBgColor: 'bg-[#00C4BD]',
        subLogo: Baemin2
    }
};
