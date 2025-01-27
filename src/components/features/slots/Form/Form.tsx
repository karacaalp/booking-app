import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({
  selectedDate,
  setSelectedDate,
  onSearch,
  isLoading,
}) => {
  const [error, setError] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setError("");
    if (!date) {
      setError("Please select a date");
    }
    setSelectedDate(
      date
        ? new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          )
        : null
    );
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          showIcon
          isClearable
          className={error ? "error-input" : ""}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <button
          onClick={onSearch}
          style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
          disabled={isLoading || !!error || !selectedDate}
          aria-label={isLoading ? "Searching" : "Search"}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Form;
