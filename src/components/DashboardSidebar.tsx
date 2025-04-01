
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Repeat, 
  QrCode, 
  Users, 
  Bell, 
  BarChart2, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
  <Link to={href}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 pl-3",
        isActive ? "bg-library-50 text-library-700 font-medium" : "text-gray-600 hover:bg-library-50/50 hover:text-library-600"
      )}
    >
      {icon}
      {label}
    </Button>
  </Link>
);

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className }: DashboardSidebarProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarLinks = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    {
      href: "/books",
      icon: <BookOpen size={18} />,
      label: "Book Catalogue",
    },
    {
      href: "/issue-return",
      icon: <Repeat size={18} />,
      label: "Issue/Return",
    },
    {
      href: "/qr-scanner",
      icon: <QrCode size={18} />,
      label: "QR Scanner",
    },
    {
      href: "/members",
      icon: <Users size={18} />,
      label: "Members",
    },
    {
      href: "/notifications",
      icon: <Bell size={18} />,
      label: "Notifications",
    },
    {
      href: "/reports",
      icon: <BarChart2 size={18} />,
      label: "Reports",
    },
    {
      href: "/settings",
      icon: <Settings size={18} />,
      label: "Settings",
    },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar for desktop */}
      <div
        className={cn(
          "hidden md:flex md:flex-col w-64 h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-40",
          className
        )}
      >
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-library-600"
            >
              <path 
                d="M12 4.5c-2.248 0-4.5.5-6 1.5V17c1.5-1 3.752-1.5 6-1.5 2.248 0 4.5.5 6 1.5V6c-1.5-1-3.752-1.5-6-1.5z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 4.5C9.752 4.5 7.5 5 6 6M12 15.5c-2.248 0-4.5.5-6 1.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-library-700 to-library-500">
              LibraryOS
            </span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={currentPath === link.href}
            />
          ))}
        </div>

        <div className="p-4 border-t mt-auto">
          <Link to="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut size={18} />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm">
          <div className="h-full w-64 bg-white fixed top-0 left-0 z-50 overflow-y-auto">
            <div className="p-4 border-b">
              <Link to="/" className="flex items-center gap-2">
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-library-600"
                >
                  <path 
                    d="M12 4.5c-2.248 0-4.5.5-6 1.5V17c1.5-1 3.752-1.5 6-1.5 2.248 0 4.5.5 6 1.5V6c-1.5-1-3.752-1.5-6-1.5z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 4.5C9.752 4.5 7.5 5 6 6M12 15.5c-2.248 0-4.5.5-6 1.5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-library-700 to-library-500">
                  LibraryOS
                </span>
              </Link>
            </div>

            <div className="py-6 px-3 flex flex-col gap-1">
              {sidebarLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  isActive={currentPath === link.href}
                />
              ))}
            </div>

            <div className="p-4 border-t mt-auto">
              <Link to="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <LogOut size={18} />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
