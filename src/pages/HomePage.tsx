import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';

function HomePage() {
  return (
    <div className="min-h-[2000px] flex flex-col">
      <Topbar />
      <div className="h-screen w-[600px] flex flex-col items-center">
        <ProgressBar percentage={65} />
      </div>
    </div>
  );
}

export default HomePage;
