import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate'; 

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch a random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithubUser(); // Replace with your API call
      setCandidate(data);
    } catch (err) {
      setError('Failed to fetch candidate');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate(); // Fetch candidate on component mount
  }, []);

  const handleSaveCandidate = () => {
    // Logic to save candidate to local storage or state
    console.log('Candidate saved:', candidate);
    fetchCandidate(); // Fetch next candidate
  };

  const handleSkipCandidate = () => {
    fetchCandidate(); // Fetch the next candidate without saving
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!candidate) return <p>No candidate available</p>;


return (
<div>
      <h1>Candidate Search</h1>
      <div>
        <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
        <h2>{candidate.name || candidate.login}</h2>
        <p>Location: {candidate.location || 'Not specified'}</p>
        <p>Company: {candidate.company || 'Not specified'}</p>
        <p>Email: {candidate.email || 'Not specified'}</p>
        <p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </p>
        <button onClick={handleSaveCandidate}>+</button>
        <button onClick={handleSkipCandidate}>-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
