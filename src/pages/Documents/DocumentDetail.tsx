import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { PlayCircle, MessageSquare } from 'lucide-react';
import styles from './Documents.module.css';

export const DocumentDetail = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.metaSection}>
                <div className={styles.fileInfo}>
                    <h1>Introduction to Psychology.pdf</h1>
                    <div className={styles.fileMeta}>
                        <span>Uploaded: Oct 15, 2023</span>
                        <span>Size: 2.4 MB</span>
                        <span>Type: PDF</span>
                    </div>
                </div>
                <div className={styles.actionButtons}>
                    <Button variant="outline" onClick={() => navigate('/chat')} leftIcon={<MessageSquare size={18} />}>
                        Chat with Doc
                    </Button>
                    <Button onClick={() => navigate('/practice')} leftIcon={<PlayCircle size={18} />}>
                        Take Practice Test
                    </Button>
                </div>
            </div>

            <div className={styles.summarySection}>
                <h2>AI Summary</h2>
                <div style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        This document covers the fundamental concepts of psychology, exploring the history of the field, major theoretical perspectives, and research methods.
                    </p>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Key Topics:</h4>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                        <li><strong>Structuralism vs. Functionalism:</strong> Analysis of the early schools of thought.</li>
                        <li><strong>Behaviorism:</strong> Focus on observable behavior (Watson, Skinner).</li>
                        <li><strong>Cognitive Psychology:</strong> Study of mental processes.</li>
                    </ul>
                    <p>
                        The text also details the scientific method as applied to psychological research, emphasizing the importance of replication and peer review.
                    </p>
                </div>
            </div>
        </div>
    );
};
