import { useSession } from "next-auth/react";
import React from "react";
import FilterdCard from "./FilterCard";
import MiniProfile from "./MiniProfile";
import Post from "./Post";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Flyers = () => {
  const { data: session } = useSession();
  return (
    <main>
      <div
        className={` grid grid-cols-1 2xl:grid-cols-5 mx-auto ${
          !session && "!grid-cols-2"
        }`}
      >
        <section className="col-span-2 2xl:col-span-4 mx-3">
          <div className=" mx-auto md:mb-5 mb-2  px-2">
            <FilterdCard />
          </div>
          <Stories />
          <Posts />
        </section>

        {session && (
          <section className="hidden 2xl:col-span-1 2xl:inline-grid">
            {/* MiniProfile */}
            <div className="fixed top-32 mr-5">
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Flyers;
