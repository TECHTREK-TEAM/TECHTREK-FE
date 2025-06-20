import SuccessLabel from '../../components/MyPages/SuccessLabel';
import TinyBar from '../../components/MyPages/TinyBar';

interface InterviewCardProps {
  title: string;
  resultScore: number;
  enterpriseName: string;
  analysisGroup: string;
  name: string;
}

const InterviewCard = ({
  title,
  resultScore,
  enterpriseName,
  analysisGroup,
  name,
}: InterviewCardProps) => {
  return (
    <div className="bg-white w-[395px] h-full flex flex-col gap-5 p-6 rounded-xl">
      <div className="w-full h-[162px] bg-gray-300 rounded-xl" />
      <div className="w-full h-fit flex flex-col gap-5">
        <div className="w-full h-fit flex flex-col gap-4">
          <div className="w-full h-fit flex flex-col gap-3">
            <SuccessLabel resultScore={resultScore} />
            <p className="text-customgray font-medium text-contentsize1 text-left">
              {title}
              <br />
              <span className="text-primary">{enterpriseName} 기술면접</span>
            </p>
          </div>
          <TinyBar percentage={resultScore} />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-[12px] font-semibold text-[#505050]">{name}</p>
          <p className="text-[12px] font-semibold text-customgray">
            {analysisGroup}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
