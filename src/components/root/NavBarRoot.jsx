import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBarRoot() {
    return (
        <Navbar expand="lg" className="NavBarRoot" id="navBarRoot" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Mil Sabores</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Link to="/" className="custom-nav-link">Home</Link>
                        <Link to="/nosotros" className="custom-nav-link">Nosotros</Link>
                        <Link to="/productos" className="custom-nav-link">Productos</Link>
                        <Link to="/personaliza-tu-torta" className="custom-nav-link">Personaliza tu torta</Link>
                        <Link to="/blog" className="custom-nav-link">Blog</Link>
                        <Link to="/contacto" className="custom-nav-link">Contacto</Link>
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href='/action/3.1'>Action</NavDropdown.Item>
                            <NavDropdown.Item href='/action/3.2'>
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}