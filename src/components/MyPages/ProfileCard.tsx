import { useState, useRef, useEffect } from 'react';
import editIcon from '../../assets/icons/editIcon.svg';
import groupIcon from '../../assets/icons/groupIcon.svg';
import seniorityIcon from '../../assets/icons/seniorityIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';

// 외부에서 받아올 사용자 기본 프로필 정보 타입 정의
interface ProfileCardProps {
  name: string;
  group: string;
  seniority: number;
}

// 테스트용 이미지 옵션 목록 (이름과 고유 id 부여)
const imageOptions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `이미지${i + 1}`,
}));

const ProfileCard = ({
  name: initialName,
  group: initialGroup,
  seniority: initialSeniority,
}: ProfileCardProps) => {
  // 수정 모드 여부 상태
  const [isEditing, setIsEditing] = useState(false);

  // 사용자 입력 상태 (이름, 직군, 연차)
  const [name, setName] = useState(initialName);
  const [group, setGroup] = useState(initialGroup);
  const [seniority, setSeniority] = useState(initialSeniority.toString());

  // 현재 선택된 이미지 목록 (id 기반)
  const [images, setImages] = useState<number[]>([1, 2]);

  // 이미지 선택 모달의 표시 여부
  const [showImageModal, setShowImageModal] = useState(false);

  // 모달 외부 클릭 감지를 위한 버튼과 모달 DOM 참조
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 이미지 아이템 클릭 시 이미지 추가
  const handleAddImageById = (id: number) => {
    if (!images.includes(id) && images.length < 4) {
      setImages((prev) => [...prev, id]);
      setShowImageModal(false); // 이미지 추가 후 모달 닫기
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((imgId) => imgId !== id));
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showImageModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !addButtonRef.current?.contains(e.target as Node)
      ) {
        setShowImageModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showImageModal]);

  return (
    <div className="bg-white w-full max-w-[328px] max-h-[276px] h-full flex flex-col rounded-xl relative">
      {/* 상단 영역 - 이름 표시 및 수정 버튼 */}
      <div
        className={`w-full h-fit pl-10 pr-5 flex justify-between items-center border-b border-[#e9e9e9] ${
          isEditing ? 'py-5' : 'py-7'
        }`}
      >
        {/* 이름 입력 필드 (수정 모드일 때만 활성화) */}
        {isEditing ? (
          <input
            className="font-medium text-contentsize2 border border-gray-300 rounded-md px-2 py-1 w-1/2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="font-medium text-contentsize2">{name}</p>
        )}

        {/* 수정/저장 버튼 토글 */}
        <button
          className="w-fit h-fit text-[15px] font-medium text-primary"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <span className="text-blue-500">save</span>
          ) : (
            <img src={editIcon} className="select-none w-6 h-6" alt="edit" />
          )}
        </button>
      </div>

      {/* 본문 영역 */}
      <div className="w-full h-fit px-8">
        {/* 직군 정보 */}
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

        {/* 연차 정보 */}
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

        {/* 이미지 리스트 + 이미지 추가 버튼 */}
        <div className="py-7 w-full h-fit flex justify-center gap-5 flex-wrap relative">
          {/* 선택된 이미지 리스트 */}
          {images.map((id) => (
            <div key={id} className="relative">
              {/* 임시 회색 이미지 */}
              <div className="w-[35px] h-[35px] bg-gray-300 rounded-lg flex items-center justify-center text-xs text-white">
                {id}
              </div>
              {/* 삭제 버튼 (수정 모드에서만 노출) */}
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

          {/* 이미지 추가 버튼 + 모달 */}
          {isEditing && images.length < 4 && (
            <div className="relative">
              {/* 추가 버튼 */}
              <button
                ref={addButtonRef}
                onClick={() => setShowImageModal((prev) => !prev)}
                className="w-[35px] h-[35px] rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xl font-bold"
              >
                +
              </button>

              {/* 모달: 이미지 선택 목록 */}
              {showImageModal && (
                <div
                  ref={modalRef}
                  className="absolute top-[40px] left-0 w-[100px] h-[180px] bg-white shadow-lg rounded-md border border-gray-300 z-10 p-2 overflow-y-auto flex flex-col gap-1"
                >
                  {imageOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAddImageById(option.id)}
                      className="w-full h-[30px] flex items-center text-contentsize1 hover:bg-gray-100 rounded-md text-left px-2 py-2"
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
