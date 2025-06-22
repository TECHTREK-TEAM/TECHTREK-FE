import { useState } from 'react';
import editIcon from '../../assets/icons/editIcon.svg';
import groupIcon from '../../assets/icons/groupIcon.svg';
import seniorityIcon from '../../assets/icons/seniorityIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
import saveIcon from '../../assets/icons/saveIcon.svg';

// 외부에서 전달받을 사용자 프로필 정보
interface ProfileCardProps {
  name: string;
  group: string;
  seniority: number;
}

const ProfileCard = ({
  name: initialName,
  group: initialGroup,
  seniority: initialSeniority,
}: ProfileCardProps) => {
  // 수정 모드 여부
  const [isEditing, setIsEditing] = useState(false);

  // 이름, 직군, 연차 상태 (초기값은 props로부터 설정)
  const [name, setName] = useState(initialName);
  const [group, setGroup] = useState(initialGroup);
  const [seniority, setSeniority] = useState(initialSeniority.toString());

  // 임시 이미지 리스트 (각 이미지에 고유 ID 부여)
  const [images, setImages] = useState<number[]>([1, 2]);

  // 이미지 추가 핸들러
  const handleAddImage = () => {
    if (images.length < 4) {
      setImages((prev) => [...prev, Date.now()]);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((imgId) => imgId !== id));
  };

  return (
    <div className="bg-white w-full max-w-[328px] max-h-[276px] h-full flex flex-col rounded-xl">
      {/* 상단 이름 및 수정 버튼 */}
      <div
        className={`w-full h-fit pl-10 pr-5 flex justify-between items-center border-b border-[#e9e9e9] ${
          isEditing ? 'py-5' : 'py-7'
        }`}
      >
        {/* 수정 중이면 인풋, 아니면 텍스트 */}
        {isEditing ? (
          <input
            className="font-medium text-contentsize2 border border-gray-300 rounded-md px-2 py-1 w-1/2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="font-medium text-contentsize2">{name}</p>
        )}

        {/* 수정 모드 토글 버튼 */}
        <button
          className="w-fit h-fit"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <img
            src={isEditing ? saveIcon : editIcon}
            className="select-none w-6 h-6"
            alt={isEditing ? 'save' : 'edit'} // 접근성 향상
          />
        </button>
      </div>

      {/* 하단 내용 영역 */}
      <div className="w-full h-fit px-8">
        {/* 직군 */}
        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9]">
          <img src={groupIcon} className="w-6 h-6 select-none" />
          {isEditing ? (
            <input
              className="font-regular text-[15px] border border-gray-300 rounded-md px-2 py-1 w-full"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          ) : (
            <p className="font-regular text-[15px]">{group}</p>
          )}
        </div>

        {/* 연차 */}
        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9]">
          <img src={seniorityIcon} className="w-[22px] h-[23px] select-none" />
          {isEditing ? (
            <input
              type="number"
              className="font-regular text-[15px] border border-gray-300 rounded-md px-2 py-1 w-full"
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
            />
          ) : (
            <p className="font-regular text-[15px]">{seniority} 년차</p>
          )}
        </div>

        {/* 이미지 영역 */}
        <div className="py-7 w-full h-fit flex justify-center gap-5 flex-wrap">
          {images.map((id) => (
            <div key={id} className="relative">
              {/* 임시 이미지 블록 */}
              <div className="w-[35px] h-[35px] bg-gray-300 rounded-lg" />

              {/* 수정 모드일 때만 삭제 버튼 노출 */}
              {isEditing && (
                <button
                  className="absolute -top-2 -right-2 bg-white rounded-full border border-gray-400 w-5 h-5 flex items-center justify-center"
                  onClick={() => handleRemoveImage(id)}
                >
                  <img src={closeIcon} className="w-3 h-3" alt="delete" />
                </button>
              )}
            </div>
          ))}

          {/* 수정 모드일 때만 추가 버튼 노출 */}
          {isEditing && images.length < 4 && (
            <button
              onClick={handleAddImage}
              className="w-[35px] h-[35px] rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xl font-bold"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
