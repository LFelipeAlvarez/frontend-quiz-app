import { useEffect, useRef, useState } from 'react';
import './progress-bar.css'

interface ProgressBarProps {
    duration: number; // Duration in seconds
    currentQuestionIndex: number
    isCorrect: boolean | undefined
    onTimeUp: () => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onTimeUp, currentQuestionIndex, isCorrect }) => {

    const intervalRef = useRef(0);
    const timeOutId = useRef(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Interval increases width progressElement
        if (currentQuestionIndex !== 0) setProgress(0);
        intervalRef.current = setInterval(() => {
            setProgress(counter => counter + 1);
        }, 1000);

        //When the time is up 
        timeOutId.current = setTimeout(onTimeUp, (duration + 1) * 1000);

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeOutId.current);
        }

    }, [currentQuestionIndex]);

    //If there's an option submited or the width is 100%
    if (progress === duration || isCorrect !== undefined) clearInterval(intervalRef.current);
    //If there's an option submited
    if (isCorrect !== undefined) clearTimeout(timeOutId.current);


    return (
        <div className='progress-bar'>
            <div className='progress-bar__progress' style={{
                width: `${(progress * 100) / duration}%`
            }} ></div>
        </div>
    );
};

export default ProgressBar;