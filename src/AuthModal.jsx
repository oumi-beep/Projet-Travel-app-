import PropTypes from 'prop-types';
import { useState } from 'react';
import './auth_modal.scss';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        if (data.success) {
          const userInfo = { username: data.user.username ,password:data.user.password}; // Adjust based on your data
          localStorage.setItem('currentUser', JSON.stringify(userInfo)); // Store in local storage
          onLogin(userInfo); // Pass user info to parent component
          onClose(); // Close the modal
      } else {
          setErrorMessage(data.message);
      }
      
    } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Something went wrong. Please try again.');
    }
};

 
  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p onClick={() => setIsLogin(!isLogin)} className="switch-link">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default AuthModal;
