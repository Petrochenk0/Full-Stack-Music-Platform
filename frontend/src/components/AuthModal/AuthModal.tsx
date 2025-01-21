import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const payload = isLogin
        ? {
            username: formData.username,
            password: formData.password,
          }
        : formData;

      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(124, 77, 255, 0.2)',
    p: 4,
    outline: 'none',
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" className={styles.title}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
          />
          {!isLogin && (
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          )}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />
          {!isLogin && (
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
            />
          )}
          {error && (
            <Typography color="error" className={styles.error}>
              {error}
            </Typography>
          )}
          <Button variant="contained" fullWidth className={styles.submitButton} type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Typography
            className={styles.switchText}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              });
            }}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

export default AuthModal;
