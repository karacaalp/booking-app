import { QUERY_KEYS } from "@/constants/endpoints";
import { slotsApi } from "@/services/api/SlotsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useModalManagement = (
  id: string,
  isOpen: boolean,
  onClose: () => void
) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");

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
      onClose();
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => slotsApi.cancelSlotById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.fetchSlots] });
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.fetchSlotDetails] });
    }
  }, [isOpen, queryClient]);

  const handleBook = () => {
    if (name.trim().length < 5) {
      alert("Please enter a name with min 5 characters.");
      return;
    }
    bookMutation.mutate();
  };

  const handleCancel = () => {
    cancelMutation.mutate();
  };

  return {
    data,
    isFetching,
    error,
    refetch,
    name,
    setName,
    handleBook,
    handleCancel,
    isCancelling: cancelMutation.isPending,
    isBooking: bookMutation.isPending,
  };
};
