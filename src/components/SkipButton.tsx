// src/components/SkipButton.tsx
import React from 'react';

interface SkipButtonProps {
  onClick: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Skip</button>;
};

export default SkipButton;
