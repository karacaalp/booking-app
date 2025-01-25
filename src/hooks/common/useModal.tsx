import { useCallback, useState } from "react";

interface ModalState {
  isOpen: boolean;
  selectedId: string | null;
}

interface UseModalReturn {
  modalState: ModalState;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [modalState, setModalState] = useState<ModalState>(() => ({
    isOpen: false,
    selectedId: null,
  }));

  const openModal = useCallback((id: string) => {
    setModalState((prev) => ({ ...prev, isOpen: true, selectedId: id }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false, selectedId: null }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
  };
};
