export const LoadingSpinner = () => {
  return (
    <div
      className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-current border-t-transparent text-white"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
