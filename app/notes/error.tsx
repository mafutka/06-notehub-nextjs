"use client"
import React from 'react';

export default function Error({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <p>Could not fetch the list of notes. {error.message}</p>
    
  );
}