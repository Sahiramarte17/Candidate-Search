// src/components/EmptyState.tsx
import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default EmptyState;
