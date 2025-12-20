// src/components/LoginModal.tsx
import deviconGoogle from '../../assets/icons/deviconGoogle.svg';
import deviconNaver from '../../assets/icons/deviconNaver.svg';
import deviconKakao from '../../assets/icons/deviconKakao.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  if (!isOpen) return null;

  // 소셜 로그인 처리 함수
  const handleLogin = (provider: "kakao" | "google" | "naver") => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || ''
    window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl w-[616px] h-[488px] p-6 shadow-xl relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={closeIcon} alt="닫기 아이콘" className="w-6 h-6" />
        </button>

        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[410px] h-[310px] flex flex-col">
            <div className="w-full h-20 flex flex-col items-start gap-2 border-b border-dashed border-gray-300">
              <p className="text-logosize text-left font-bold text-primary">
                회원가입하기
              </p>
              <p className="text-contentsize1 text-left font-medium text-customgray">
                TECHTREK은 소셜 로그인을 통해 가입하실 수 있습니다.
              </p>
            </div>

            {/* 버튼 div */}
            <div className="w-full h-fit mt-12 flex flex-col gap-2">
              {/* 네이버 */}
              <button
                  onClick={() => handleLogin("naver")}
                  className="w-full h-[56px] bg-[#02C95A] text-contentsize1 text-white font-medium rounded-[10px] relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <img src={deviconNaver} alt="네이버 아이콘" />
                </div>
                <span className="flex justify-center items-center h-full">
                  네이버 아이디로 로그인
                </span>
              </button>

              {/* 카카오 */}
              <button
                  onClick={() => handleLogin("kakao")}
                  className="w-full h-[56px] bg-[#FDE501] text-contentsize1 text-primary font-medium rounded-[10px] relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <img src={deviconKakao} alt="카카오 아이콘" />
                </div>
                <span className="flex justify-center items-center h-full">
                  카카오 아이디로 로그인
                </span>
              </button>

              {/* 구글 */}
              <button
                  onClick={() => handleLogin("google")}
                  className="w-full h-[56px] border border-gray-300 text-contentsize1 text-customgray font-medium rounded-[10px] relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <img src={deviconGoogle} alt="구글 아이콘" />
                </div>
                <span className="flex justify-center items-center h-full">
                  구글 아이디로 로그인
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
