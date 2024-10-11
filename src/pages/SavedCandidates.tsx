import { useEffect, useState } from 'react';
import SaveCandidateList from '../components/SavedCandidatesList';
import EmptyState from '../components/EmptyState';
import Candidate from '../interfaces/Candidate.interface'; // Adjust the import based on your project structure

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  return (
    <div>
    <h1>Saved Candidates</h1>
    {savedCandidates.length === 0 ? (
      <EmptyState message="No saved candidates yet." />
    ) : (
      <SaveCandidateList savedCandidates={savedCandidates} />
    )}
  </div>
);
};

export default SavedCandidates;
