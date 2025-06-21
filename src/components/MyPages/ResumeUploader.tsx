import { useRef, useState } from 'react';
import resumeUploadIcon from '../../assets/icons/resumeUploadIcon.svg';

const ResumeUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('PDF 파일만 첨부 가능합니다.');
      setFileName(null);
      return;
    }

    setError(null);
    setFileName(file.name);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white w-full max-w-[395px] h-full flex flex-col gap-5 p-6 rounded-xl">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {/* 업로드 영역 */}
      <div
        className="w-full h-[155px] flex justify-center items-center border border-dashed border-[#A6A6A6] rounded-xl cursor-pointer"
        onClick={handleUploadClick}
      >
        {!fileName ? (
          <div className="flex flex-col gap-[10px] items-center pointer-events-none">
            <img
              src={resumeUploadIcon}
              alt="upload"
              className="w-[30px] h-[30px] select-none"
            />
            <p className="font-medium text-customgray text-[12px]">
              이력서를 첨부해주세요
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* 파일명 */}
            <p className="text-[14px] font-medium text-primary break-all text-center">
              {fileName}
            </p>

            {/* 삭제 버튼 */}
            <button
              className="text-[12px] text-red-500 hover:underline"
              onClick={(e) => {
                e.stopPropagation(); // 업로드 클릭 막기
                handleRemoveFile();
              }}
            >
              재업로드하기
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-fit flex flex-col gap-3">
        {/* 업로드됨 라벨 */}
        {fileName && (
          <p
            className="px-2 py-1 font-medium text-[12px] rounded-full w-fit h-fit text-[#007FBE]"
            style={{ backgroundColor: '#E6F0FB' }}
          >
            업로드됨
          </p>
        )}

        {/* 파일명 설명 텍스트 */}
        {fileName && (
          <div className="w-full flex flex-col gap-1 text-left">
            <p className="text-customgray font-medium text-contentsize1">
              업로드한 이력서
              <br />
              <span className="text-primary break-words">{fileName}</span>
            </p>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default ResumeUploader;
