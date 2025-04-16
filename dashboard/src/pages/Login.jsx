import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const user = await response.json();
            if (user.role === 'admin') {
                navigate('/users');
            } else {
                navigate('/home');
            }
        } else {
            setMsg('Felaktigt användarnamn eller lösenord.')
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Logga in</h2>
                <div>
                    <label>Användarnamn:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lösenord:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className='error-msg'>{msg}</p>
                <button className='submitBtn' type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;
