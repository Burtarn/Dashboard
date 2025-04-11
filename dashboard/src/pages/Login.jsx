import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',  // Viktigt för att skicka cookies
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const user = await response.json();
            // Vi lagrar inte användardata här, sessionen hanteras av backend
            if (user.role === 'admin') {
                navigate('/users');
            } else {
                navigate('/home');
            }
        } else {
            alert('Inloggning misslyckades');
        }
    };

    return (
        <div>
            <h2>Logga in</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;
