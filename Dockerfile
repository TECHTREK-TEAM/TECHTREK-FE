# 1단계: Build Stage
FROM node:22-slim AS builder

WORKDIR /app

# 의존성 복사 및 설치
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci

# 소스 복사
COPY . .

# 빌드
RUN npm run build


# 2단계: Deploy Stage
FROM nginx:stable

# nginx SPA 라우팅 설정 추가
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물을 nginx html 경로로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
