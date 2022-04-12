import * as Loader from "react-loader-spinner";

export const Spinner = ({ message }) => {
  return (
    // <div className="flex flex-col justify-center items-center w-full h-full">
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-main opacity-90">
      <Loader.Grid
        // type="Puff"
        color="#00BFFF"
        // height={100}
        // width={400}
        className="m-5 md:h-52 md:w-52 h-20 w-20"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};
