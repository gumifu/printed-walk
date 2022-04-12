import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { BiLogIn } from "react-icons/bi";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";
import { HeaderTest } from "./HeaderTest";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  // console.log(session.user.uid);
  return (
    <div className="sticky md:top-10 top-0 md:mx-5 z-50 md:mb-20 mb-5">
      <div className="flex shadow-xl shadow-gray-800 items-center justify-between m-w-6xl bg-black md:rounded-full bg-opacity-20 backdrop-blur-md px-4 py-2">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className=" my-2 relative md:w-20 md:h-20  hidden lg:inline-grid cursor-pointer "
        >
          <Image
            src="/logo-main-white.svg"
            layout="fill"
            className=""
            // objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-12 h-12 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="/logo-mark-white.svg"
            layout="fill"
            className=""
            objectFit="contain"
          />
        </div>

        {/* center */}
        {/* {session && ( */}
        <div className=" relative flex mt-1 rounded-md items-center">
          {/* <div
              onClick={() => router.push("/filters")}
              className=" flex items-center justify-center w-full h-full bg-blue-500 rounded-full hover:bg-opacity-80 cursor-pointer"
            > */}
          {/* <div className="flex items-center justify-center h-14 w-32 pl-5   text-white rounded-full">
                <p>条件検索</p>
              </div> */}
          {/* <div className=""> */}
            <div className="relative lg:p-3 p-1 rounded-md ">
              <div className="absolute inset-y-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className=" md:h-14 h-10 bg-gray-50 block pl-10 sm:text-sm border-gray-300 focus:ring-blue-100 rounded-full"
                type="text"
                placeholder="検索"
                onClick={() => setOpen(true)}
              />
            </div>
          {/* </div> */}
        </div>
        {/* )} */}

        {/* right */}
        <div className="flex items-center md:mr-5 justify-end md:space-x-4 space-x-0">
          <HomeIcon
            onClick={() => router.push("/")}
            className="navBtn text-white h-8"
          />
          {session ? (
            <>
              {/* <MenuIcon className="btn h-8 md:hidden cursor-pointer text-white" /> */}
              <BookmarkSolidIcon
                onClick={() => router.push("/bookmarks")}
                className="btn md:h-10 h-8 inline-block max-w-xs text-blue-500"
              />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="profile pic"
                className="hidden sm:inline-block h-10 w-10 object-cover rounded-full cursor-pointer"
              />
              <HeaderTest />
            </>
          ) : (
              <>
            <button className="hidden md:inline-block text-blue-400 text-sm md:text-lg md:pr-8 pr-0" onClick={signIn}>
              サインイン
            </button>
            <button className="md:hidden text-blue-400 text-4xl " onClick={signIn}>
              <BiLogIn/>
            </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
