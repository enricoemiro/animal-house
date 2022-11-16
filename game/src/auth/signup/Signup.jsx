import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

function Signup() {
  return (
    <Form>
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-center mb-2 pb-1">
              <Image className="" src="../images/shared/paw1.png"></Image>
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
            <Button variant="dark" size="lg" className="">
              Register
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default Signup;
