// src/components/SavedCandidates.tsx
import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  return savedCandidates.length > 0 ? (
    <div>
      {savedCandidates.map((candidate: any, index: number) => (
        <div key={index}>
          <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
        </div>
      ))}
    </div>
  ) : (
    <p>No saved candidates yet.</p>
  );
};

export default SavedCandidates;
