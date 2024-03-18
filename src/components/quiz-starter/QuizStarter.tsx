import './quiz-starter.css';
import { quizzes } from '../../data/quiz.json'
import { QuizTopic } from '../../types';
import { COLORS } from '../../consts';

interface Props {
    selectQuizTopic: (quizTopic: QuizTopic) => void
}

const QuizStarter = ({ selectQuizTopic }: Props) => {

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const currentQuizTopic = e.currentTarget.textContent?.trim() as QuizTopic;
        selectQuizTopic(currentQuizTopic)
    }

    return (
        <main className='main'>
            <div className="main__inner">
                <section className="section">
                    <div className="section__col">
                        <h1 className="section__title">
                            Welcome to the <span>Frontend Quiz!</span>
                        </h1>
                        <h2 className='section__subtitle'>
                            Pick a subject to get started.
                        </h2>
                    </div>

                    <div className="section__col">
                        <ul className="section__list">
                            {quizzes.map(({ title, icon }) => <li key={title} className='section__item' onClick={handleClick}>
                                <span className={`section__span square square--${COLORS[title as keyof typeof COLORS]}`}>
                                    <img className='square__icon' src={icon} alt={title} />
                                </span>
                                <span className="section__text">
                                    {title}
                                </span>
                            </li>)}
                        </ul>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default QuizStarter