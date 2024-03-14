


import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        console.log('Is Dark Mode:', isDarkMode);

        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div>
            <button
                onClick={toggleDarkMode}
                className={`px-2 py-1 rounded-full text-black ${darkMode ? 'bg-gray-200 dark:bg-yellow-500' : 'bg-gray-200'
                    } transition-colors duration-200 flex items-center`}
            >
                {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            </button>
        </div>
    );
};

export default ThemeSwitcher;

