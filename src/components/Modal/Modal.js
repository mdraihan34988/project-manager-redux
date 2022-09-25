import React from "react";

function Modal({ open, control, children }) {
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        {children}
      </>
    )
  );
}

export default Modal;
