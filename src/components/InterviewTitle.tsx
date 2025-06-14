interface InterviewTitleProps {
  children: string;
}

const InterviewTitle = ({ children }: InterviewTitleProps) => {
  return (
    <div className="w-full h-[95px] border-b-[3px] border-primary text-primary font-semibold text-subtitlesize flex items-center justify-start">
      {children}
    </div>
  );
};

export default InterviewTitle;
