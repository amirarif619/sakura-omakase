import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginModal = ({ show, handleClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === 'admin@admin.com') {
        window.location.href = '/admin';
      } else {
      onLoginSuccess(); 
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch  {
      setError('Sign up failed. Please try again.');
    }
  };

 
  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError(null); 
  };

  const handleCloseModal = () => {
    handleClose();
    setEmail(''); 
    setPassword(''); 
    setError(null);
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{isSignUp ? 'Sign Up' : 'Log In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label className="mt-4">Password</Form.Label>
            <Form.Control 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button className="mt-4" variant="primary" type="submit">
          {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </Form>

        <div className="mt-3">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <Button variant="link" onClick={handleToggleSignUp}>
                Log In here
              </Button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{' '}
              <Button variant="link" onClick={handleToggleSignUp}>
                Sign Up here
              </Button>
            </p>
          )}
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
