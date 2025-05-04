import React from "react";
import { ModalContent, ModalOverlay } from "./commonStyle.js";

const Modal = ({ width, height, isOpen, onClose, isClosing, children }) => {
  return (
    isOpen && (
      <ModalOverlay onClick={onClose}>
        <ModalContent
          width={width}
          height={height}
          isOpen={isOpen}
          isClosing={isClosing}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default Modal;
