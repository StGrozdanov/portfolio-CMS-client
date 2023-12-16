import { useContext } from "react";
import { ProjectInputModalContext } from "../contexts/ProjectInputModalContext";

/**
 * Hook that provides access to input modal. On use - it opens the modal
 */
export const useProjectInputModalContext = () => {
  const context = useContext(ProjectInputModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context.openModal;
};