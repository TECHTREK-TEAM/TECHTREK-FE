// src/api/api.ts
import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
});

// 요청 인터셉터 (선택 사항: 토큰 자동 갱신 등)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터 (선택 사항: 에러 처리 등)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 예: 401 Unauthorized 처리
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/'; // 홈으로 이동
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
