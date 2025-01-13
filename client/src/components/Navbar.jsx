import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";

function CustomNavbar() {
    
    const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"];
    
    const deleteLoginToken = () => {
        localStorage.removeItem("token");
    }
    
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Pokemon Database</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/pokemon">Pokedex</Nav.Link>
                        <Nav.Link href="/trainer">Trainers</Nav.Link>
                        <NavDropdown title="Gyms" id="basic-nav-dropdown">
                            {regions && regions.map((region) => (
                                <NavDropdown.Item href={"/gym?region=" + region} key={region}>{region}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link onClick={() => {deleteLoginToken()}} href={"/login"}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CustomNavbar;