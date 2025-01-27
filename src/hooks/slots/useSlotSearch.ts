import { QUERY_KEYS } from "@/constants/endpoints";
import { slotsApi } from "@/services/api/SlotsApi";
import { IGetSlotsProps, ISlot } from "@/types/slots";
import { useQuery } from "@tanstack/react-query";

interface SlotSearchReturn {
  data: ISlot[] | undefined;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export const useSlotSearch = (params?: IGetSlotsProps): SlotSearchReturn => {
  const { data, isFetching, isError, refetch, error } = useQuery({
    queryKey: [QUERY_KEYS.fetchSlots, params],
    queryFn: () =>
      slotsApi.getSlots({
        ...params,
      }),
    enabled: false,
  });

  return {
    data,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export default useSlotSearch;
