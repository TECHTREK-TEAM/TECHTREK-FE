// src/api/api.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // HttpOnly 쿠키 전송 허용 (Refresh Token)
});

// 요청 인터셉터: Access Token 자동 포함
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 시 Access Token 재발급
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 && 재시도 전용 플래그가 없을 때
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.post('/auth/refresh', {}, { withCredentials: true });
                const newAccessToken = res.data.data.accessToken;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
