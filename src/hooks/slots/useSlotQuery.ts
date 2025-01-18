import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/endpoints";
import { slotsApi } from "../../services/api/SlotsApi";
import type { IGetSlotsProps } from "../../types/slots";

export const useSlotQuery = (params: IGetSlotsProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.fetchSlots, params],
    queryFn: () => slotsApi.getSlots(params),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
