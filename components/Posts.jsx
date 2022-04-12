import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import Masonry from "react-masonry-css";
import { LoadingImage } from "./LoadingImage";
import { Hits } from "react-instantsearch-dom";
import { Spinner } from "./Spinner";

const breakpointColumnsObj = {
  default: 4,
  3000: 5,
  // 2000: 5,
  1200: 3,
  1000: 2,
  500: 2,
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <>
      {/* // <div className="grid grid-cols-2 m-14 gap-5 md:grid-cols-4"> */}
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        {/* Post */}
        {/* <Hits hitComponent={Hit} /> */}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            classification={post.data().classification}
            accountName={post.data().accountName}
            profileImg={post.data().profileImg}
            img={post.data().image}
            subimg={post.data().image2}
            caption={post.data().caption}
            prefectures={post.data().prefectures}
            placeInfo={post.data().place}
            coordinates={post.data().coordinates}
            shopName={post.data().shopName}
            shopEmail={post.data().shopEmail}
            shopTel={post.data().shopTel}
            shopHomepage={post.data().shopHomepage}
          />
        ))}
      </Masonry>
    </>
  );
};

export default Posts;
