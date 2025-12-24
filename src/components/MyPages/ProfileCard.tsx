import { useState, useRef, useEffect } from 'react';

import editIcon from '../../assets/icons/editIcon.svg';
import groupIcon from '../../assets/icons/groupIcon.svg';
import seniorityIcon from '../../assets/icons/seniorityIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
// import reactIcon from '../../assets/stacks/reactIcon.svg';
import axiosInstance from '../../api';

interface Stack {
  stackName: string;
  stackUrl: string;
}

interface ProfileCardProps {
  name: string;
  position: string;
  seniority: string;
  stacks?: Stack[];
}

// 상수 정의
const jobGroups = ['프론트엔드', '백엔드', '데이터베이스', 'AI', 'DevOps'];
const seniorityLevels = ['지망생', '주니어 (1~3년차)', '미들 (3~5년차)', '시니어 (5~8년차)', '전문가 (8년 이상)',];
const stackList = ['React', 'Vue', 'Angular', 'Spring', 'Django', 'Node.js'];
//
// const stackIconMap: Record<string, string> = {
//   react: reactIcon,
//   // vue: vueIcon 등 추가 가능
// };

// profileCard 함수
const ProfileCard = ({
  name: initialName,
  position: initialPostion,
  seniority: initialSeniority,
  stacks = [],
}: ProfileCardProps) => {
  // 사용자 정보 상태
  const [name, setName] = useState(initialName);
  const [position, setPosition] = useState(initialPostion);
  const [seniority, setSeniority] = useState(initialSeniority);
  const [stackItems, setStackItems] = useState<Stack[]>(stacks);

  // 편집모드 ( 모달 상태 )
  const [isEditing, setIsEditing] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSeniorityModal, setShowSeniorityModal] = useState(false);
  const [showStackModal, setShowStackModal] = useState(false);

  // 모달 외부 클릭 감지용
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 최신 데이터가 바뀔 때 내부 상태도 업데이트되도록 useEffect 추가
  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    setPosition(initialPostion);
  }, [initialPostion]);

  useEffect(() => {
    setSeniority(initialSeniority);
  }, [initialSeniority]);

  useEffect(() => {
    setStackItems(stacks.map((s) => ({ stackName: s.stackName, stackUrl: s.stackUrl })));
  }, [stacks]);

  // 모달 밖을 클릭하면 모든 모달 닫기
  const closeAllModals = () => {
    setShowGroupModal(false);
    setShowSeniorityModal(false);
    setShowStackModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !addButtonRef.current?.contains(e.target as Node)
      ) {
        closeAllModals();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 스택 추가 함수
  const toggleStack = (stack: Stack) => {
    const exists = stackItems.some((s) => s.stackName === stack.stackName);

    if (exists) {
      // 이미 선택되어 있으면 제거
      setStackItems(stackItems.filter((s) => s.stackName !== stack.stackName));
    } else if (stackItems.length < 4) {
      // 최대 4개까지 추가 가능
      setStackItems([...stackItems, stack]);
    }
  };

  // 스택 삭제 함수
  const removeStack = (stackToRemove: Stack) => {
    setStackItems((prevStackItems) =>
        prevStackItems.filter((s) => s.stackName !== stackToRemove.stackName)
    );
  };

  // 사용자 정보 수정
  const handleSave = async () => {
    try {
      await axiosInstance.patch('/api/users/info', {
        name,
        position,
        seniority,
        stacks: stackItems.map((s) => ({
          stackName: s.stackName,
        }))
      });
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 저장에 실패했습니다.');
    }
  };

  return (
    <div className="bg-white w-full max-w-[328px] flex flex-col rounded-xl relative">
      <div className="w-full pl-10 pr-5 flex justify-between items-center border-b border-[#e9e9e9] py-5">
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
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            <span className="text-blue-500">save</span>
          ) : (
            <img src={editIcon} className="select-none w-6 h-6" alt="edit" />
          )}
        </button>
      </div>

      <div className="w-full px-8 pb-6">
        {/* 직군 선택 */}
        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9] relative">
          <img src={groupIcon} className="w-6 h-6 select-none" />
          {isEditing ? (
              <>
                <button
                    className="text-[15px] text-left border border-gray-300 px-2 py-1 rounded-md w-full"
                    onClick={() => setShowGroupModal(true)}
                >
                  {position || '정보가 없습니다'}
                </button>
                {showGroupModal && (
                    <div
                        ref={modalRef}
                        className="absolute top-full mt-2 left-0 w-[140px] bg-white shadow-md border rounded-md z-10"
                    >
                      {jobGroups.map((group) => (
                          <div
                              key={group}
                              onClick={() => {
                                setPosition(group);
                                setShowGroupModal(false);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            {group}
                          </div>
                      ))}
                    </div>
                )}
              </>
          ) : (
              <p className="text-[15px]">{position || '정보가 없습니다'}</p>
          )}
        </div>

        {/* 연차 선택 */}
        <div className="px-3 py-3 flex gap-[15px] items-center border-b border-[#e9e9e9] relative">
          <img src={seniorityIcon} className="w-[22px] h-[23px] select-none" />
          {isEditing ? (
              <>
                <button
                    className="text-[15px] text-left border border-gray-300 px-2 py-1 rounded-md w-full"
                    onClick={() => setShowSeniorityModal(true)}
                >
                  {seniority || '정보가 없습니다'}
                </button>
                {showSeniorityModal && (
                    <div
                        ref={modalRef}
                        className="absolute top-full mt-2 left-0 w-[180px] bg-white shadow-md border rounded-md z-10"
                    >
                      {seniorityLevels.map((level) => (
                          <div
                              key={level}
                              onClick={() => {
                                setSeniority(level);
                                setShowSeniorityModal(false);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            {level}
                          </div>
                      ))}
                    </div>
                )}
              </>
          ) : (
              <p className="text-[15px]">{seniority || '정보가 없습니다'}</p>
          )}
        </div>

        {/* 스택 선택 */}
        <div className="pt-7 w-full flex justify-center gap-5 flex-wrap relative">
          <div className="flex gap-5 justify-center">
            {/* 화면에 stackName 보여주기 */}
            {stackItems.map((stack) => {
              const imgSrc = stack.stackUrl

              return (
                  <div key={stack.stackName} className="relative">
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt={stack.stackName}
                            className="select-none w-[35px] h-[35px] rounded-md"
                        />
                    ) : (
                        <div className="w-[35px] h-[35px] bg-gray-300 rounded-md flex items-center justify-center text-white text-xs">
                          {stack.stackName[0]?.toUpperCase()}
                        </div>
                    )}
                    {isEditing && (
                        <button
                            onClick={() => removeStack(stack)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-gray-400 rounded-full flex items-center justify-center"
                        >
                          <img
                              src={closeIcon}
                              className="w-[10px] h-[10px]"
                              alt="remove"
                          />
                        </button>
                    )}
                  </div>
              );
            })}

            {isEditing && stackItems.length < 4 && (
                <div className="relative">
                  <button
                      ref={addButtonRef}
                      onClick={() => setShowStackModal((prev) => !prev)}
                      className="w-[35px] h-[35px] rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-xl font-bold"
                  >
                    +
                  </button>

                  {showStackModal && (
                      <div
                          ref={modalRef}
                          className="absolute top-[50px] left-0 w-[120px] bg-white shadow-lg rounded-md border border-gray-300 z-10 p-2 overflow-y-auto flex flex-col gap-1"
                      >
                        {stackList.map((optionName) => {
                          const isSelected = stackItems.some(
                              (s) => s.stackName === optionName
                          );
                          const isDisabled = isSelected || stackItems.length >= 4;

                          return (
                              <button
                                  key={optionName}
                                  disabled={isDisabled}
                                  onClick={() => toggleStack({ stackName: optionName, stackUrl: '' })}
                                  className={`w-full h-[30px] flex items-center text-contentsize1 rounded-md text-left px-2 py-2
                    ${isSelected ? 'bg-blue-100 text-gray-500' : ''}
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
                              >
                                {optionName}
                              </button>
                          );
                        })}
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
