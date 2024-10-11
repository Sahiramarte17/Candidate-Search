// src/components/CandidateCard.tsx
import React from 'react';
import SaveButton from './SaveButton';
import SkipButton from './SkipButton';
import Candidate from '../interfaces/Candidate.interface'; // Adjust the import

interface CandidateCardProps {
  candidate: Candidate;
  onSave?: () => void;
  onSkip?: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onSave, onSkip }) => {
  return (
    <div className="candidate-card">
      <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="150" />
      <h2>{candidate.name}</h2>
      <p>Location: {candidate.location}</p>
      <p>Company: {candidate.company || 'N/A'}</p>
      <p>Email: {candidate.email || 'N/A'}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
      {onSave && onSkip && (
        <div className="candidate-actions">
          <SaveButton onClick={onSave} />
          <SkipButton onClick={onSkip} />
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
