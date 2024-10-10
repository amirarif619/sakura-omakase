import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { auth } from '../firebase.js';
import { Modal, Button, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
  //FOR GOOGLE
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch  {
      setError('Google Sign-In failed. Please try again.');
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
              className="rounded-pill" 
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
               className="rounded-pill"
              required
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex justify-content-between align-items-center mt-4">
          <Form.Check label="Remember me" />
          </div>
          <Button className="w-100 mt-4 mt-3 rounded-pill" 
          variant="danger" 
          type="submit"
          >
          {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </Form>

        <div className="text-center mt-4">
      <hr className="my-3" />
      <span className="text-muted">OR</span>
    </div>


       
    <Button 
  className="w-100 my-3 rounded-pill d-flex justify-content-center align-items-center" 
  onClick={handleGoogleSignIn}
  style={{
    border: '1px solid #dadce0',
    backgroundColor: '#fff',
    color: '#3c4043',
    padding: '10px 20px',
    fontWeight: '500',
    boxShadow: '0px 1px 2px rgba(60, 64, 67, 0.3)',
  }}
>
  <img 
    src="https://developers.google.com/identity/images/g-logo.png" 
    alt="Google icon" 
    style={{ width: '20px', marginRight: '10px' }} 
  />
  Sign in with Google
</Button>


    

    <div className="mt-4 text-center">
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
