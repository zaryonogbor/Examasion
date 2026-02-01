import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

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
                <h1 className={styles.title}>Get Started</h1>
                <p className={styles.subtitle}>Join thousands of students and transform your study habits today.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.premiumInput}
                    />
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
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.premiumInput}
                        error={error ? ' ' : undefined} // Just highlighting the box
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.premiumInput}
                        error={error}
                    />

                    <div style={{ marginTop: '1rem' }}>
                        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                            Create My Account
                        </Button>
                    </div>
                </form>

                <div className={styles.footer}>
                    Already a member?
                    <Link to="/login" className={styles.link}> Sign in here</Link>
                </div>
            </div>
        </div>
    );
};
