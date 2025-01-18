interface ErrorMessageProps {
  onRefetch?: () => void;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  onRefetch,
  message = "An error occurred. Please try again.",
}) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffebee",
        border: "1px solid #ffcdd2",
        borderRadius: "4px",
        marginBottom: "20px",
      }}
    >
      <p style={{ color: "#c62828", margin: "0 0 10px 0" }}>{message}</p>
      {onRefetch && (
        <button
          onClick={onRefetch}
          style={{
            backgroundColor: "#c62828",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};
