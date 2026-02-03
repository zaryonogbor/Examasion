import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { FileUp, Trash2, Check, AlertTriangle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import styles from './Documents.module.css';
import type { StudyDocument } from '../../types';

// Placeholder data extended with size
const initialDocuments: (StudyDocument & { size: string })[] = [
    { id: '1', userId: 'u1', title: 'Shopping_list', subject: 'Psychology', fileUrl: '', fileType: 'doc', uploadDate: '12.07.2019', status: 'ready', size: '1 MB' },
    { id: '2', userId: 'u1', title: 'Design_brief', subject: 'Mathematics', fileUrl: '', fileType: 'doc', uploadDate: '12.07.2019', status: 'ready', size: '150 KB' },
    { id: '3', userId: 'u1', title: 'Prices', subject: 'Business', fileUrl: '', fileType: 'xls', uploadDate: '12.07.2019', status: 'ready', size: '1 MB' },
    { id: '4', userId: 'u1', title: '01_project_description', subject: 'Engineering', fileUrl: '', fileType: 'pdf', uploadDate: '12.07.2019', status: 'ready', size: '150 MB' },
    { id: '5', userId: 'u1', title: '02_project_description', subject: 'Engineering', fileUrl: '', fileType: 'pdf', uploadDate: '12.07.2019', status: 'ready', size: '150 MB' },
];

export const DocumentList = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialDocuments);
    const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2', '3']);
    const [docToDelete, setDocToDelete] = useState<StudyDocument | null>(null);

    const handleRemove = (e: React.MouseEvent, doc: StudyDocument) => {
        e.stopPropagation();
        setDocToDelete(doc);
    };

    const handleConfirmDelete = () => {
        if (docToDelete) {
            setDocuments(prev => prev.filter(doc => doc.id !== docToDelete.id));
            setDocToDelete(null);
        }
    };

    const toggleSelect = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const getFileTypeClass = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return styles.typePdf;
            case 'doc':
            case 'docx': return styles.typeDoc;
            case 'xls':
            case 'xlsx': return styles.typeXls;
            case 'ppt':
            case 'pptx': return styles.typePpt;
            default: return styles.typeDoc;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        placeholder="Search for subjects, topics or files..."
                        className={styles.premiumSearch}
                    />
                </div>
                <Button
                    variant="primary"
                    onClick={() => navigate('/documents/upload')}
                    leftIcon={<FileUp size={20} />}
                >
                    Upload New Document
                </Button>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '-0.5rem' }}>Files</h2>

            <div className={styles.documentGrid}>
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className={styles.docCard}
                        onClick={() => navigate(`/documents/${doc.id}`)}
                    >
                        <div
                            className={`${styles.cardSelect} ${selectedIds.includes(doc.id) ? styles.cardSelectActive : ''}`}
                            onClick={(e) => toggleSelect(e, doc.id)}
                        >
                            <Check size={12} strokeWidth={3} />
                        </div>

                        <div
                            className={styles.cardAction}
                            onClick={(e) => handleRemove(e, doc)}
                            title="Remove Document"
                        >
                            <Trash2 size={18} />
                        </div>

                        <div className={`${styles.fileIconLarge} ${getFileTypeClass(doc.fileType)}`}>
                            {doc.fileType.toUpperCase()}
                        </div>

                        <div className={styles.docInfo}>
                            <h3 className={styles.docTitle}>{doc.title}</h3>
                            <div className={styles.docMeta}>
                                <span>{doc.size}</span>
                                <span>{doc.uploadDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Delete Confirmation Modal */}
            {docToDelete && (
                <div className={styles.modalOverlay} onClick={() => setDocToDelete(null)}>
                    <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalIcon}>
                            <AlertTriangle size={32} />
                        </div>
                        <div className={styles.modalContent}>
                            <h3 className={styles.modalTitle}>Delete Document?</h3>
                            <p className={styles.modalText}>
                                Are you sure you want to delete this document? This action cannot be undone.
                                <span className={styles.fileNameHighlight}>{docToDelete.title}</span>
                            </p>
                        </div>
                        <div className={styles.modalActions}>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => setDocToDelete(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                fullWidth
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
