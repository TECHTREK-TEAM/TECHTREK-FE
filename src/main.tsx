import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 추가: React Query 관련 import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 전체 앱을 QueryClientProvider로 감싸기 */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
