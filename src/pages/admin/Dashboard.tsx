import Indicator from "../../components/dashboard/Indicator";
import SideBarCalendar from "../../components/dashboard/SideBarCalendar";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex overflow- bg-[#FFFF]">
        <SideBarCalendar />
        <Indicator />
      </div>
    </>
  );
};

export default Dashboard;
