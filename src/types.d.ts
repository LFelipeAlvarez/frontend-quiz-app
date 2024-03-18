export type QuizTopic = 'HTML' | 'CSS' | 'JavaScript' | 'Accessibility'

export interface Question {
    answer: string
    options: string[]
    question: string
}

export interface QuizT {
    icon: string
    questions: Question[]
    title: QuizTopic
}




