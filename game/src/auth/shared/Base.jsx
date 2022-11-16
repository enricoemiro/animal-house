import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function Base() {
  return (
    <section
      className="vh-100"
      style={{ backgroundColor: '#FFAA33', fontFamily: 'Roboto' }}
    >
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col className="col-xl-10">
            <Card className="shadow-lg" style={{ borderRadius: '1rem' }}>
              <Row className="g-0">
                <Col className="col-md-6 col-lg-5 d-none d-md-block">
                  <Image
                    src="../images/login/login2.jpg"
                    alt="decoration login card"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  ></Image>
                </Col>

                <Col className="col-md-6 col-lg-7 align-items-center">
                  <Card.Body className="p-4 p-lg-5 text-black">
                    <Outlet />
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Base;
