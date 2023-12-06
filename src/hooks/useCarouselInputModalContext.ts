import { useContext } from "react";
import { CarouselInputModalContext } from "../contexts/CarouselInputModalContext";


/**
 * Hook that provides access to input modal. On use - it opens the modal
 */
export const useCarouselInputModalContext = () => {
  const context = useContext(CarouselInputModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context.openModal;
};