"use client";

export type ErrorProps = {
    error: Error; 
    reset: () => void
}

export default function NotesError({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}