import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { Spinner } from "../../components/Spinner";

export default function AdminIndex() {
  const { data: session } = useSession();
  const captionRef = useRef(null);
  const prefecRef = useRef(null);
  const placeRef = useRef(null);
  const shopNameRef = useRef(null);
  const classificationRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const homepageRef = useRef(null);
  const designedByRef = useRef(null);
  const designedByLink = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // image
  const filePickerRef = useRef(null);
  const filePickerRef2 = useRef(null);
  const filePickerRefDesignedBy = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFileDesignedBy, setSelectedFileDesignedBy] = useState(null);
  // const [selectedFile3, setSelectedFile3] = useState(null);
  // const [selectedFile4, setSelectedFile4] = useState(null);
  // const [selectedFile5, setSelectedFile5] = useState(null);
  const router = useRouter();

  // firebase post!!!
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1)Create a post and add to firestore 'posts' collectuion
    // 2)get the post ID for the newly created post
    // 3)upload the image to firebase storage with the post ID
    // 4)get a download URL from fb storage and update to the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      // username: session.user.username,
      // accountName: session.user.name,
      caption: captionRef.current.value,
      prefectures: prefecRef.current.value,
      place: placeRef.current.value,
      shopName: shopNameRef.current.value,
      classification: classificationRef.current.value,
      shopEmail: emailRef.current.value,
      shopTel: telRef.current.value,
      shopHomepage: homepageRef.current.value,
      designedByRef: designedByRef.current.value,
      designedByLink: designedByLink.current.value,
      // profileImg: session.user.image,
      coordinates: {
        latitude: Number(latRef.current.value),
        longitude: Number(lngRef.current.value),
      },
      timestamp: serverTimestamp(),
    });
    // await addDoc(collection(db, "posts"), {
    //   coordinates: lesserGeopoint(latRef.current.value, lngRef.current.value)
    // });
    // console.log("New doc added with ID", docRef.id);
    // img to Storage! & Store
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snaphot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    const imageRef2 = ref(storage, `posts/${docRef.id}/image2`);

    await uploadString(imageRef2, selectedFile2, "data_url").then(
      async (snaphot) => {
        const downloadURL = await getDownloadURL(imageRef2);

        await updateDoc(doc(db, "posts", docRef.id), {
          image2: downloadURL,
        });
      }
    );

    const imageRefDesignedBy = ref(storage, `posts/${docRef.id}/image99`);

    await uploadString(
      imageRefDesignedBy,
      selectedFileDesignedBy,
      "data_url"
    ).then(async (snaphot) => {
      const downloadURL = await getDownloadURL(imageRefDesignedBy);

      await updateDoc(doc(db, "posts", docRef.id), {
        image99: downloadURL,
      });
    });
    setLoading(false);
    setSelectedFile(null);
    setSelectedFile2(null);
    setSelectedFileDesignedBy(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
    console.log(reader);
  };

  const addImageToPost2 = (e) => {
    const reader2 = new FileReader();
    if (e.target.files[0]) {
      reader2.readAsDataURL(e.target.files[0]);
    }
    reader2.onload = (readerEvent) => {
      setSelectedFile2(readerEvent.target.result);
    };
    console.log(reader2);
  };

  const addImageToPostDesignedBy = (e) => {
    const reader3 = new FileReader();
    if (e.target.files[0]) {
      reader3.readAsDataURL(e.target.files[0]);
    }
    reader3.onload = (readerEvent) => {
      setSelectedFileDesignedBy(readerEvent.target.result);
    };
    console.log(reader3);
  };

  return (
    <>
      {session ? (
        <>
          <div className="flex flex-col items-center  justify-center bg-gradient-to-br from-gray-700 to-black h-screen overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col items-center ">
              <div
                onClick={() => router.push("/")}
                className="my-2  relative w-40 h-40 hidden lg:inline-grid cursor-pointer "
              >
                <Image
                  src="/logo-main-white.svg"
                  layout="fill"
                  className=""
                  // objectFit="contain"
                />
              </div>
              <h1 className=" text-white text-2xl italic">Upload Page</h1>
            </div>
            {/* Modalの中身 */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-10 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6 overflow-y-scroll scrollbar-hide">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {selectedFile2 ? (
                  <img
                    src={selectedFile2}
                    onClick={() => setSelectedFile2(null)}
                    alt=""
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef2.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-10">
                  <div className="mt-10 text-center sm:mt-5 ">
                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                        required
                      />
                    </div>
                    <div>
                      <input
                        ref={filePickerRef2}
                        type="file"
                        hidden
                        onChange={addImageToPost2}
                        required
                      />
                    </div>
                    {/* 店名を追加 */}
                    <div className="mt-2 border-b-2">
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={shopNameRef}
                        type="text"
                        placeholder="店名を追加"
                        required
                      />
                    </div>
                    <div className="mt-2 border-b-2 flex">
                      <input
                        className="border-none mr-2 focus:right-0 w-full text-center"
                        ref={latRef}
                        type="number"
                        placeholder="緯度"
                        required
                      />
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={lngRef}
                        type="number"
                        placeholder="経度"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <p>カテゴリー</p>

                      <select
                        ref={classificationRef}
                        name="classification"
                        className="ml-10"
                      >
                        <option value="カフェ">カフェ</option>
                        <option value="スクール">スクール</option>
                        <option value="美容室">美容室</option>
                        <option value="飲食店">飲食店</option>
                        <option value="観光地">観光地</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                    {/* キャプションを追加 */}
                    <div className="mt-2 border-b-2">
                      <textarea
                        className="focus:right-0 w-full text-center"
                        ref={captionRef}
                        type="text"
                        placeholder="キャプションを追加"
                        required
                      />
                    </div>
                    {/* <span class="p-country-name" style="display:none;">Japan</span> */}
                    {/* <div className="flex items-center justify-center mt-5  border-b-2">
                      <p>〒</p>
                        <input
                            className="border-none focus:right-0 w-18 text-center"
                            ref={placeRef}
                            type="text"
                        placeholder="郵便番号"
                        maxlength="8"
                          />
                      </div> */}
                    {/* 場所の追加 */}
                    <div className="mt-5 flex items-center border-b-2">
                      <select
                        ref={prefecRef}
                        name="prefectures"
                        className="border-none mr-1"
                      >
                        <option value="福岡県">福岡県</option>
                        <option value="東京都">東京都</option>
                        <option value="北海道">北海道</option>
                        <option value="宮城県">宮城県</option>
                        <option value="山口県">山口県</option>
                        <option value="沖縄県">沖縄県</option>
                        <option value="その他">その他</option>
                      </select>
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={placeRef}
                        type="text"
                        placeholder="場所を追加"
                      />
                    </div>
                    {/* アドレスの追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={emailRef}
                      type="email"
                      placeholder="Emailアドレス"
                    />
                    {/* 電話番号の追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={telRef}
                      type="number"
                      placeholder="電話番号"
                    />
                    {/* ホームページアドレスの追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={homepageRef}
                      type="url"
                      placeholder="ホームページ"
                    />
                    {selectedFileDesignedBy ? (
                      <img
                        src={selectedFileDesignedBy}
                        onClick={() => setSelectedFileDesignedBy(null)}
                        alt=""
                        className="w-full object-contain cursor-pointer"
                      />
                    ) : (
                      <div
                        onClick={() => filePickerRefDesignedBy.current.click()}
                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                      >
                        <CameraIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div>
                      <input
                        ref={filePickerRefDesignedBy}
                        type="file"
                        hidden
                        onChange={addImageToPostDesignedBy}
                        required
                      />
                    </div>
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={designedByRef}
                      type="url"
                      placeholder="デザイン会社"
                    />
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={designedByLink}
                      type="url"
                      placeholder="デザイン会社 ホームページリンク"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  {/* somewhere wrong? */}
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-within:ring-2 focus:ring-blue-600 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed  hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? <Spinner /> : "アップロード"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          onClick={() => router.push("/adminsignin")}
          className=" cursor-pointer  flex items-center justify-center h-full w-full"
        >
          <h1>ログインを行なってください</h1>
        </div>
      )}
    </>
  );
}
