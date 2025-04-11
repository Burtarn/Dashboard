
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../hooks/useAuth';

    const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate('/home'); 
    };

    return (
        <div>
        <h2>Login</h2>
        <button onClick={handleLogin}>Logga in</button>
        </div>
    );
    };

    export default Login;
