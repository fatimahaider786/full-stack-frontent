import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import axios from 'axios';

const BACKEND_URL = 'https://full-stack-beckend.vercel.app';

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/users/sign-up`, user);
      console.log(res.data);
      toast.success(res.data.msg || "User registered successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error in registration!");
    }
  }

  return (
    <div className='container mt-5 w-50 mx-auto'>
      <h1 className='text-center'>Create Account</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Label>First name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="First name" 
            name="firstName"
            value={user.firstName} 
            onChange={changeHandler} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Last name" 
            name="lastName"
            value={user.lastName} 
            onChange={changeHandler} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            name="email"
            value={user.email} 
            onChange={changeHandler} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            name="password"
            value={user.password} 
            onChange={changeHandler} 
            required
          />
        </Form.Group>

        <p className="mt-2">Already have an account? Please <Link to="/">login</Link></p>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;