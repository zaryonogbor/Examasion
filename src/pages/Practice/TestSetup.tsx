import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Practice.module.css';

export const TestSetup = () => {
    const navigate = useNavigate();

    // Core state
    const [questionCount, setQuestionCount] = useState(10);
    const [mode, setMode] = useState<'upload' | 'topics'>('upload');
    const [courseTitle, setCourseTitle] = useState('');
    const [topics, setTopics] = useState<string[]>([]);
    const [newTopic, setNewTopic] = useState('');

    // Advanced settings state
    const [questionTypes, setQuestionTypes] = useState({
        mcq: true,
        tf: true,
        short: false,
        essay: false
    });
    const [timerEnabled, setTimerEnabled] = useState(true);

    const toggleQuestionType = (type: keyof typeof questionTypes) => {
        setQuestionTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const addTopic = () => {
        if (newTopic.trim()) {
            setTopics([...topics, newTopic.trim()]);
            setNewTopic('');
        }
    };

    const removeTopic = (idx: number) => {
        setTopics(topics.filter((_, i) => i !== idx));
    };

    const startTest = () => {
        if (mode === 'topics') {
            if (!courseTitle.trim()) {
                alert('Please enter a course title');
                return;
            }
            if (topics.length === 0) {
                alert('Please add at least one topic');
                return;
            }
        }
        console.log('Starting test with config:', {
            mode,
            courseTitle,
            topics,
            questionCount,
            questionTypes,
            timerEnabled
        });
        navigate('/test/1');
    };

    return (
        <div className={styles.setupContainer}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Practice Test Configuration</h1>
                <p className={styles.pageSubtitle}>Customize your learning experience with AI-powered question generation</p>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNumber}>1</div>
                    <h2 className={styles.sectionTitle}>Select Material Source</h2>
                </div>

                <div className={styles.modeSelection}>
                    <div
                        className={`${styles.modeCard} ${mode === 'upload' ? styles.modeCardActive : ''}`}
                        onClick={() => setMode('upload')}
                    >
                        <div className={styles.modeIcon}>
                            <img src="/assets/3d/3d_cloud_upload.png" alt="Upload" className={styles.modeIllustration} />
                        </div>
                        <div className={styles.modeTitle}>Upload Document</div>
                        <div className={styles.modeDescription}>Generate questions from your study materials (PDF, DOCX)</div>
                        {mode === 'upload' && <CheckCircle2 className={styles.activeCheck} size={20} />}
                    </div>

                    <div
                        className={`${styles.modeCard} ${mode === 'topics' ? styles.modeCardActive : ''}`}
                        onClick={() => setMode('topics')}
                    >
                        <div className={styles.modeIcon}>
                            <img src="/assets/3d/3d_checklist.png" alt="Topics" className={styles.modeIllustration} />
                        </div>
                        <div className={styles.modeTitle}>Course & Topics</div>
                        <div className={styles.modeDescription}>Create a test from a syllabus or list of topics</div>
                        {mode === 'topics' && <CheckCircle2 className={styles.activeCheck} size={20} />}
                    </div>
                </div>

                <div className={styles.sourceContent}>
                    {mode === 'upload' ? (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Select Source Document</label>
                            <div className={styles.customSelect}>
                                <select className={styles.selectInput}>
                                    <option>Introduction to Psychology.pdf</option>
                                    <option>Advanced Calculus.pdf</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.topicsForm}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Course Title <span className={styles.required}>*</span></label>
                                <Input
                                    placeholder="e.g. Introduction to Microeconomics"
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    className={styles.premiumInput}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Topics Covered</label>
                                <div className={styles.topicList}>
                                    {topics.map((topic, idx) => (
                                        <div key={idx} className={styles.topicItem}>
                                            <span className={styles.topicText}>{topic}</span>
                                            <button
                                                className={styles.removeTopicBtn}
                                                onClick={() => removeTopic(idx)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.addTopicRow}>
                                    <Input
                                        placeholder="Add a topic (e.g. Demand and Supply)"
                                        value={newTopic}
                                        onChange={(e) => setNewTopic(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTopic();
                                            }
                                        }}
                                        className={styles.premiumInput}
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={addTopic}
                                        disabled={!newTopic.trim()}
                                        className={styles.addBtn}
                                    >
                                        Add Topic
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNumber}>2</div>
                    <h2 className={styles.sectionTitle}>Test Settings & Personalization</h2>
                </div>

                <div className={styles.settingsGrid}>
                    <div className={styles.sliderContainer}>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>Question Volume</label>
                            <span className={styles.badge}>{questionCount} Questions</span>
                        </div>
                        <div className={styles.rangeWrapper}>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                step="5"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Number(e.target.value))}
                                className={styles.premiumRange}
                                style={{ '--range-percent': `${(questionCount - 5) / (50 - 5) * 100}%` } as React.CSSProperties}
                            />
                            <div className={styles.rangeLabels}>
                                <span>5</span>
                                <span>25</span>
                                <span>50</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.questionTypesContainer}>
                        <label className={styles.label}>Question Formats</label>
                        <div className={styles.typeGrid}>
                            <div
                                className={`${styles.typeCard} ${questionTypes.mcq ? styles.typeCardActive : ''}`}
                                onClick={() => toggleQuestionType('mcq')}
                            >
                                <div className={styles.typeIcon}>
                                    {questionTypes.mcq ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                </div>
                                <span>Multiple Choice</span>
                            </div>
                            <div
                                className={`${styles.typeCard} ${questionTypes.tf ? styles.typeCardActive : ''}`}
                                onClick={() => toggleQuestionType('tf')}
                            >
                                <div className={styles.typeIcon}>
                                    {questionTypes.tf ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                </div>
                                <span>True / False</span>
                            </div>
                            <div
                                className={`${styles.typeCard} ${questionTypes.short ? styles.typeCardActive : ''}`}
                                onClick={() => toggleQuestionType('short')}
                            >
                                <div className={styles.typeIcon}>
                                    {questionTypes.short ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                </div>
                                <span>Short Answer</span>
                            </div>
                            <div
                                className={`${styles.typeCard} ${questionTypes.essay ? styles.typeCardActive : ''}`}
                                onClick={() => toggleQuestionType('essay')}
                            >
                                <div className={styles.typeIcon}>
                                    {questionTypes.essay ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                </div>
                                <span>Essay Type</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.timerToggleRow}>
                        <div className={styles.timerInfo}>
                            <div className={styles.label}>Session Timer</div>
                            <p className={styles.helpText}>Enable a 60-second limit per question to simulate exam pressure.</p>
                        </div>
                        <button
                            className={`${styles.toggleSwitch} ${timerEnabled ? styles.toggleOn : ''}`}
                            onClick={() => setTimerEnabled(!timerEnabled)}
                        >
                            <div className={styles.toggleThumb} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.footerAction}>
                <Button
                    size="lg"
                    onClick={startTest}
                    className={styles.startBtn}
                >
                    Launch Practice Session
                </Button>
            </div>
        </div>
    );
};
