import React from 'react'
import '../styles/Settings.css';
import ThemeToggle from '../components/DarkModeBtn/DarkModeBtn';

const Settings = () => {
  return (
    <div>
        <h1 className='settings-container'>Settings</h1>
        < ThemeToggle />

    </div>
  )
}

export default Settings