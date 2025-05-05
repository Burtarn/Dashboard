import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './context/ThemeContext';  // Importera ThemeProvider
import AppRoutes from './pages/routes/AppRoutes';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>  
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
