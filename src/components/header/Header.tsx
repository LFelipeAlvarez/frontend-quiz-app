import { useEffect, useRef } from 'react';
import { COLORS } from '../../consts';
import { QuizTopic } from '../../types';
import './header.css';

interface Props {
    quizTopic?: QuizTopic
    quizIcon: string
}

const Header = ({ quizTopic, quizIcon }: Props) => {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__item">
                    {quizTopic && <span className={`section__span square square--${COLORS[quizTopic as keyof typeof COLORS]}`}>
                        <img src={quizIcon} alt={quizTopic} className='square__icon' />
                    </span>}
                    {quizTopic}
                </div>
                <div className="header__item">
                    <ToggleThemeMode />
                </div>
            </div>
        </header>
    )
}


const ToggleThemeMode = () => {

    const toggleButtonRef = useRef<HTMLInputElement | null>(null);

    const handleChange = () => {
        const root = document.documentElement;
        const darkMode = localStorage.getItem("color-theme") === 'dark';
        if (darkMode) {
            root.classList.remove("dark-theme");
            localStorage.setItem("color-theme", 'light');

        } else {
            root.classList.add("dark-theme");
            localStorage.setItem("color-theme", 'dark');
        }
    }

    useEffect(() => {
        const isUserThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const root = document.documentElement;

        if (localStorage.getItem('color-theme') === null && isUserThemeDark) {
            if (toggleButtonRef.current) toggleButtonRef.current.checked = true;
            localStorage.setItem("color-theme", 'dark');
            root.classList.add("dark-theme");
            return;
        }

        const darkMode = localStorage.getItem("color-theme") === 'dark';
        if (darkMode) {
            if (toggleButtonRef.current) toggleButtonRef.current.checked = true;
            root.classList.add("dark-theme");
        }

    }, [])


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#626C7F" d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z" /></svg>
            <div className="wrap-toggle">
                <input onChange={handleChange} ref={toggleButtonRef} type="checkbox" name="toggle" id="toggle" className='checkbox' />
                <label htmlFor="toggle" className="switch"></label>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#626C7F" d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z" /></svg>
        </>
    )
}


export default Header