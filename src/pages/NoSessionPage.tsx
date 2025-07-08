const NoSessionPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800">
        아직 등록된 면접 세션이 없습니다.
      </h1>
      <p className="text-md text-gray-500">
        면접을 진행한 후, 분석 결과를 확인해보세요!
      </p>
    </div>
  );
};

export default NoSessionPage;
