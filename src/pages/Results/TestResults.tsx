import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import styles from './Results.module.css';

export const TestResults = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.scoreCard}>
                <div className={styles.scoreCardContent}>
                    <div className={styles.scoreBox}>
                        <div className={styles.scoreValue}>80%</div>
                        <div className={styles.scoreLabel}>Accuracy</div>
                    </div>

                    <div className={styles.scoreInfo}>
                        <h2>Performance Summary</h2>
                        <p>Incredible progress! You've mastered the core concepts of this material. Continue at this pace to guarantee exam success.</p>

                        <div className={styles.scoreActions}>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/dashboard')}
                                leftIcon={<ArrowLeft size={18} />}
                                className={styles.dashboardBtn}
                            >
                                Dashboard
                            </Button>
                            <Button
                                onClick={() => navigate('/practice')}
                                className={styles.retakeBtn}
                                leftIcon={<RotateCcw size={18} />}
                            >
                                Retake session
                            </Button>
                            <Button
                                onClick={() => navigate('/documents')}
                                className={styles.nextBtn}
                                rightIcon={<ArrowRight size={18} />}
                            >
                                Explore More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.reviewSection}>
                <h2 className="sectionTitle">Analysis & Explanations</h2>

                <div className={styles.reviewItem}>
                    <div className={styles.questionHeader}>
                        <div className={`${styles.indicator} ${styles.indicatorCorrect}`}>Correct</div>
                        <div className={styles.questionText}>
                            Which of the following best describes the "Structuralist" school of psychology?
                        </div>
                    </div>
                    <div className={styles.answerRow}>
                        <div><span className={styles.answerLabel}>Your Choice:</span> Analyzes consciousness into its basic elements</div>
                    </div>
                    <div className={styles.explanation}>
                        <div className={styles.explanationTitle}>AI Insight</div>
                        <p>Structuralism, founded by Wilhelm Wundt, used introspection to map out the structure of the mind. You correctly identified the reductionist nature of this school.</p>
                    </div>
                </div>

                <div className={styles.reviewItem}>
                    <div className={styles.questionHeader}>
                        <div className={`${styles.indicator} ${styles.indicatorWrong}`}>Incorrect</div>
                        <div className={styles.questionText}>
                            Who is considered the father of Psychoanalysis?
                        </div>
                    </div>
                    <div className={styles.answerRow}>
                        <div style={{ color: 'var(--error)' }}><span className={styles.answerLabel}>Your Choice:</span> William James</div>
                        <div style={{ color: 'var(--success)', fontWeight: 700 }}><span className={styles.answerLabel}>Correct Answer:</span> Sigmund Freud</div>
                    </div>
                    <div className={styles.explanation}>
                        <div className={styles.explanationTitle}>AI Insight</div>
                        <p>Sigmund Freud developed psychoanalysis. William James actually founded "Functionalism". Focus on the distinctions between these early pioneers for your midterm.</p>
                    </div>
                </div>
            </div>
        </div >
    );
};
