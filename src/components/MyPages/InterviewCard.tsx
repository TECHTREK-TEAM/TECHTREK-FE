import SuccessLabel from '../../components/MyPages/SuccessLabel';
import TinyBar from '../../components/MyPages/TinyBar';
import { companyMap } from '../../constants/companyMap.ts';

interface InterviewCardProps {
  title: string;
  pass: boolean;
  score: number;
  enterpriseName: string;
  analysisPosition: string;
  name: string;
}

const InterviewCard = ({
  title,
  pass,
  score,
  enterpriseName,
  analysisPosition,
  name,
}: InterviewCardProps) => {
  return (
    <div className="w-full h-full flex-1 max-w-full flex flex-col gap-5 p-6 rounded-xl bg-white">
      <div
        className={`w-full h-[155px] rounded-xl overflow-hidden ${companyMap[enterpriseName]?.mainBgColor}`}
      >
        <img
          src={companyMap[enterpriseName]?.mainLogo}
          alt={companyMap[enterpriseName]?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-fit flex flex-col gap-5">
        <div className="w-full h-fit flex flex-col gap-4">
          <div className="w-full h-fit flex flex-col gap-3">
            <SuccessLabel pass={pass} />
            <p className="text-customgray font-medium text-contentsize1 text-left">
              {title}
              <br />
              <span className="text-primary">{enterpriseName} 기술면접</span>
            </p>
          </div>
          <TinyBar percentage={score} />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-[12px] font-semibold text-[#505050]">{name}</p>
          <p className="text-[12px] font-semibold text-customgray">
            {analysisPosition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
