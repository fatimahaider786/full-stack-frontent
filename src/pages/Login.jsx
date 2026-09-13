
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = 'https://full-stack-beckend.vercel.app';

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`, {
        email,
        password,
      });

      if (response.data) {
        toast.success("Login Successful!");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate('/products');
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.msg || "Invalid email or password";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow-sm">
        <h2 className="text-center mb-4 font-bold text-2xl">Login</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required 
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account? <Link to="/sign-up" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;