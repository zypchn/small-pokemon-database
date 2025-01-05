import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";

function CustomNavbar() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Pokemon Database</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/pokemon">Pokedex</Nav.Link>
                        <Nav.Link href="/trainer">Trainers</Nav.Link>
                        <NavDropdown title="Gyms" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#gyms/3.1">Kanto</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Johto</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Hoenn</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CustomNavbar;