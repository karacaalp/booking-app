import { QUERY_KEYS } from "@/constants/endpoints";
import { slotsApi } from "@/services/api/SlotsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export const useModalManagement = (
  id: string,
  isOpen: boolean,
  onClose: () => void,
  refetchSlots: () => void
) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");

  const clearQueries = useCallback(() => {
    const queriesToRemove = [
      QUERY_KEYS.fetchSlotDetails,
      QUERY_KEYS.fetchSlots,
    ];
    queriesToRemove.forEach((key) => {
      queryClient.removeQueries({ queryKey: [key] });
    });
  }, [queryClient]);

  const handleClose = useCallback(() => {
    clearQueries();
    onClose();
    refetchSlots();
  }, [clearQueries, onClose, refetchSlots]);

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.fetchSlotDetails],
    queryFn: ({ signal }) => {
      if (!id) return null;
      return slotsApi.getSlotById(id, signal);
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const bookMutation = useMutation({
    mutationFn: () => slotsApi.bookSlotById(id, name),
    onSuccess: () => {
      handleClose();
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => slotsApi.cancelSlotById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchSlots] });
      handleClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.fetchSlotDetails] });
    }
  }, [isOpen, queryClient]);

  return {
    data,
    isFetching,
    error,
    refetch,
    name,
    setName,
    handleBook: bookMutation.mutate,
    handleCancel: cancelMutation.mutate,
    handleClose,
    isCancelling: cancelMutation.isPending,
    isBooking: bookMutation.isPending,
  };
};
