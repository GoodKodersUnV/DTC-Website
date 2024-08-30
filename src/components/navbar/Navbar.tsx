"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import UserProfile from "./UserProfile";
import ThemeSwitch from "./ThemeSwitch";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types/user";
interface Props {
  currentUser: User;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  items?: { name: string; icon: any; path: string }[];
}

const Navbar: React.FC<Props> = ({ currentUser, menu, setMenu, items }: Props) => {
  const router = useRouter();
  const [popover, setPopover] = useState(false);
  const Back = () => {
    router.back();
  };
  const Menu = () => {
    setMenu(!menu);
  };

  return (
    <div className="shadow-md px-2 z-50 sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-between p-2 px-4">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div className="">
            <Link href="/" className="hidden md:flex">
              Website
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center text-second">
          <div className="flex items-center gap-2">
            {
              items?.map((item: any) => (
                <Link
                  href={item.path}
                  key={item.id}
                  className="p-2 rounded-full dark:hover:bg-secondary-800 hover:bg-neutral-300 cursor-pointer"
                >
                  {item.name}
                </Link>
              ))
            }
            {items && (<div>|</div>)}
          </div>
          {currentUser?.role == "ADMIN" &&
            <h1 className="text-sm font-medium">
              ADMIN
            </h1>
          }
          <ThemeSwitch />
          <div className="rounded-full cursor-pointer dark:hover:bg-secondary-800 hover:bg-neutral-300 p-2">
            <div onClick={() => setPopover((prev) => !prev)}>
              <IoMdNotificationsOutline className="text-xl" />
            </div>
            {popover && (
              <div className="flex flex-col justify-between absolute right-0 text-zinc-700 w-64 mr-5 h-60 mt-5 text-center bg-white rounded-lg shadow-lg p-2">
                <div>
                  <h1 className="text-xl font-bold text-blue-500">Notifications</h1>
                  <p className="my-2 text-sm font-medium">No notifications recieved yet</p>
                </div>
                <div>
                  <button className="w-full p-2.5 bg-blue-500 text-white rounded-md text-sm  font-medium">Clear all</button>
                </div>
              </div>
            )}
          </div>
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;