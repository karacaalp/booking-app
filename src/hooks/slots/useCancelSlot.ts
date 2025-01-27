import { slotsApi } from "@/services/api/SlotsApi";
import { useMutation } from "@tanstack/react-query";

export const useCancelSlot = () => {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      if (!id) throw new Error("Missing id");
      return slotsApi.cancelSlotById(id);
    },
  });

  return {
    cancelSlot: mutation.mutateAsync,
    isCancelling: mutation.isPending,
  };
};
