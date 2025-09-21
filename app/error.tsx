'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container text-center">
        <div className="card max-w-md mx-auto">
          <h2 className="text-heading text-foreground mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-body text-foreground/80 mb-6">
            We encountered an error while loading VibeFindr. Please try again.
          </p>
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
