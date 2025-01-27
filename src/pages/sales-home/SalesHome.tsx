import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import Header from "@/components/common/Header/Header";
import { useCancelSlot } from "@/hooks/slots/useCancelSlot";
import { useSlotSearch } from "@/hooks/slots/useSlotSearch";
import { lazy, Suspense, useEffect } from "react";
import { toast } from "react-toastify";
const ReservationsTable = lazy(
  () => import("@/components/features/ReservationsTable/ReservationsTable")
);

function SalesHome() {
  const { data, isFetching, isError, error, refetch } = useSlotSearch({
    isBooked: true,
  });

  const { cancelSlot, isCancelling } = useCancelSlot();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCancel = async (id: string) => {
    try {
      await cancelSlot({ id });
      toast.success("Reservation cancelled successfully");
      refetch();
    } catch (error) {
      toast.error("Error cancelling reservation");
      console.error("Error cancelling reservation:", error);
    }
  };

  if (isError) {
    return (
      <ErrorMessage message={(error as Error).message} onRefetch={refetch} />
    );
  }

  return (
    <div className="p-4">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">Loading...</div>
        }
      >
        <ReservationsTable
          data={data}
          isFetching={isFetching}
          onCancel={handleCancel}
          onRefresh={refetch}
          isCancelling={isCancelling}
        />
      </Suspense>
    </div>
  );
}

export default SalesHome;
