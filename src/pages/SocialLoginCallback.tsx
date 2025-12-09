// src/pages/SocialLoginCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialLoginCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 토큰과 이름 가져오기
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const name = params.get('name');
        const message = params.get('message');

        if (message) {
            alert(message); // 원하는 방식으로 UI 처리 가능
            navigate('/'); // 메시지 보여주고 홈으로 이동
            return;
        }

        if (token) {
            // 토큰 로컬스토리지에 저장
            localStorage.setItem('token', token);
        }

        if (name) {
            // 필요하면 사용자 이름도 저장
            localStorage.setItem('username', name);
        }

        // 처리 후 홈 페이지로 이동
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg font-medium">로그인 처리 중...</p>
        </div>
    );
};

export default SocialLoginCallback;
