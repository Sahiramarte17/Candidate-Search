import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface'; 
import EmptyState from '../components/EmptyState';
import CandidateCard from '../components/CandidateCard';
import Loader from '../components/Loader';


const CandidateSearch = () => {
  const [dataset, setDataset] = useState<Candidate[]>([])
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch a random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const data = await searchGithub(); // Replace with your API call
      setDataset(data);
      chooseCandidateFromArray();
    } catch (err) {
      setError('Failed to fetch candidate');
    } finally {
      setLoading(false);
     
    }
  };

  useEffect(() => {
    fetchCandidate(); // Fetch candidate on component mount
  }, []);


  const chooseCandidateFromArray = () => {
    const index = Math.floor(Math.random() * dataset.length) + 1;
    const selectedCadidate = dataset[index];
   fetchNextCandidate(selectedCadidate.username);
  };

  const fetchNextCandidate = async (username: string) => {
    const nextCandidate = await searchGithubUser(username);
    setCandidate(nextCandidate);
  };

  const handleSaveCandidate = () => {
    // Logic to save candidate to local storage or state
    console.log('Candidate saved:', candidate);
    fetchCandidate(); // Fetch next candidate
  };

  const handleSkipCandidate = () => {
    fetchCandidate(); // Fetch the next candidate without saving
  };

  if (loading) return <Loader/>;
  if (error) return <EmptyState message={error} />;
  if (!candidate) return <EmptyState message="No candidate available" />;


return (
  <div>
  <h1>Candidate Search</h1>
  <CandidateCard candidate={candidate} onSave={handleSaveCandidate} onSkip={handleSkipCandidate} />
</div>
);
};

export default CandidateSearch;
