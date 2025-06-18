import { useEffect, useState} from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/utils/util';

const ThemeToggler = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)
    useEffect(() => {
        const darkMode = localStorage.getItem('theme');
        if (darkMode === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
        else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    }
  return (
    <button onClick={toggleTheme} className = {cn("fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300 hover:animate-lift-up", 
        "focus:outline-none"
    )}>
      { isDarkMode ?
        <Sun className="text-yellow-300" /> : <Moon className="text-gray-500"/>}
    </button>
  )
}

export default ThemeToggler
