import Nextlink from "next/link";

export const Hit = ({ hit }) => {
  return (
    <Nextlink passHref href={`/postdetail/${hit.objectID}`}>
      <div className=" m-10 h-200 hover:bg-gray-50 p-3">
        <div className=" bg-white shadow-lg shadow-gray-200 ">
          <img
            src={hit.image}
            alt=""
            className="object-cover w-full hover:scale-105 transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="">
          <h1>{hit.shopName}</h1>
        </div>
        <div className="">
          <h3>{hit.classification}</h3>
        </div>
        <div className="">
          <p>{hit.caption}</p>
        </div>
        <hr className=" bg-gray-600" />
        {/* <div className="">{hit.place}</div>
          <div className="">{hit.objectID}</div> */}
      </div>
    </Nextlink>
  );
};
