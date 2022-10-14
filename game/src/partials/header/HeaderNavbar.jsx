import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { List, PersonCircle } from 'react-bootstrap-icons';

function HeaderNavbar() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-3 shadow"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/" className="m-0 p-0 fw-bold">
          Animal House
        </Navbar.Brand>

        <Navbar.Toggle
          className="rounded-pill"
          aria-controls="header"
          children={<List size={24} />}
        ></Navbar.Toggle>

        <Navbar.Collapse id="header">
          <Nav className="ms-auto mt-lg-0 mt-3">
            <Button
              variant="outline-secondary"
              className="d-flex justify-content-center align-items-center rounded-pill"
              href="/auth/login"
            >
              <span className="me-2">Sign in</span>
              <PersonCircle size={24} />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
