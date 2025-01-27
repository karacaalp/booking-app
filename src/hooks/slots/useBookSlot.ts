import { slotsApi } from "@/services/api/SlotsApi";
import { useMutation } from "@tanstack/react-query";

export const useBookSlot = () => {
  const mutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => {
      if (!id || !name) throw new Error("Missing id or name");
      return slotsApi.bookSlotById(id, name);
    },
  });

  return {
    bookSlot: mutation.mutateAsync,
    isBooking: mutation.isPending,
  };
};
