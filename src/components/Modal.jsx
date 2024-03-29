import React from 'react'

const Modal = (props) => {
  return (
    <div
      class={`${
        props.show ? "block" : "hidden"
      } bg-[#00000080] fixed right-0 left-0 top-0 z-50 justify-center items-center h-screen`}
    >
      <div class="relative m-auto top-1/2 -translate-y-1/2 px-4 w-full max-w-md h-auto">
        <div class="relative bg-white rounded-lg shadow ">
          <div class="p-2">
            <button
              type="button"
              class="float-left text-gray bg-gray-200 hover:bg-vgray hover:text-vred rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={props.handleClose}
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <br class="clear-both" />
          </div>
          <div className='scoll-bar__modal overflow-auto max-h-[500px]'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal