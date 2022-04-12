import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { modalState } from "../atoms/modalAtoms";
import { Hits } from "react-instantsearch-dom";
import { useRecoilState } from "recoil";
import { Hit } from "./Hit";
import { SearchBox } from "react-instantsearch-dom";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";

const searchClient = algoliasearch(
  "30Q9NX0ZJ9",
  "96393fd0db56439a9aa5c63ba3746aef"
);

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    //   ヘッダーレスUI
    <InstantSearch searchClient={searchClient} indexName={"posts"}>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center  sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-30"
              enterFrom="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-100 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              {/* Modalの中身 */}
              <div className=" inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ">
                <div>
                  <SearchBox className="" />
                  <Hits hitComponent={Hit} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </InstantSearch>
  );
};

export default Modal;
