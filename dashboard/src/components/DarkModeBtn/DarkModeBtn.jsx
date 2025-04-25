import { useTheme } from '../../context/ThemeContext'
import '../../components/DarkModeBtn/DarkModeBtn.css'

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button className='darkModeBtn' onClick={toggleTheme}>
        {darkMode ? "☀️ Ljus" : "🌙 Mörk"}
        </button>
    );
};

export default ThemeToggle;
