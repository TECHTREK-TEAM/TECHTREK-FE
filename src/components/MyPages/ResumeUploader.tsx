import { useRef, useState } from 'react';
import axios, {type AxiosError} from 'axios';
import resumeUploadIcon from '../../assets/icons/resumeUploadIcon.svg';

interface UploadResponseData {
  group: string;
  seniority: string;
  resume: string;
  stacks: { stackName: string }[];
}

const ResumeUploader = ({
  onUploadSuccess,
}: {
  onUploadSuccess?: (data: UploadResponseData | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, setUploadedResumeUrl] = useState<string | null>(
    null
  );
  const [displayFileName, setDisplayFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadResume = async (file: File): Promise<UploadResponseData> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
          'http://localhost:8080/api/users/resume',
          formData,
          {
            headers: {'Content-Type': 'multipart/form-data'},
          }
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error('이력서 업로드 실패:', err);

      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw new Error('업로드 실패');
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('PDF 파일만 첨부 가능합니다.');
      setDisplayFileName(null);
      setUploadedResumeUrl(null);
      onUploadSuccess?.(null);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const data = await uploadResume(file);
      setUploadedResumeUrl(data.resume ?? null);
      setDisplayFileName(file.name);
      onUploadSuccess?.(data);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || '업로드 중 오류가 발생했습니다.');
      setDisplayFileName(null);
      setUploadedResumeUrl(null);
      onUploadSuccess?.(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (isUploading) return; // 업로드 중엔 클릭 무시
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setDisplayFileName(null);
    setUploadedResumeUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onUploadSuccess?.(null); // 부모에도 초기화 알려주기
  };

  return (
    <div className="w-full h-full flex-1 max-w-[33.333%] flex flex-col gap-5 p-6 rounded-xl bg-white">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {/* 업로드 영역 */}
      <div
        className={`w-full h-[155px] p-4 flex justify-center items-center border border-dashed rounded-xl cursor-pointer ${
          error ? 'border-red-500' : 'border-[#A6A6A6]'
        }`}
        onClick={handleUploadClick}
      >
        {isUploading ? (
          <p className="text-customgray text-[14px]">업로드 중...</p>
        ) : !displayFileName ? (
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
              {displayFileName}
            </p>

            {/* 삭제 버튼 */}
            <button
              className="text-[12px] text-red-500 hover:underline"
              onClick={(e) => {
                e.stopPropagation(); // 업로드 클릭 막기
                handleRemoveFile();
              }}
              disabled={isUploading}
            >
              재업로드하기
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-fit flex flex-col gap-3">
        {/* 업로드됨 라벨 */}
        {displayFileName && !isUploading && (
          <p
            className="px-2 py-1 font-medium text-[12px] rounded-full w-fit h-fit text-[#007FBE]"
            style={{ backgroundColor: '#E6F0FB' }}
          >
            업로드됨
          </p>
        )}

        {/* 파일명 설명 텍스트 */}
        {displayFileName && !isUploading && (
          <div className="w-full flex flex-col gap-1 text-left">
            <p className="text-customgray font-medium text-contentsize1">
              업로드한 이력서
              <br />
              <span className="text-primary break-words">
                {displayFileName}
              </span>
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
