import { tailChase } from "ldrs";
tailChase.register();

interface PageSectionProps {
  isLoading: boolean;
}

export default function LoadingComponent({ isLoading }: PageSectionProps) {
  const renderLoadingState = () => {
    if (isLoading) {
      return (
        <div className="flex h-screen">
          <l-tail-chase size="100" speed="1.75" color="black"></l-tail-chase>{" "}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {renderLoadingState()}
    </div>
  );
}
