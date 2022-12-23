import React from "react";
import styles from "./Drawer.module.css";
import { IoPeopleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
// import { HiOutlinePhoto } from "react-icons/hi2";
import { CgAlbum } from "react-icons/cg";
import { BsFilePost } from "react-icons/bs";
import { useRouter } from "next/router";
const data = [
  {
    label: "Users",
    link: "/user",
    icon: IoPeopleOutline,
  },
  {
    label: "Posts",
    link: "/post",
    icon: BsFilePost,
  },
  {
    label: "Albums",
    link: "/album",
    icon: CgAlbum,
  },
  // {
  //   label: "Photos",
  //   link: "/photo",
  //   icon: HiOutlinePhoto,
  // },
];
const Drawer = ({ toggle, setToggle }) => {
  let router = useRouter();

  return (
    <div
      className={`${styles.drawer__container} ${
        toggle ? "" : "absolute left-[-244px]"
      } w-[300px] h-full border-r-[1px] p-4`}
    >
      <div className="flex justify-end">
        <RxHamburgerMenu
          size={25}
          className="my-4 cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {data.map((item, index) => (
        <div
          className={`${
            item.link === router.asPath ? "text-primary" : "text-slate-500"
          } cursor-pointer flex items-center my-4`}
          onClick={() => router.push(item?.link)}
          key={index}
        >
          <p className="w-full text-lg capitalize">{item?.label}</p>
          <item.icon size={30} className="" />
        </div>
      ))}
    </div>
  );
};

export default Drawer;
