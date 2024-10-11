// src/components/SaveButton.tsx
import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Save</button>;
};

export default SaveButton;
