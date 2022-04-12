import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Nextlink from "next/link";
import { useEffect, useState } from "react";
import { categories } from "../utils/data";
import Story from "./Story";

const Stories = () => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    // console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  //   const categories = [
  //     {
  //     name: 'カフェ',
  //     image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  //   },
  //   {
  //     name: 'フィットネス',
  //     image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
  //   },
  //   {
  //     name: '雑貨・生活',
  //     image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  //   },
  //   {
  //     name: 'スクール',
  //     image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
  //   },
  //   {
  //     name: '映画',
  //     image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
  //   },

  //   {
  //     name: '自然・キャンプ',
  //     image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  //   },
  //   {
  //     name: '美術館',
  //     image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
  //   }, {
  //     name: '旅行',
  //     image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
  //   },
  //   {
  //     name: '美容室',
  //     image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
  //   }, {
  //     name: '居酒屋・クラブ',
  //     image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  //   }, {
  //     name: 'レストラン',
  //     image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
  //   },
  //   {
  //     name: 'その他',
  //     image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  //   },
  // ];

  return (
    <div className="mt-8 shadow-md">
      <h3 className="text-white ml-3">■カテゴリー(未実装)</h3>
      <div className="p-6  overflow-x-scroll scrollbar-thin scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900 mx-1">
        {/* {session && (
          <Story img={session.user.image} username={session.user.name} />
        )}
        {suggestions.map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.name}
          />
        ))} */}
        {/* <Story /> */}
        <div className="flex space-x-2">
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <div
              key={category.image + index + 1}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={category.image}
                className="h-20 w-20 mx-10 rounded-full border-red-500 border-2 object-cover cursor-pointer hover:scale-110 transition transform duration-200 ease-out mb-1"
                alt="category"
              />
              {/* {category.image + index+1} */}
              <p className="text-xs w-24 truncate text-center text-white">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
