import { useSession } from "next-auth/react";
import React from "react";
import Bookmarks from "./Bookmarks";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const BookmarkFlyers = () => {
  const { data: session } = useSession();
  return (
    <main className="">
      <section className="max-w-3xl mx-auto">
        {/* section */}
        {/* Stories */}
        {/* <Stories/> */}
        {/* Pots */}
        <Bookmarks />
      </section>
      {/*
      {session && (
        <section className="hidden xl:inline-grid xl:col-span-1">
          <div className="fixed top-30 mr-5">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )} */}
    </main>
  );
};

export default BookmarkFlyers;
