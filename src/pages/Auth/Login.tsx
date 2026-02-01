import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 800);
    };

    return (
        <div className={styles.authContainer} data-theme="light">
            <div className={styles.authCard}>
                <div className={styles.brand}>Examasion</div>
                <h1 className={styles.title}>Sign In</h1>
                <p className={styles.subtitle}>Welcome back. Please enter your details.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.premiumInput}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.premiumInput}
                    />

                    <div style={{ marginTop: '1rem' }}>
                        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                            Login to Dashboard
                        </Button>
                    </div>
                </form>

                <div className={styles.footer}>
                    New to Examasion?
                    <Link to="/signup" className={styles.link}> Create account</Link>
                </div>
            </div>
        </div>
    );
};
