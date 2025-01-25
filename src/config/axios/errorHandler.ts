export const handleApiError = (e: unknown, operation: string) => {
  console.error(`Error during ${operation}:`, e);
  throw e instanceof Error ? e : new Error(`Unknown error during ${operation}`);
};
