import { DATE_FORMATS } from "@/constants/dateFormats";
import { ISlot } from "@/types/slots";
import { Table } from "react-bootstrap";

interface ReservationsTableProps {
  data: ISlot[] | undefined;
  isFetching: boolean;
  onCancel: (id: string) => void;
  onRefresh: () => void;
}

function ReservationsTable({
  data,
  isFetching,
  onCancel,
  onRefresh,
}: ReservationsTableProps) {
  const handleCancelClick = (slotId: string) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      onCancel(slotId);
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>Reservations</h2>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={onRefresh}
          disabled={isFetching}
        >
          Refresh
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((slot) => (
            <tr key={slot.id}>
              <td>
                {new Date(slot.startDate).toLocaleDateString(
                  DATE_FORMATS.LOCALE.DATE,
                  {
                    ...DATE_FORMATS.DATE_OPTIONS,
                    ...DATE_FORMATS.TIME_OPTIONS,
                  }
                )}
              </td>
              <td>{slot.bookedCustomerName}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelClick(slot.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!isFetching && !data?.length && (
        <div className="text-center mt-4">No reservations found.</div>
      )}
    </>
  );
}

export default ReservationsTable;
