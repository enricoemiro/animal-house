import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import axios from 'axios';

async function signup(credentials) {
  const requestUrl = import.meta.env.VITE_API_BASE_URL + "/auth/register"; 
  const response = await axios.post(requestUrl, {
    name: credentials.name,
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

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  async function handleSignupSubmit(event) {
    event.preventDefault();  
    const response = await signup({name, email, password});
    console.log(response);
  
    setUser(response);
  } 
  
  return (
    <Form onSubmit={handleSignupSubmit}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-center mb-2 pb-1">
              <Image className="" src="../images/paw1.png"></Image>
              <span className="h1 fw-bold mb-0 p-1">Animal house</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto" sm="auto" lg="auto">
            <h5 className="fw-normal mb-3" style={{ letterSpacing: '1px' }}>
              Register to Animal house
            </h5>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Control
                className="form-control-lg"
                type="text"
                placeholder="Your name"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-control-lg"
                type="email"
                placeholder="Your email "
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-control-lg"
                type="password"
                placeholder="Your password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <div className="pt-1 mb-4 d-grid gap-2">
            <Button type='submit' variant="dark" size="lg" className="">
              Register
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default Signup;
