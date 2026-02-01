import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { File, CheckCircle } from 'lucide-react';
import styles from './Documents.module.css';

export const DocumentUpload = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Upload Study Content</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Our AI will analyze your documents and generate practice questions in seconds.</p>
            </div>

            <Card className={styles.uploadCard} padding="lg">
                <div className={styles.uploadZone}>
                    <div className={styles.uploadIconPulse}>
                        <img src="/assets/3d/3d_cloud_upload.png" alt="Upload" style={{ width: '60px', height: 'auto' }} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Drag & drop or click to browse</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Supports PDF, DOCX, and PPT up to 25MB</p>
                    </div>
                    <Button variant="outline">Choose Files</Button>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Recently Processed</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-secondary)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <File size={18} color="var(--primary)" />
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Microeconomics_L3.pdf</span>
                            </div>
                            <CheckCircle size={18} color="var(--success)" />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                    <Button fullWidth onClick={() => navigate('/documents')}>View All Documents</Button>
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                </div>
            </Card>
        </div>
    );
};
