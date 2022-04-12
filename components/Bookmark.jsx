import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import Nextlink from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { FiExternalLink } from "react-icons/fi";

const Bookmark = ({
  id,
  accountName,
  profileImg,
  img,
  caption,
  prefectures,
  placeInfo,
  shopName,
  shopEmail,
  shopTel,
  shopHomepage,
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  // likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  // likes.map((like) => {
  //   console.log(like.id);
  // })

  //hasliked
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //Confirmation of like? or not?
  const likePost = async () => {
    if (hasLiked) {
      //delete!!!!!
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        //If you want to send more data
        accountName: session.user.name,
        timestamp: serverTimestamp(),
      });
    }
  };

  // console.log(hasLiked);

  // snapshot comment!
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //send comment to firebase!
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <>
      {hasLiked && (
        <>
          <div className="bg-white my-5 mx-3 border border-black rounded-sm relative ">
            {/* img */}
            <Nextlink passHref href={`/postdetail/${id}`}>
              <div className="bg-gray-100 p-2 cursor-pointer ">
                <div className=" bg-white shadow-lg shadow-gray-800 ">
                  <img
                    src={img}
                    alt=""
                    className="object-cover w-full hover:scale-95 transition-all duration-500 ease-in-out"
                  />
                </div>
              </div>
            </Nextlink>
            {/* Button */}
            {session && (
              <div className="px-4 pt-4 h-300">
                <div className="flex space-x-4 items-center">
                  {/* {hasLiked ? (
                    <div className="relative navBtn">
                      <BookmarkSolidIcon
                        onClick={likePost}
                        className="btn text-blue-500"
                      />
                      <div className="">
                        {likes.length > 0 && (
                          <p className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-white">
                            {likes.length}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <BookmarkIcon onClick={likePost} className="btn" />
                  )} */}
                </div>
                {/* <BookmarkIcon className="btn" /> */}
                <div className="">{shopName}</div>
                <div className="flex items-center justify-between">
                  <div className="">
                    <p className="text-sm md:text-base px-5 py-3 mr-5 md:px-0 rounded-full text-red-400 text-right">
                      {prefectures}
                      {placeInfo}
                    </p>
                  </div>
                  <div className="">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${shopName}+${prefectures}+${placeInfo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 cursor-pointer border-2 bg-blue-400 border-blue-300 border-inherit hover:border-white/0 p-2 flex items-center justify-center rounded-lg hover:bg-blue-500 hover:rounded-tr-none duration-300"
                    >
                      <img src="/Googlemaps-type.svg" className="md:h-5 h-3" />
                      <FiExternalLink className="text-lg text-white ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* caption */}
            {/* <p className="px-10 py-5 truncate font-bold">
              <span>{caption}</span>
            </p> */}
          </div>
        </>
      )}
    </>
  );
};

export default Bookmark;
