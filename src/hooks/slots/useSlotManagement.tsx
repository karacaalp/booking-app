import { IGetSlotsProps } from "@/types/slots";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { QUERY_KEYS } from "../../constants/endpoints";
import { useSlotQuery } from "./useSlotQuery";

interface ModalState {
  isOpen: boolean;
  selectedId: string | null;
}

export const useSlotManagement = (params?: IGetSlotsProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2024-08-01")
  );
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedId: null,
  });

  const queryClient = useQueryClient();

  const { data, isFetching, isError, refetch, error } = useSlotQuery({
    date: selectedDate?.toISOString().split("T")[0],
    ...params,
  });

  const handleModalOpen = useCallback((id: string) => {
    setModalState({ isOpen: true, selectedId: id });
  }, []);

  const handleModalClose = useCallback(() => {
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.fetchSlotDetails] });
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.fetchSlots] });
    setModalState({ isOpen: false, selectedId: null });
    refetch();
  }, [queryClient, refetch]); 

  return {
    selectedDate,
    setSelectedDate,
    modalState,
    handleModalOpen,
    handleModalClose,
    data,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export default useSlotManagement;
