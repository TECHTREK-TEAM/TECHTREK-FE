// export const mockSessions = [
//   {
//     sessionInfoId: '1',
//     enterpriseName: '넥슨',
//     createdAt: '2025-04-12',
//     analysis: {
//       status: false,
//       followScore: 58,
//       followAveragePercent: -0.2,
//       resultScore: 64.3,
//       duration: 7,
//       durationAveragePercent: 8.5,
//       TopScore: 68.0,
//     },
//     interview: [
//       {
//         question: '게임 서버 개발 경험이 있나요?',
//         answer: '개인 프로젝트에서 유사한 경험이 있습니다.',
//         questionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '성실성',
//       questionNumber: '1',
//       result: '답변 내용이 구체적이지 않음',
//     },
//   },
//   {
//     sessionInfoId: '2',
//     enterpriseName: '삼성전자',
//     createdAt: '2025-03-22',
//     analysis: {
//       status: true,
//       followScore: 88,
//       followAveragePercent: 0.15,
//       resultScore: 82.1,
//       duration: 5,
//       durationAveragePercent: -3.0,
//       TopScore: 21.0,
//     },
//     interview: [
//       {
//         question: '팀 프로젝트에서의 역할은 무엇이었나요?',
//         answer: '기획과 백엔드 개발을 맡았습니다.',
//         questionNumber: '1',
//       },
//       {
//         question: '어떤 문제를 해결했나요?',
//         answer: 'DB 성능 문제를 튜닝했습니다.',
//         questionNumber: '1',
//         tailQuestionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '문제해결력',
//       questionNumber: '1-1',
//       result: '구체적인 예시가 좋음',
//     },
//   },
//   {
//     sessionInfoId: '3',
//     enterpriseName: '당근마켓',
//     createdAt: '2025-02-01',
//     analysis: {
//       status: false,
//       followScore: 72,
//       followAveragePercent: -0.1,
//       resultScore: 69.5,
//       duration: 6,
//       durationAveragePercent: 2.0,
//       TopScore: 56.0,
//     },
//     interview: [
//       {
//         question: '로컬 커뮤니티 기능을 어떻게 강화할 수 있을까요?',
//         answer: '지도 기반 추천 기능을 제안합니다.',
//         questionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '창의성',
//       questionNumber: '1',
//       result: '아이디어는 좋으나 구체성이 부족함',
//     },
//   },
//   {
//     sessionInfoId: '4',
//     enterpriseName: '토스',
//     createdAt: '2025-06-15',
//     analysis: {
//       status: true,
//       followScore: 96,
//       followAveragePercent: 0.4,
//       resultScore: 91.2,
//       duration: 4,
//       durationAveragePercent: 6.0,
//       TopScore: 7.0,
//     },
//     interview: [
//       {
//         question: '금융 데이터 보호를 위한 전략은?',
//         answer: '암호화 및 접근 제어를 적용합니다.',
//         questionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '보안지식',
//       questionNumber: '1',
//       result: '핵심 개념을 잘 짚음',
//     },
//   },
//   {
//     sessionInfoId: '5',
//     enterpriseName: '쿠팡',
//     createdAt: '2025-01-05',
//     analysis: {
//       status: false,
//       followScore: 41,
//       followAveragePercent: -0.35,
//       resultScore: 59.0,
//       duration: 9,
//       durationAveragePercent: -6.0,
//       TopScore: 78.0,
//     },
//     interview: [
//       {
//         question: '물류 시스템 최적화 경험이 있나요?',
//         answer: '아직은 없습니다.',
//         questionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '경험 부족',
//       questionNumber: '1',
//       result: '관련 경험이 부족함',
//     },
//   },
//   {
//     sessionInfoId: '6',
//     enterpriseName: '네이버',
//     createdAt: '2025-05-19',
//     analysis: {
//       status: true,
//       followScore: 92,
//       followAveragePercent: 0.3,
//       resultScore: 85.6,
//       duration: 3,
//       durationAveragePercent: 11.0,
//       TopScore: 32.0,
//     },
//     interview: [
//       {
//         question: '자기소개 해주세요.',
//         answer: '저는 백엔드 개발자 지망생으로...',
//         questionNumber: '1',
//       },
//       {
//         question: '자기소개 해주세요.',
//         answer: '저는 백엔드 개발자 지망생으로...',
//         questionNumber: '1',
//         tailQuestionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '도전정신',
//       questionNumber: '1-2',
//       result: '기술 스택에 대한 이해도가 높음',
//     },
//   },
//   {
//     sessionInfoId: '7',
//     enterpriseName: '카카오',
//     createdAt: '2025-06-01',
//     analysis: {
//       status: true,
//       followScore: 79,
//       followAveragePercent: -0.1,
//       resultScore: 72.3,
//       duration: 6,
//       durationAveragePercent: -4.2,
//       TopScore: 45.0,
//     },
//     interview: [
//       {
//         question: 'REST API와 GraphQL의 차이점을 설명해주세요.',
//         answer:
//           'REST는 정해진 엔드포인트로 자원을 다루며, GraphQL은 필요한 데이터만 요청할 수 있습니다.',
//         questionNumber: '1',
//       },
//       {
//         question: 'GraphQL의 장점은 무엇인가요?',
//         answer:
//           '과도한 데이터 요청을 줄이고 클라이언트의 데이터 요구에 유연하게 대응할 수 있습니다.',
//         questionNumber: '1',
//         tailQuestionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '효율성',
//       questionNumber: '1-1',
//       result: '기술 선택의 이유를 잘 설명함',
//     },
//   },
//   {
//     sessionInfoId: '8',
//     enterpriseName: '배달의 민족',
//     createdAt: '2025-07-01',
//     analysis: {
//       status: false,
//       followScore: 67,
//       followAveragePercent: -0.05,
//       resultScore: 76.4,
//       duration: 5,
//       durationAveragePercent: 0.0,
//       TopScore: 60.0,
//     },
//     interview: [
//       {
//         question: '배달 시스템의 병목 해결 방안은?',
//         answer: '큐 시스템을 도입해 처리 순서를 보장합니다.',
//         questionNumber: '1',
//       },
//     ],
//     feedback: {
//       keyword: '시스템 설계',
//       questionNumber: '1',
//       result: '기본적인 접근은 이해했으나 심화 설명이 부족',
//     },
//   },
// ];
