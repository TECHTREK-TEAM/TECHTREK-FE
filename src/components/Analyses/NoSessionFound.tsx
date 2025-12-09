import notificationIcon from '../../assets/images/notificationIcon.png';
import notificationIcon02 from '../../assets/images/notificationIcon-02.png';

// 배치 아이콘 생성
const generateStaggeredIcons = (rows: number, cols: number) => {
  const icons = [];
  const cellHeight = 100 / rows;
  const cellWidth = 100 / cols;

  let index = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let left = col * cellWidth + cellWidth / 2;

      // 홀수 행이면 좌우 위치를 셀 너비의 절반만큼 오른쪽으로 이동
      if (row % 2 === 1) {
        left += cellWidth / 2;
        // 만약 100%를 넘으면 왼쪽으로 감싸기(모바일 등 고려)
        if (left > 100) left -= 100;
      }

      const top = row * cellHeight + cellHeight / 2;

      icons.push(
        <img
          key={index++}
          src={notificationIcon}
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            width: '100px',
            opacity: 0.5,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          alt=""
        />
      );
    }
  }

  return icons;
};

const NoSessionFound = () => {
  const backgroundIcons = generateStaggeredIcons(6, 8);

  return (
    <div className="relative flex-1 h-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgroundIcons}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-10">
        <img
          src={notificationIcon02}
          className="w-72 h-auto select-none"
          alt="notification"
        />
        <div className="w-fit h-fit flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            아직 등록된 면접 세션이 없습니다.
          </h1>
          <p className="text-md text-gray-500">
            면접을 진행한 후, 분석 결과를 확인해보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoSessionFound;
