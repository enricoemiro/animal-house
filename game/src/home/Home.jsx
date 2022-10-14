import { Fragment } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import Footer from '@app/partials/footer/Footer';
import Header from '@app/partials/header/Header';

function Home() {
  return (
    <Fragment>
      <Header breadcrumb={false} />

      <main className="flex-shrink-0" style={{ paddingTop: '70px' }}>
        <section className="d-flex align-items-center py-5 bg-light border-bottom">
          <Container>
            <Row className="align-items-center g-5">
              <Col sm="12" md="6" className="text-center text-md-start">
                <h1 className="display-3 fw-bold lh-1 mb-2">
                  Build forms in React, without the tears
                </h1>

                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  laoreet dui lectus, ut dapibus tellus aliquam at.
                </p>

                <Button className="rounded" size="lg" variant="outline-primary">
                  Get Started
                </Button>
              </Col>

              <Col md="6" className="d-sm-flex d-none">
                <Image
                  src="./images/home.jpeg"
                  alt=""
                  className="w-100 rounded-3 shadow-sm"
                  style={{
                    objectFit: 'cover',
                    objectPosition: '50% 60%',
                    height: '300px',
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5 border-bottom">
          <Container>
            <Row className="row-cols-1 row-cols-md-3">
              <Col>
                <h1 className="h3">Declarative</h1>

                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ut consequat dolor. In eros nisi, bibendum bibendum eleifend
                  in, tempor et odio. Fusce ac lacus sapien. Morbi mollis risus
                  non tristique eleifend. Sed pretium tortor sit amet ex
                  hendrerit, vitae ultrices mi ornare. Sed blandit lacus sed
                  massa tempus, et sodales massa finibus. Suspendisse vitae
                  ligula commodo, pretium ex nec, congue nibh.
                </p>
              </Col>

              <Col>
                <h1 className="h3">Intuitive</h1>

                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ut consequat dolor. In eros nisi, bibendum bibendum eleifend
                  in, tempor et odio. Fusce ac lacus sapien. Morbi mollis risus
                  non tristique eleifend. Sed pretium tortor sit amet ex
                  hendrerit, vitae ultrices mi ornare. Sed blandit lacus sed
                  massa tempus, et sodales massa finibus. Suspendisse vitae
                  ligula commodo, pretium ex nec, congue nibh.
                </p>
              </Col>

              <Col>
                <h1 className="h3">Adoptable</h1>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  ut consequat dolor. In eros nisi, bibendum bibendum eleifend
                  in, tempor et odio. Fusce ac lacus sapien. Morbi mollis risus
                  non tristique eleifend. Sed pretium tortor sit amet ex
                  hendrerit, vitae ultrices mi ornare. Sed blandit lacus sed
                  massa tempus, et sodales massa finibus. Suspendisse vitae
                  ligula commodo, pretium ex nec, congue nibh.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="bg-light py-5 border-bottom">
          <Container>
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="h2 fw-bold mb-0">Ready to dive in?</h1>
              <div>
                <Button>Get Started</Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
}

export default Home;
