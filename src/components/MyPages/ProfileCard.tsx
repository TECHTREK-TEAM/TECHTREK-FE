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

const jobGroups = [
  '프론트엔드',
  '백엔드',
  '데이터베이스',
  '머신러닝',
  'DevOps',
];
const seniorityLevels = [
  '지망생',
  '주니어 (1~3년)',
  '미들 (3~5년)',
  '시니어 (5~8년)',
  '전문가 (8년 이상)',
];

const stackIconMap: Record<string, string> = {
  react: reactIcon,
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
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSeniorityModal, setShowSeniorityModal] = useState(false);

  const groupModalRef = useRef<HTMLDivElement>(null);
  const seniorityModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        groupModalRef.current &&
        !groupModalRef.current.contains(e.target as Node)
      ) {
        setShowGroupModal(false);
      }
      if (
        seniorityModalRef.current &&
        !seniorityModalRef.current.contains(e.target as Node)
      ) {
        setShowSeniorityModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white w-full max-w-[328px] min-h-[276px] h-fit flex flex-col rounded-xl relative">
      <div className="w-full h-fit pl-10 pr-5 flex justify-between items-center border-b border-[#e9e9e9] py-7">
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
        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9] relative">
          <img src={groupIcon} className="w-6 h-6 select-none" />
          {isEditing ? (
            <button
              onClick={() => setShowGroupModal((prev) => !prev)}
              className="text-left text-[15px] border border-gray-300 rounded-md px-2 py-1 w-full"
            >
              {group}
            </button>
          ) : (
            <p className="font-regular text-[15px]">{group}</p>
          )}

          {showGroupModal && (
            <div
              ref={groupModalRef}
              className="absolute top-[45px] left-[30px] z-20 bg-white border border-gray-300 rounded-md shadow-md p-2 w-[150px] flex flex-col gap-1"
            >
              {jobGroups.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setGroup(item);
                    setShowGroupModal(false);
                  }}
                  className="hover:bg-gray-100 px-2 py-1 text-sm text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-[10px] py-3 flex gap-[18px] items-center border-b border-[#e9e9e9] relative">
          <img src={seniorityIcon} className="w-[22px] h-[23px] select-none" />
          {isEditing ? (
            <button
              onClick={() => setShowSeniorityModal((prev) => !prev)}
              className="text-left text-[15px] border border-gray-300 rounded-md px-2 py-1 w-full"
            >
              {seniority}
            </button>
          ) : (
            <p className="font-regular text-[15px]">{seniority}</p>
          )}

          {showSeniorityModal && (
            <div
              ref={seniorityModalRef}
              className="absolute top-[45px] left-[30px] z-20 bg-white border border-gray-300 rounded-md shadow-md p-2 w-[180px] flex flex-col gap-1"
            >
              {seniorityLevels.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSeniority(item);
                    setShowSeniorityModal(false);
                  }}
                  className="hover:bg-gray-100 px-2 py-1 text-sm text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="py-7 w-full h-full flex justify-center gap-5 flex-wrap relative">
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
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
