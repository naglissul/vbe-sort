import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeButton from "./DarkModeButton";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { ReactComponent as ListIcon } from "./list.svg";

export default function DesktopHeader() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header>
      <Navbar style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>vbesort.lt</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <DarkModeButton />
          <Button onClick={handleShow} style={{ marginLeft: "16px" }}>
            <ListIcon style={{ height: "24px", width: "24px" }} />
          </Button>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>vbesort.lt</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {routes.map((route) => (
              <Nav.Link
                key={route.path}
                onClick={() => {
                  navigate(route.path);
                  handleClose();
                }}
              >
                {route.title}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
