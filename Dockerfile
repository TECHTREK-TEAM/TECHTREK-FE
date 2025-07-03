# 1) 빌드 단계
FROM node:22-slim AS builder

WORKDIR /app

# 의존성 복사 및 설치
COPY package*.json ./
COPY pnpm-lock.yaml* ./
RUN npm install

# 소스 복사
COPY . .

# 빌드
RUN npm run build

# 2) 배포 단계 (nginx)
FROM nginx:stable

# 빌드 결과물을 nginx html 경로로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 기본 nginx 설정 복사 (필요시 수정 가능)
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
