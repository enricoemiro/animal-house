import { Button, Form, Image } from 'react-bootstrap';
import {useState} from 'react';

async function login(credentials) {
  return fetch("", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

function Login() {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [response, setResponse] = useState(null);

  async function handleLoginSubmit(event) {
    event.preventDefault();  
    const response = await login({mail, password});

    setResponse(response);
  } 

  return (
    <Form onSubmit={handleLoginSubmit}>
      <div className="d-flex align-items-center mb-3 pb-1">
        <Image className="" src="../images/shared/paw1.png"></Image>
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
          onChange={event => setMail(event.target.value)}
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
        <a href="#!" style={{ color: '#393f81' }}>
          Register here
        </a>
      </p>
    </Form>
  );
}

export default Login;
