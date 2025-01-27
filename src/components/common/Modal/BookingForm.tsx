import React, { useState } from "react";

interface BookingFormProps {
  bookedCustomerName?: string;
  formattedDate: string;
  formattedTime: string;
  isBooked: boolean | undefined;
  isCancelling: boolean;
  isBooking: boolean;
  onBook: (name: string) => void;
  onCancel: () => void;
  onClose: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  bookedCustomerName,
  formattedDate,
  formattedTime,
  isBooked,
  isCancelling,
  isBooking,
  onBook,
  onCancel,
  onClose,
}) => {
  const [name, setName] = useState<string>(bookedCustomerName || "");

  const handleCancelBooking = () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      onCancel();
    }
  };

  return (
    <div>
      <div>
        Your Name: &nbsp;
        {isBooked ? (
          <span style={{ margin: "10px 0", display: "inline-block" }}>
            {bookedCustomerName}
          </span>
        ) : (
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "10px 0", padding: "5px" }}
          />
        )}
      </div>
      <p>Date: {formattedDate}</p>
      <p>Time: {formattedTime}</p>
      <p>Duration: 60 minutes</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <button style={{ marginRight: "15px" }} onClick={onClose}>
          Cancel
        </button>
        {isBooked ? (
          <button
            onClick={handleCancelBooking}
            style={{
              backgroundColor: isCancelling ? "#d3d3d3" : "red",
              color: "#fff",
            }}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        ) : (
          <button
            onClick={() => onBook(name)}
            style={{
              backgroundColor: isBooking ? "#d3d3d3" : "#007bff",
              color: "#fff",
            }}
            disabled={isBooking}
          >
            {isBooking ? "Booking..." : "Book"}
          </button>
        )}
      </div>
    </div>
  );
};
