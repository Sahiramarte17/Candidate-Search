import { Outlet } from 'react-router-dom';
import Nav from './components/Nav'; // Navigation component

function App() {
  return (
    <>
      {/* Render the navigation bar */}
      <Nav />

      {/* Main content section where the current route's component will be rendered */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

