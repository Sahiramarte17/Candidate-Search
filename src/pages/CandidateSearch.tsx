import { useState, useEffect } from "react";
import { getCandidateData } from "../api/API";

// Predefined list of GitHub usernames
// Predefined list of GitHub usernames
const randomUsernames = [
  "octocat",          // GitHub's mascot account
  "torvalds",         // Linus Torvalds, creator of Linux
  "gaearon",          // Dan Abramov, co-creator of Redux
  "addyosmani",       // Addy Osmani, Google Chrome team
  "yyx990803",        // Evan You, creator of Vue.js
  "kentcdodds",       // Kent C. Dodds, React educator
  "sindresorhus",     // Sindre Sorhus, prolific open source contributor
  "jaredpalmer",      // Jared Palmer, creator of Formik
  "tj",               // TJ Holowaychuk, Node.js developer
  "bradtraversy",     // Brad Traversy, developer educator
  "getify",           // Kyle Simpson, author of "You Don't Know JS"
  "sdras",            // Sarah Drasner, Vue.js core team
  "paulirish",        // Paul Irish, Google Chrome developer advocate
  "substack",         // James Halliday, prolific open source developer
  "rachelnabors",     // Rachel Nabors, web animation expert
  "mjackson",         // Michael Jackson, co-creator of React Router
  "rauchg",           // Guillermo Rauch, creator of Next.js
  "mxstbr",           // Max Stoiber, creator of styled-components
  "timneutkens",      // Tim Neutkens, lead developer of Next.js
  "sebmck",           // Sebastian McKenzie, creator of Babel
  "davidwalshblog",   // David Walsh, Mozilla developer advocate
  "LeaVerou",         // Lea Verou, CSS expert
  "beep",             // Leah Culver, developer and writer
  "igrigorik",        // Ilya Grigorik, web performance expert
  "chriscoyier",      // Chris Coyier, creator of CSS-Tricks
  "jensimmons"        // Jen Simmons, Mozilla developer advocate
];





// Function to get a random username from the list
const getRandomUsername = (usernames: string[]) => {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  return usernames[randomIndex];
};

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch candidate data based on a randomly selected username
  const fetchCandidate = async (username: string) => {
    setLoading(true);
    setError(null); // Clear previous errors before starting a new request
    try {
      const data = await getCandidateData(username);
      if (data) {
        setCandidate(data);
      } else {
        setError("No data found for this candidate.");
      }
    } catch (err) {
      setError("Error fetching candidate data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random candidate when the component first mounts
  useEffect(() => {
    const initialUsername = getRandomUsername(randomUsernames);
    fetchCandidate(initialUsername);
  }, []);

  // Save the candidate to localStorage
  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      localStorage.setItem("savedCandidates", JSON.stringify([...savedCandidates, candidate]));

      // Fetch a new random candidate after saving
      const nextUsername = getRandomUsername(randomUsernames);
      fetchCandidate(nextUsername);
    }
  };

  // Skip to the next candidate
  const skipCandidate = () => {
    const nextUsername = getRandomUsername(randomUsernames);
    fetchCandidate(nextUsername);
  };

  // If data is loading, show a loading message
  if (loading) return <p>Loading...</p>;

  // If an error occurs, show an error message
  if (error) return <p>{error}</p>;

  // Render the candidate's information if available, otherwise show a message
  return candidate ? (
    <div>
      <img src={candidate.avatar_url} alt={`${candidate.name || "User"}'s avatar`} />
      <h2>{candidate.name || "Name not available"}</h2>
      <p>Username: {candidate.login || "Username not available"}</p>
      <p>Location: {candidate.location || "Location not available"}</p>
      <p>Email: {candidate.email || "Email not available"}</p>
      <p>Company: {candidate.company || "Company not available"}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>

      <button onClick={saveCandidate}>+ Save</button>
      <button onClick={skipCandidate}>- Skip</button>
    </div>
  ) : (
    <p>No candidate available.</p>
  );
};

export default CandidateSearch;


