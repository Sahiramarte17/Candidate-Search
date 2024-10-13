import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// Define the routes for your application
const router = createBrowserRouter([
  {
    path: '/', // Main application route
    element: <App />, // Main app component that includes the navigation
    errorElement: <ErrorPage />, // Fallback error page in case of broken routes
    children: [
      {
        index: true, // Default route: when visiting '/', show the CandidateSearch page
        element: <CandidateSearch />, // Renders the CandidateSearch component
      },
      {
        path: '/SavedCandidates', // Route for viewing saved candidates
        element: <SavedCandidates />, // Renders the SavedCandidates component
      },
    ],
  },
]);

// Get the root element from the HTML page
const rootElement = document.getElementById('root');

// Render the RouterProvider that manages the routing of your app
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

