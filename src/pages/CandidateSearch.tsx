import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface'; 
import EmptyState from '../components/EmptyState';
import CandidateCard from '../components/CandidateCard';
import Loader from '../components/Loader';


const CandidateSearch = () => {
  const [dataset, setDataset] = useState<Candidate[]>([])
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  console.log(dataset)
  // Function to fetch a random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const data: Candidate[] = await searchGithub(); // Replace with your API call

      console.log("data from api :" , data)
      setDataset(data);
      console.log("updated dataset", dataset);
      console.log("going into chooseCanditdateFromArray function")
      
      console.log("after choose Candidate")
    } catch (err) {
      console.log(err)
      setError('Failed to fetch candidate');

    } finally {
      setLoading(false);
     
    }
    
  };

  useEffect(() => {
    if (dataset.length) {
      chooseCandidateFromArray();
    }
    
  }, [dataset])


  useEffect(() => {
    console.log("starting page");
    fetchCandidate(); // Fetch candidate on component mount
    console.log("after api call");
  }, []);


  const chooseCandidateFromArray = () => {
    const index = Math.floor(Math.random() * dataset.length) + 1;
    console.log("data set : ", dataset);
    console.log("checking index to get random candidate :", index);
    const selectedCandidate = dataset[index];
   fetchNextCandidate(selectedCandidate.username);
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
