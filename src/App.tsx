import './App.css'
import { useRef, useState } from 'react';
import Header from './components/header/Header';
import QuizStarter from './components/quiz-starter/QuizStarter';
import type { QuizT, QuizTopic } from './types';
import { quizzes } from './data/quiz.json'
import Quiz from './components/quiz/Quiz';
import QuizCompleted from './components/quiz-completed/QuizCompleted';

const App = () => {
  const [quiz, setQuiz] = useState<QuizT | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const correctAnswerCounter = useRef(0);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    if (quiz) selectQuizTopic(quiz.title);
  }

  const selectQuizTopic = (quizTopic: QuizTopic) => {
    const currentQuiz = quizzes.find(quiz => quiz.title === quizTopic);
    currentQuiz?.questions.sort(() => Math.random() - 0.5);
    setQuiz(currentQuiz as QuizT);
  }

  const resetApp = () => {
    setQuiz(undefined);
    setCurrentQuestionIndex(0);
    correctAnswerCounter.current = 0;
  }

  return (
    <>
      <Header quizTopic={quiz?.title} quizIcon={quiz?.icon || ''} />
      {
        quizFinished
          ? <QuizCompleted quizTopic={quiz?.title} correctAnswerCounter={correctAnswerCounter.current} quizIcon={quiz?.icon} resetQuiz={resetQuiz} />
          : quiz
            ? <Quiz quiz={quiz} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} correctAnswerCounter={correctAnswerCounter} setQuizFinished={setQuizFinished} resetApp={resetApp} />
            : <QuizStarter selectQuizTopic={selectQuizTopic} />}
    </>
  )


}

export default App;
