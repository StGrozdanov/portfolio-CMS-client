import { useContext } from "react";
import { JobInputModalContext } from "../contexts/JobInputModalContext";

/**
 * Hook that provides access to input modal. On use - it opens the modal
 */
export const useJobInputModalContext = () => {
  const context = useContext(JobInputModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context.openModal;
};