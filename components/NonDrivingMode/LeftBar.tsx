// In LeftBar.jsx
import Link from "next/link";
import Image from "./Image";
import { Bell, Bookmark, CircleUserRound, Search, Upload, Users } from "lucide-react";

const menuList = [
  { id: 2, name: "Explore", link: "/", icon: <Search /> },
  { id: 3, name: "Notification", link: "/", icon: <Bell /> },
  { id: 5, name: "Bookmarks", link: "/", icon: <Bookmark /> },
  { id: 7, name: "Communities", link: "/", icon: <Users /> },
  { id: 9, name: "Profile", link: "/", icon: <CircleUserRound /> },
];

interface LeftBarProps {
  sidebarOpen: boolean;
}

const LeftBar = ({ sidebarOpen }: LeftBarProps) => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-20 pb-8">
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="group p-2 rounded-full flex items-center gap-4"
              key={item.id}
            >
              <span className="group-hover:text-blue-500">{item.icon}</span>
              {/* Conditionally render text if sidebar is open */}
              {sidebarOpen && (
                <span className="hidden md:text-sm lg:inline xxl:inline">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
          <Link
            href="/compose/post"
            className="group p-2 rounded-full flex items-center gap-4"
          >
            <Upload className="group-hover:text-blue-500" />
            {sidebarOpen && (
              <span className="hidden md:text-sm lg:inline xxl:inline">
                Post
              </span>
            )}
          </Link>
        </div>
      </div>
      {/* User section remains the same */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image path="/general/male1.jpg" alt="Barun" w={100} h={100} tr={true} />
          </div>
          {sidebarOpen && (
            <div className="hidden xxl:flex flex-col">
              <span className="font-bold">Barun Bhowmik</span>
              <span className="text-sm text-textGray">@barunbhowmik</span>
            </div>
          )}
        </div>
        {sidebarOpen && <div className="hidden xxl:block cursor-pointer font-bold">...</div>}
      </div>
    </div>
  );
};

export default LeftBar;
