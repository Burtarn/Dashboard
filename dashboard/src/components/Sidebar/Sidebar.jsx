import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUsers,
    FaCog,
    FaChartBar,
    FaQuestionCircle,
    FaChevronDown,
    FaUser,
    FaSignOutAlt
    } from 'react-icons/fa';
    import { useAuth } from '../../hooks/useAuth';
    import '../../components/Sidebar/Sidebar.css'

    const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeSidebar();
        navigate('/');
    };

    return (
        <div>

        <button onClick={toggleSidebar} className="toggle-button">
            {isOpen ? 'Stäng' : 'Öppna'} Meny
        </button>

        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeSidebar}>✖</button>
            {isOpen && <h2 className="company-name">Dashboard</h2>}
            <ul>
            <li><Link to="/home" onClick={closeSidebar}><FaHome /> Hem</Link></li>
            <li><Link to="/users" onClick={closeSidebar}><FaUsers /> Användare</Link></li>
            <li><Link to="/settings" onClick={closeSidebar}><FaCog /> Inställningar</Link></li>
            <li><Link to="/statistics" onClick={closeSidebar}><FaChartBar /> Statistik</Link></li>
            <li>
                <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logga ut
                </button>
            </li>
            </ul>
            {!isOpen && (
            <div className="toggle-arrow" onClick={toggleSidebar}>
                <FaChevronDown />
            </div>
            )}
        </div>


        <div className={`sidebar-icons ${isOpen ? 'hidden' : ''}`}>
            <Link to="/home" onClick={closeSidebar}><FaHome /></Link>
            <Link to="/users" onClick={closeSidebar}><FaUsers /></Link>
            <Link to="/settings" onClick={closeSidebar}><FaCog /></Link>
            <Link to="/statistics" onClick={closeSidebar}><FaChartBar /></Link>
            <div onClick={handleLogout}><FaSignOutAlt /></div>
        </div>
        </div>
    );
};

export default Sidebar;
