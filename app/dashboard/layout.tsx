import DashboardNavBar from "../ui/dashboard/dashboard-nav-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <DashboardNavBar />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
