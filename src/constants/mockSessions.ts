export const mockSessions = [
  {
    sessionInfoId: '2',
    enterpriseName: '네이버',
    createdAt: '2025-05-19',
    analysis: {
      status: true,
      followScore: 92,
      followAveragePercent: 0.3,
      resultScore: 85.6,
      duration: 3,
      durationAveragePercent: 11.0,
      TopScore: 32.0,
    },
    interview: [
      {
        question: '자기소개 해주세요.',
        answer: '저는 백엔드 개발자 지망생으로...',
        questionNumber: '1',
      },
      {
        question: '자기소개 해주세요.',
        answer: '저는 백엔드 개발자 지망생으로...',
        questionNumber: '1',
        tailQuestionNumber: '1',
      },
      {
        question: '최근에 진행한 프로젝트에서 맡은 역할은 무엇이었나요?',
        answer: '저는 서버 아키텍처 설계와 API 개발을 담당했습니다.',
        questionNumber: '2',
      },
      {
        question: '어떤 기술 스택을 사용했나요?',
        answer: 'Spring Boot, MySQL, Redis 등을 사용했습니다.',
        questionNumber: '2',
        tailQuestionNumber: '1',
      },
    ],
    feedback: {
      keyword: '도전정신',
      questionNumber: '1-2',
      result: '기술 스택에 대한 이해도가 높음',
    },
  },
  {
    sessionInfoId: '3',
    enterpriseName: '카카오',
    createdAt: '2025-06-01',
    analysis: {
      status: true,
      followScore: 79,
      followAveragePercent: -0.1,
      resultScore: 72.3,
      duration: 6,
      durationAveragePercent: -4.2,
      TopScore: 45.0,
    },
    interview: [
      {
        question: 'REST API와 GraphQL의 차이점을 설명해주세요.',
        answer:
          'REST는 정해진 엔드포인트로 자원을 다루며, GraphQL은 필요한 데이터만 요청할 수 있습니다.',
        questionNumber: '1',
      },
      {
        question: 'GraphQL의 장점은 무엇인가요?',
        answer:
          '과도한 데이터 요청을 줄이고 클라이언트의 데이터 요구에 유연하게 대응할 수 있습니다.',
        questionNumber: '1',
        tailQuestionNumber: '1',
      },
    ],
    feedback: {
      keyword: '효율성',
      questionNumber: '1-1',
      result: '기술 선택의 이유를 잘 설명함',
    },
  },
];
