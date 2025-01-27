import { QUERY_KEYS } from "@/constants/endpoints";
import { slotsApi } from "@/services/api/SlotsApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useModalContext } from "../common/useModalContext";
import { useSlotDetailContext } from "../contexts/useSlotDetailContext";

export const useSlotDetail = () => {
  const queryClient = useQueryClient();
  const { isOpen } = useModalContext();
  const { id } = useSlotDetailContext();

  const { data, isFetching, error, refetch, isError } = useQuery({
    queryKey: [QUERY_KEYS.fetchSlotDetails],
    queryFn: ({ signal }) => {
      if (!id) return null;
      return slotsApi.getSlotById(id, signal);
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (!isOpen) {
      queryClient.cancelQueries({ queryKey: [QUERY_KEYS.fetchSlotDetails] });
    }
  }, [isOpen, queryClient]);

  return {
    data,
    isFetching,
    isError,
    error,
    refetch,
  };
};
