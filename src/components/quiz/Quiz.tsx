import React, { useState } from 'react'
import { Question, QuizT } from '../../types'
import './quiz.css'
import ProgressBar from '../progress-bar/ProgressBar'
// @ts-ignore
import confetti from 'canvas-confetti';

interface QuizProps {
    quiz: QuizT
    currentQuestionIndex: number
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    correctAnswerCounter: React.MutableRefObject<number>
    setQuizFinished: React.Dispatch<React.SetStateAction<boolean>>
    resetApp: () => void

}

interface AnswerProps {
    id: number
    answer: string | null
    selectOption: (id: AnswerProps['answer']) => void
    optionSelected: AnswerProps['answer'] | undefined
    isCorrect: boolean | undefined
    currentQuestion: Question
}

const answers = ['A', 'B', 'C', 'D'];

const Quiz = ({ quiz, currentQuestionIndex, setCurrentQuestionIndex, correctAnswerCounter, setQuizFinished, resetApp }: QuizProps) => {
    const [optionSelected, setOptionSelected] = useState<string | undefined | null>(undefined);
    const [isCorrect, setIsCorrect] = useState<AnswerProps['isCorrect']>(undefined);
    const [warning, setWarning] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const questionsLength = quiz.questions.length;

    const nextQuestion = () => {
        const newQuestionIndex = currentQuestionIndex + 1;
        if (newQuestionIndex < questionsLength) {
            setCurrentQuestionIndex(newQuestionIndex);
            setOptionSelected(undefined);
            setIsCorrect(undefined);
        } else {
            setQuizFinished(true);
            if (correctAnswerCounter.current === questionsLength) confetti();
        }

    }

    const submitAnswer = () => {
        if (optionSelected === undefined) {
            setWarning(true);
            return
        }
        if (currentQuestion.answer === optionSelected) {
            setIsCorrect(true);
            correctAnswerCounter.current++;
        } else setIsCorrect(false);
    }

    const selectOption = (answer: AnswerProps['answer']) => {
        setWarning(false);
        setOptionSelected(answer);
    }

    const onTimeUp = () => {
        setOptionSelected(null);
    }

    const isTheLastQuestion = currentQuestionIndex + 1 === questionsLength;

    return (
        <main className='main'>
            <div className="main__inner">
                <section className="section">
                    <div className="section__col">
                        <button className="go-back" onClick={() => resetApp()}>⬅</button>
                        <h1 className="section__subtitle">
                            Question {currentQuestionIndex + 1} of {questionsLength}
                        </h1>
                        <h2 className='section__title section__title--smaller'>
                            {currentQuestion.question}
                        </h2>
                        <div className="progress-bar-container">
                            <ProgressBar isCorrect={isCorrect} onTimeUp={onTimeUp} duration={15} currentQuestionIndex={currentQuestionIndex} />
                        </div>

                    </div>
                    <div className="section__col">
                        <ul className="section__list">
                            {currentQuestion.options.map((option, index) => <Answer key={index} id={index} answer={option} selectOption={selectOption} optionSelected={optionSelected} isCorrect={isCorrect} currentQuestion={currentQuestion} />)}
                        </ul>
                        <div className="button-wrapper">
                            {
                                isCorrect !== undefined || optionSelected === null
                                    ? <button className='button' onClick={nextQuestion}>{isTheLastQuestion ? 'View Results' : 'Next Question'}</button>
                                    : <button className='button' onClick={submitAnswer}>Submit Answer</button>
                            }

                            <div className={`warning ${warning && 'warning--visible'}`}>Please select an answer</div>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    )
}



const Answer = ({ id, answer, selectOption, optionSelected, isCorrect, currentQuestion }: AnswerProps) => {

    let className = '';
    if (answer === optionSelected) className = ' section__item--active';
    if (isCorrect !== undefined && answer === currentQuestion.answer || (answer === currentQuestion.answer && optionSelected === null))
        className = ' section__item--correct-answer';
    if (answer === optionSelected && isCorrect === true) className = ' section__item--correctly';
    if (answer === optionSelected && isCorrect === false) className = ' section__item--incorrectly';
    if (isCorrect !== undefined || optionSelected === null) className += ' section__item--disabled';

    return (
        <li onClick={() => selectOption(answer)} className={`section__item--answer${className}`}>
            <span className="square">
                {answers[id]}
            </span>
            <span className="section__text">
                {answer}
            </span>
        </li>
    )
}


export default Quiz