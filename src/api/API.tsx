const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Search for random GitHub users (e.g., candidates)
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    const response = await fetch(`${GITHUB_API_URL}/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response. Check the network tab.");
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (err) {
    console.error("An error occurred while fetching GitHub users:", err);
    return [];
  }
};

// Search for a specific GitHub user by username
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response. Check the network tab.");
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (err) {
    console.error(`An error occurred while fetching the GitHub user "${username}":`, err);
    return {};
  }
};

// Get detailed candidate data by username (alternative approach)
const getCandidateData = async (username: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response. Check the network tab.");
    }

    const data = await response.json();
    console.log("Candidate Data:", data);
    return data;
  } catch (err) {
    console.error(`An error occurred while fetching candidate data for "${username}":`, err);
    return {};
  }
};

export { searchGithub, searchGithubUser, getCandidateData };
