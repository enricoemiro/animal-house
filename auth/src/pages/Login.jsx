import { Button, Form, Image } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

async function getLoggedUser() {
  const requestUrl = import.meta.env.VITE_API_BASE_URL + "/user/read/account/info"; 
  const response = await axios.post(requestUrl, {}, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  },);
  
  return response;
}

async function login(credentials) {
  const requestUrl = import.meta.env.VITE_API_BASE_URL + "/auth/login"; 
  const response = await axios.post(requestUrl, {
    email: credentials.email,
    password: credentials.password 
  }, 
  {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  },
  );
  return response;
}


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  async function handleLoginSubmit(event) {
    event.preventDefault();  
    const response = await login({email, password});
    console.log(response);
    const res = await getLoggedUser();
    console.log(res);
    setUser(response);
  } 

  return (
    <Form onSubmit={handleLoginSubmit}>
      <div className="d-flex align-items-center mb-3 pb-1">
        <Image className="" src="../images/paw1.png"></Image>
        <span className="h1 fw-bold mb-0 p-1">Animal house</span>
      </div>

      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
        Sign into your account
      </h5>

      <Form.Group className="mb-3">
        <Form.Control
          className="form-control-lg"
          type="email"
          placeholder="Email address"
          onChange={event => setEmail(event.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          className="form-control-lg"
          type="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        ></Form.Control>
      </Form.Group>

      <div className="pt-1 mb-4 d-grid gap-2">
        <Button type='submit' variant="dark" size="lg" className="">
          Login
        </Button>
      </div>

      <a className="medium text-muted mb-3" href="#!">
        Forgot password?
      </a>
      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
        Don't have an account?{' '}
        <Link style={{color: '#393f81'}} to="/signup">Click here to register</Link>
      </p>
    </Form>
  );
}

export default Login;