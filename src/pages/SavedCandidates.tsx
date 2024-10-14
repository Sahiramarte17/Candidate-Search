import { useState, useEffect } from "react";


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  // Function to remove a candidate by index
  const removeCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return savedCandidates.length > 0 ? (
    <div className="saved-candidates-container">
      {savedCandidates.map((candidate, index) => (
        <div key={index} className="candidate-card">
          <img
            src={candidate.avatar_url}
            alt={`${candidate.name || candidate.login}'s avatar`}
            className="avatar"
          />
          <h2>{candidate.name || "Name not available"}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || "Location not available"}</p>
          <p>Email: {candidate.email || "Email not available"}</p>
          <p>Company: {candidate.company || "Company not available"}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <br />
          <button onClick={() => removeCandidate(index)} className="remove-button">
            Remove
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p>No saved candidates yet.</p>
  );
};

export default SavedCandidates;

