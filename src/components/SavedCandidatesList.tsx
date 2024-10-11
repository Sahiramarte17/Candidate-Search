// src/components/SaveCandidateList.tsx
import React from 'react';
import CandidateCard from './CandidateCard';
import Candidate from '../interfaces/Candidate.interface'; // Adjust the import

interface SaveCandidateListProps {
  savedCandidates: Candidate[];
}

const SaveCandidateList: React.FC<SaveCandidateListProps> = ({ savedCandidates }) => {
  return (
    <div>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SaveCandidateList;
