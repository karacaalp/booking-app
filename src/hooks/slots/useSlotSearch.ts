import { IGetSlotsProps } from "@/types/slots";
import { useState } from "react";
import { useSlotQuery } from "./useSlotQuery";

interface SlotSearchReturn {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  data: ReturnType<typeof useSlotQuery>["data"];
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export const useSlotSearch = (params?: IGetSlotsProps): SlotSearchReturn => {
  const INITIAL_DATE = new Date("2024-08-01");
  const [selectedDate, setSelectedDate] = useState<Date | null>(INITIAL_DATE);

  const { data, isFetching, isError, refetch, error } = useSlotQuery({
    date: selectedDate?.toISOString().split("T")[0],
    ...params,
  });

  return {
    selectedDate,
    setSelectedDate: (date: Date | null) => setSelectedDate(date),
    data,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export default useSlotSearch;
