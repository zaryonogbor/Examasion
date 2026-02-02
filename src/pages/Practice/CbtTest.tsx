import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import styles from './Test.module.css';

type QuestionType = 'mcq' | 'tf' | 'short' | 'essay';

interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[];
    correctAnswer?: number | string | boolean;
    points: number;
}

const mockQuestions: Question[] = [
    {
        id: '1',
        type: 'mcq',
        text: 'In the context of Cognitive Psychology, which process refers to the mental act of transforming sensory input into a usable mental representation?',
        options: [
            'Retrieval',
            'Encoding',
            'Storage',
            'Sensation'
        ],
        correctAnswer: 1,
        points: 5
    },
    {
        id: '2',
        type: 'tf',
        text: 'Neuroplasticity is the brain\'s ability to reorganize itself by forming new neural connections throughout life.',
        correctAnswer: true,
        points: 2
    },
    {
        id: '3',
        type: 'short',
        text: 'What is the term for the gap between two neurons where chemical signals are transmitted?',
        correctAnswer: 'Synapse',
        points: 5
    },
    {
        id: '4',
        type: 'essay',
        text: 'Discuss the impact of sleep deprivation on cognitive performance and emotional regulation. Provide at least two specific examples of how missing sleep affects the prefrontal cortex.',
        points: 20
    }
];

export const CbtTest = () => {
    const navigate = useNavigate();
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes for a multi-format test

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (value: any) => {
        setAnswers({ ...answers, [currentQuestionIdx]: value });
    };

    const handleNext = () => {
        if (currentQuestionIdx < mockQuestions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            // Submit logic
            navigate('/results/1');
        }
    };

    const currentQ = mockQuestions[currentQuestionIdx];

    const renderQuestionContent = () => {
        const currentAnswer = answers[currentQuestionIdx];

        switch (currentQ.type) {
            case 'mcq':
                return (
                    <div className={styles.options}>
                        {currentQ.options?.map((option, idx) => (
                            <div
                                key={idx}
                                className={`${styles.option} ${currentAnswer === idx ? styles.optionSelected : ''}`}
                                onClick={() => handleAnswer(idx)}
                            >
                                <input
                                    type="radio"
                                    checked={currentAnswer === idx}
                                    className={styles.radio}
                                    readOnly
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                );
            case 'tf':
                return (
                    <div className={styles.tfOptions}>
                        <div
                            className={`${styles.tfOption} ${currentAnswer === true ? styles.tfOptionSelected : ''}`}
                            onClick={() => handleAnswer(true)}
                        >
                            <input type="radio" checked={currentAnswer === true} readOnly className={styles.radio} />
                            True
                        </div>
                        <div
                            className={`${styles.tfOption} ${currentAnswer === false ? styles.tfOptionSelected : ''}`}
                            onClick={() => handleAnswer(false)}
                        >
                            <input type="radio" checked={currentAnswer === false} readOnly className={styles.radio} />
                            False
                        </div>
                    </div>
                );
            case 'short':
                return (
                    <input
                        type="text"
                        className={styles.textInput}
                        placeholder="Type your answer here..."
                        value={currentAnswer || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                    />
                );
            case 'essay':
                return (
                    <textarea
                        className={styles.textArea}
                        placeholder="Type your detailed response here..."
                        value={currentAnswer || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                    />
                );
            default:
                return null;
        }
    };

    const getQuestionTypeName = (type: QuestionType) => {
        switch (type) {
            case 'mcq': return 'Multiple Choice';
            case 'tf': return 'True / False';
            case 'short': return 'Short Answer';
            case 'essay': return 'Essay Type';
            default: return 'Question';
        }
    };

    return (
        <div className={styles.testContainer}>
            <div className={styles.header}>
                <div>Question {currentQuestionIdx + 1} of {mockQuestions.length}</div>
                <div className={styles.timer}>{formatTime(timeLeft)}</div>
            </div>

            <div className={styles.questionCard}>
                <div className={styles.questionMeta}>
                    {getQuestionTypeName(currentQ.type)} • {currentQ.points} Points
                </div>
                <div className={styles.questionText}>{currentQ.text}</div>

                {renderQuestionContent()}
            </div>

            <div className={styles.footer}>
                <Button
                    variant="secondary"
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                >
                    Previous
                </Button>
                <div className={styles.navigation}>
                    <Button onClick={handleNext}>
                        {currentQuestionIdx === mockQuestions.length - 1 ? 'Submit Test' : 'Next Question'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
