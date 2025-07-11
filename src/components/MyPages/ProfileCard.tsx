import { useState, useRef, useEffect } from 'react';
import editIcon from '../../assets/icons/editIcon.svg';
import groupIcon from '../../assets/icons/groupIcon.svg';
import seniorityIcon from '../../assets/icons/seniorityIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
import reactIcon from '../../assets/stacks/reactIcon.svg';

interface Stack {
  stackName: string;
}

interface ProfileCardProps {
  name: string;
  group: string;
  seniority: string;
  stacks?: Stack[];
}

const imageOptions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `이미지${i + 1}`,
}));

// 현재는 reactIcon만 있음, 차후 추가 예정
const stackIconMap: Record<string, string> = {
  react: reactIcon,
  // vue: vueIcon,
  // angular: angularIcon,
  // 기타 추가 예정
};

const ProfileCard = ({
  name: initialName,
  group: initialGroup,
  seniority: initialSeniority,
  stacks = [],
}: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [group, setGroup] = useState(initialGroup);
  const [seniority, setSeniority] = useState(initialSeniority);
  const [images, setImages] = useState<number[]>([1, 2]);
  const [showImageModal, setShowImageModal] = useState(false);

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddImageById = (id: number) => {
    if (!images.includes(id) && images.length < 4) {
      setImages((prev) => [...prev, id]);
      setShowImageModal(false);
    }
  };

  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((imgId) => imgId !== id));
  };

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
      <div
        className={`w-full h-fit pl-10 pr-5 flex justify-between items-center border-b border-[#e9e9e9] ${
          isEditing ? 'py-5' : 'py-7'
        }`}
      >
        {isEditing ? (
          <input
            className="font-medium text-contentsize2 border border-gray-300 rounded-md px-2 py-1 w-1/2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="font-medium text-contentsize2">{name}</p>
        )}

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

      <div className="w-full h-fit px-8">
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

        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9]">
          <img src={seniorityIcon} className="w-[22px] h-[23px] select-none" />
          {isEditing ? (
            <input
              className="font-regular text-[15px] border border-gray-300 rounded-md px-2 py-1 w-full"
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
            />
          ) : (
            <p className="font-regular text-[15px]">{seniority}</p>
          )}
        </div>

        <div className="py-7 w-full h-full flex justify-center gap-5 flex-wrap relative">
          {!isEditing && (
            <div className="flex gap-2 justify-center">
              {stacks.map((stack) => {
                const key = stack.stackName.toLowerCase();
                const imgSrc = stackIconMap[key];

                if (imgSrc) {
                  return (
                    <img
                      key={stack.stackName}
                      src={imgSrc}
                      alt={stack.stackName}
                      className="select-none"
                    />
                  );
                }

                return (
                  <div
                    key={stack.stackName}
                    className="w-6 h-6 bg-gray-300 rounded-md flex items-center justify-center text-white text-xs"
                  >
                    {stack.stackName[0]?.toUpperCase()}
                  </div>
                );
              })}
            </div>
          )}

          {isEditing && images.length < 4 && (
            <div className="relative">
              <button
                ref={addButtonRef}
                onClick={() => setShowImageModal((prev) => !prev)}
                className="w-[35px] h-[35px] rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xl font-bold"
              >
                +
              </button>

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
