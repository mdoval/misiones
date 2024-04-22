import DashboardNavBar from "../ui/dashboard/dashboard-nav-bar";
import DashboardSideBar from "../ui/dashboard/dashboard-side-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <DashboardNavBar />
      </div>
      <div className="h-full w-full flex">
        <div className="h-full bg-gray-100">
          <DashboardSideBar />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
