import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import { signOutUser } from "@/redux/userSlice";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal())
    dispatch(closeLoginModal())
  }
  return (
    <div className="fixed flex-col hidden h-full sm:flex xl:ml-24">
      <nav className="h-full relative xl:space-y-1.5">
        <div className="flex items-center justify-center py-3 xl:justify-start xl:p-3">
          <Image src={"/assets/twitter-logo.png"} width={34} height={34} alt=""/>
        </div>
        <SidebarLink Icon={HomeIcon} text={"Home"} />
        <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        <SidebarLink Icon={BellIcon} text={"Notifications"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button
          className="hidden xl:inline bg-[#1d9bf0]
        rounded-full h-[52px] mt-2 w-[200px] text-lg font-bold
        "
        >
          Tweet
        </button>
        <div
          onClick={handleSignOut}
          className="absolute bottom-0 flex items-center justify-center space-x-3 rounded-full cursor-pointer hover:bg-white hover:bg-opacity-10 xl:p-3"
        >
          <img
            className="object-cover w-10 h-10 rounded-full "
            src={user.photoUrl || "" } 
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="hidden h-5 xl:inline" />
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="flex items-center justify-center mb-3 space-x-3 text-xl hoverAnimation xl:justify-start">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}