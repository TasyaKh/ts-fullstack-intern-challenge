import { useState } from 'react';
import styles from './TokenModal.module.scss';
import { authApi } from '../api/authApi';

interface TokenModalProps {
  onSubmit: (token: string) => void;
}

const TokenModal = ({ onSubmit }: TokenModalProps) => {
  const [token, setToken] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'auth' | 'token'>('auth');

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.register(login, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        onSubmit(data.token);
      } else {
        setError('Токен не получен');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      {step === 'auth' ? (
        <form className={styles.modal} onSubmit={handleAuthSubmit}>
          <label htmlFor="login-input">Логин:</label>
          <input
            id="login-input"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            autoFocus
          />
          <label htmlFor="password-input">Пароль:</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Решистрация...' : 'Регистрация'}
          </button>
          <div style={{ margin: '8px 0', textAlign: 'center', color: 'red' }}>{error}</div>
          <button type="button" style={{ marginTop: 8 }} onClick={() => setStep('token')}>
            Ввести токен вручную
          </button>
        </form>
      ) : (
        <form className={styles.modal} onSubmit={handleTokenSubmit}>
          <label htmlFor="token-input">Введите ваш auth token:</label>
          <input
            id="token-input"
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            autoFocus
          />
          <button type="submit">Сохранить токен</button>
          <button type="button" style={{ marginTop: 8 }} onClick={() => setStep('auth')}>
            Назад к авторизации
          </button>
        </form>
      )}
    </div>
  );
};

export default TokenModal; 