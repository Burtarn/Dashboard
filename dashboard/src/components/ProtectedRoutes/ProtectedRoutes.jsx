import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    // Kollar autentisering på backend (cookies hanteras automatiskt med 'credentials: include')
    fetch('http://localhost:3000/check-auth', {
      credentials: 'include',  // Viktigt för att skicka cookies
    })
      .then(res => res.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));  // Sätt till false om nätverksfel
  }, []);

  // Visa laddningsindikator tills autentisering är klart
  if (authenticated === null) return <div>Laddar...</div>;

  // Om användaren inte är autentiserad, skicka till login
  if (!authenticated) return <Navigate to="/" replace />;

  // Om autentiserad, rendera barnkomponenterna
  return children;
};

export default ProtectedRoute;
