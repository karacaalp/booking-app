import { QUERY_KEYS } from "@/constants/endpoints";
import { slotsApi } from "@/services/api/SlotsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useModalContext } from "../common/useModalContext";
import { useSlotDetailContext } from "./useSlotDetailContext";

export const useSlotApi = () => {
  const queryClient = useQueryClient();
  const { isOpen } = useModalContext();
  const { id, setId, name, setName } = useSlotDetailContext();

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
    mutationFn: () => {
      if (!id || !name) throw new Error("Missing id or name");
      return slotsApi.bookSlotById(id, name);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("Missing id");
      return slotsApi.cancelSlotById(id);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.fetchSlotDetails] });
    }
  }, [isOpen, queryClient]);

  return {
    queryClient,
    data,
    isFetching,
    error,
    refetch,
    name,
    setName,
    id,
    setId,
    handleBook: bookMutation.mutateAsync,
    handleCancel: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
    isBooking: bookMutation.isPending,
  };
};
