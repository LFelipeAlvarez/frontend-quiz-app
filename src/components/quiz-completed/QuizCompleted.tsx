import './quiz-completed.css';
import { QuizTopic } from '../../types'
import { COLORS } from '../../consts'

interface Props {
    correctAnswerCounter: number
    quizTopic: QuizTopic | undefined
    quizIcon: string | undefined
    resetQuiz: () => void

}


const QuizCompleted = ({ correctAnswerCounter, quizTopic, quizIcon, resetQuiz }: Props) => {
    return (
        <main className='main'>
            <div className="main__inner">
                <section className="section">
                    <div className="section__col">
                        <h1 className="section__title">
                            Quiz completed
                            <span>You scored...</span>
                        </h1>
                    </div>

                    <div className="section__col">
                        <article className="card">
                            <h2 className='card__title header__item'>
                                <span className={`square square--${COLORS[quizTopic as keyof typeof COLORS]}`}>
                                    <img src={quizIcon} alt={quizTopic} className="square__icon" />
                                </span>

                                {quizTopic}

                            </h2>
                            <main className='card__text-large'>{correctAnswerCounter}</main>
                            <footer className='card__text'>out of 10</footer>
                        </article>
                        <button onClick={resetQuiz} className="button">Play Again</button>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default QuizCompleted