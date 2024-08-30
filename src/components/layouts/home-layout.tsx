"use client";
import { User } from "@/types/user";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import Navbar from "../navbar/Navbar";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineQueryStats } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import Sidebar from "../sidebar/sidebar";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const pathname = usePathname();
  const items = [
    {
      name: "Home",
      icon: <RxDashboard />,
      path: "/",
      isActive: pathname === "/",
    },
    {
      name: "Tab1",
      icon: <HiUserGroup />,
      path: "/tab1",
      isActive: pathname === "/tab1",
    },
    {
      name: "Tab2",
      icon: <MdOutlineQueryStats />,
      path: "/tab2",
      isActive: pathname === "/tab2",
    },
  ];
  return (
    <div className="w-full">
      <Navbar
        currentUser={currentUser}
        menu={menu}
        setMenu={setMenu}
        // items={items}
      />
      <div className="flex">
        <Sidebar items={items} menu={menu} setMenu={setMenu} />
        <Suspense fallback={<Loading />}>
          <div className={`w-full`}>{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
