import React, { useEffect, useRef } from "react";

const Modal = ({
  children,
  open,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}>) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute overlay top-0 left-0 flex justify-center items-center size-full">
      <div ref={modalRef} className="relative flex justify-center items-center z-50">
        {children}
      </div>
    </div>
  );
};

export default Modal;
