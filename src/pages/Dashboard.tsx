import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileUp, PlayCircle, FileText, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.dashboard}>
            <div className={styles.welcomeSection}>
                <h1>Welcome back, Zaryon!</h1>
                <p>You've completed 85% of your weekly goal. Keep the momentum going!</p>
                <img src="/assets/3d/3d_hero.png" alt="Dashboard Hero" className={styles.dashboardIcon} />


                <div className={styles.quickActions}>
                    <Button
                        onClick={() => navigate('/documents')}
                        className={styles.uploadBtn}
                        leftIcon={<FileUp size={20} />}
                    >
                        Upload Materials
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/practice')}
                        className={styles.practiceBtn}
                        leftIcon={<PlayCircle size={20} />}
                    >
                        Practice Now
                    </Button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <Card className={`${styles.statCard} ${styles.cardBlue}`} hoverable>
                    <img src="/assets/3d/3d_books.png" alt="Study Materials" className={`${styles.statIcon} ${styles.blueStatIcon}`} />
                    <div className={styles.statCardTitle}>Study Materials</div>
                    <div className={styles.statCardValue}>12</div>
                    <div className={styles.statCardSub}>
                        <TrendingUp size={16} className={styles.trendUp} />
                        <span className={styles.trendUp}>+2 since Monday</span>
                    </div>
                </Card>
                <Card className={`${styles.statCard} ${styles.cardPurple}`} hoverable>
                    <img src="/assets/3d/3d_trophy.png" alt="Tests Mastering" className={`${styles.statIcon} ${styles.purpleStatIcon}`} />
                    <div className={styles.statCardTitle}>Tests Mastering</div>
                    <div className={styles.statCardValue}>28</div>
                    <div className={styles.statCardSub}>
                        <TrendingUp size={16} className={styles.trendUp} />
                        <span className={styles.trendUp}>+5 this session</span>
                    </div>
                </Card>
                <Card className={`${styles.statCard} ${styles.cardOrange}`} hoverable>
                    <img src="/assets/3d/3d_target.png" alt="Knowledge Level" className={`${styles.statIcon} ${styles.orangeStatIcon}`} />
                    <div className={styles.statCardTitle}>Knowledge Level</div>
                    <div className={styles.statCardValue}>84%</div>
                    <div className={styles.statCardSub}>
                        <TrendingUp size={16} className={styles.trendNeutral} />
                        <span className={styles.trendNeutral}>Top 5% of class</span>
                    </div>
                </Card>
            </div>

            <div>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Recent Progress</h2>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')} rightIcon={<ArrowRight size={16} />}>
                        View Analytics
                    </Button>
                </div>

                <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                            <div className={`${styles.activityIcon} ${styles.iconTest}`}><CheckCircle size={24} /></div>
                            <div className={styles.activityText}>
                                <h4>Advanced Physics - Quantum Mechanics</h4>
                                <p>Scored 94% • 1,200 XP earned • 2h ago</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className={styles.reviewBtn}
                            onClick={() => navigate('/results/1')}
                        >
                            Review Results
                        </Button>
                    </div>

                    <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                            <div className={`${styles.activityIcon} ${styles.iconDoc}`}><FileText size={24} /></div>
                            <div className={styles.activityText}>
                                <h4>Molecular Biology Syllabus.pdf</h4>
                                <p>AI Analysis Complete • 45 Questions available • Yesterday</p>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            className={styles.reviewBtn}
                            onClick={() => navigate('/documents')}
                        >
                            View Docs
                        </Button>
                    </div>

                    <div className={styles.activityItem}>
                        <div className={styles.activityInfo}>
                            <div className={`${styles.activityIcon} ${styles.iconTest}`}><CheckCircle size={24} /></div>
                            <div className={styles.activityText}>
                                <h4>Introduction to Macroeconomics</h4>
                                <p>Scored 78% • 800 XP earned • 3d ago</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className={styles.reviewBtn}
                            onClick={() => navigate('/results/2')}
                        >
                            Review Results
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
