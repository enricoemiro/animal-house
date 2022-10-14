import { Col, Container, Row } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <section>
        <Container>
          <Row>
            <Col></Col>
          </Row>
          <p className="mb-0 text-center">
            Copyright © 2020 Animal House, Inc. All rights reserved.
          </p>
        </Container>
      </section>
    </footer>
  );
}

export default Footer;
