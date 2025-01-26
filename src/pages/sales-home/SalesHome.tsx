import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import Header from "@/components/common/Header/Header";
import { useSlotSearch } from "@/hooks/slots/useSlotSearch";
import { slotsApi } from "@/services/api/SlotsApi";
import { lazy, Suspense, useEffect } from "react";
const ReservationsTable = lazy(
  () => import("@/components/features/ReservationsTable/ReservationsTable")
);

function SalesHome() {
  const { data, isFetching, isError, error, refetch } = useSlotSearch({
    isBooked: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCancel = async (id: string) => {
    try {
      await slotsApi.cancelSlotById(id);
      refetch();
    } catch (error) {
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
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationsTable
          data={data}
          isFetching={isFetching}
          onCancel={handleCancel}
          onRefresh={refetch}
        />
      </Suspense>
    </div>
  );
}

export default SalesHome;
