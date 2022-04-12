import { CashIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { SearchCircleIcon } from "@heroicons/react/outline";

const FilterdCard = ({ placeholder }) => {
  const [prefecRefInput, setPrefecRefInput] = useState("");
  const [classificationRefInput, setClassificationRefInput] = useState("");
  const router = useRouter();

  const resetInput = () => {
    // setsetPrefecRefInput("")
    setClassificationRefInput("");
  };

  const search = () => {
    router.push({
      pathname: "/filtersresult",
      query: {
        prefecture: prefecRefInput,
        classification: classificationRefInput,
      },
    });
  };

  return (
    <div className="">
      <div className="flex items-center justify-center shadow-md w-full">
        <div className="bg-[url('/copy-image.png')] bg-cover w-1/5 ml-3 p-5 hidden md:inline-block">
          <img
            src="/copy.png"
            layout="fill"
            // objectFit="contain"
            className=" w-full hidden md:inline-block"
          />
        </div>
        <div className="bg-white bg-opacity-10 p-5 rounded-lg md:w-4/5 w-full md:mr-5 m-1">
          <p className=" text-white">■ エリア / カテゴリーを入力</p>
          <div className="flex items-center rounded-md lg:mb-3 mb-1 py-2 md:shadow-sm border-none">
            <select
              value={prefecRefInput}
              onChange={(e) => setPrefecRefInput(e.target.value)}
              name="prefectures"
              className="rounded-lg mr-1 lg:h-14 h-10"
            >
              <option value="全国">全国</option>
              <option value="福岡県">福岡県</option>
              <option value="東京都">東京都</option>
              <option value="北海道">北海道</option>
              <option value="山口県">山口県</option>
              <option value="その他">その他</option>
            </select>
            <input
              value={classificationRefInput}
              onChange={(e) => setClassificationRefInput(e.target.value)}
              className="flex-grow md:pl-5 bg-transparent w-full text-sm text-gray-900 rounded-lg lg:h-14 h-10 bg-gray-50 "
              type="text"
              placeholder={placeholder || "例：カフェ"}
            />
          </div>

          <div className="mx-auto ">
            <div className="flex mb-2">
              <button
                onClick={resetInput}
                className="flex-grow bg-gray-500 text-white md:px-20 lg:py-5 py-2 hover:bg-opacity-75 rounded-l-lg"
              >
                X Cancel
              </button>
              <button
                onClick={search}
                className="flex-grow text-white bg-blue-500 md:px-20 lg:py-5 py-2 rounded-sm hover:bg-opacity-75 rounded-r-lg"
              >
                <div className="flex items-center justify-center">
                  <SearchIcon className="h-5" /> <p className="">Search</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterdCard;
