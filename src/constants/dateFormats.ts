export const DATE_FORMATS = {
  DATE_OPTIONS: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as const,

  TIME_OPTIONS: {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  } as const,

  LOCALE: {
    DATE: "en-US",
    TIME: "en-US",
  } as const,
} as const;
