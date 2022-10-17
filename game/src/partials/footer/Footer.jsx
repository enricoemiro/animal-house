import { Col, Container, Row } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="h3 text-uppercase">Resources</h1>

              <ul>
                <li>Docs</li>
                <li>Learn</li>
                <li>Guides</li>
                <li>API Reference</li>
                <li>Blog</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section >
        <Container className="py-4 border-top">
          <p className="mb-0 text-muted">
            Copyright © 2022 Animal House, Inc. All rights reserved.
          </p>
        </Container>
      </section>
    </footer>
  );
}

export default Footer;
