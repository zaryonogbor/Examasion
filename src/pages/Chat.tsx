import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Send, Sparkles, FileText, BookOpen, CheckCircle2 } from 'lucide-react';
import styles from './Chat.module.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

interface ChatDoc {
    id: string;
    title: string;
    type: string;
    active: boolean;
}

export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello Zaryon! I've analyzed your recent documents. I can help clarify anything from your Psychology or Calculus notes. What's on your mind?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [documents] = useState<ChatDoc[]>([
        { id: '1', title: 'Introduction to Psychology.pdf', type: 'PDF', active: true },
        { id: '2', title: 'Advanced Calculus Notes.docx', type: 'DOCX', active: false },
        { id: '3', title: 'Marketing 101 Slides.ppt', type: 'PPT', active: false },
        { id: '4', title: 'Organic Chemistry Lab.pdf', type: 'PDF', active: false }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Based on 'Advanced Calculus Notes', the fundamental theorem of line integrals relates a line integral through a vector field to the values of its scalar potential at the endpoints of the curve. Would you like an example?",
                sender: 'ai'
            }]);
        }, 1500);
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Main Chat Area */}
            <div className={styles.chatMain}>
                <div className={styles.messageList}>
                    <div className={styles.notice}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} />
                        AI Assistant is leveraging your specific study context
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.messageUser : styles.messageAi}`}>
                            <span className={styles.sender}>{msg.sender === 'user' ? 'You' : 'Assistant'}</span>
                            <div className={`${styles.bubble} ${msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputArea}>
                    <input
                        className={styles.premiumInput}
                        placeholder="Ask anything about your study materials..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button
                        className={styles.sendBtn}
                        onClick={handleSend}
                        leftIcon={<Send size={18} />}
                    >
                        Send
                    </Button>
                </div>
            </div>

            {/* Document Context Sidebar */}
            <div className={styles.docSidebar}>
                <div className={styles.sidebarHeader}>
                    <BookOpen size={20} color="var(--primary)" />
                    <h3 className={styles.sidebarTitle}>Context Documents</h3>
                </div>
                <div className={styles.docsList}>
                    {documents.map((doc) => (
                        <div key={doc.id} className={`${styles.docItem} ${doc.active ? styles.docItemActive : ''}`}>
                            <div className={styles.docIcon}>
                                <FileText size={20} />
                            </div>
                            <div className={styles.docInfo}>
                                <div className={styles.docName}>{doc.title}</div>
                                <div className={styles.docMeta}>
                                    <span className={styles.statusDot} style={{ background: doc.active ? 'var(--success)' : 'var(--text-muted)' }}></span>
                                    {doc.active ? 'Active Context' : 'Available'}
                                </div>
                            </div>
                            {doc.active && <CheckCircle2 size={16} color="var(--success)" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
