// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  name: string | null;       // Candidate's full name (can be null)
  username: string;          // GitHub username (required)
  location: string | null;   // Candidate's location (can be null)
  avatar_url: string;        // URL of the candidate's avatar (required)
  email: string | null;      // Candidate's email (can be null)
  html_url: string;          // GitHub profile URL (required)
  company: string | null;    // Candidate's company (can be null)
}

// Instead of default export, use named export
// export default Candidate; // Remove this line
