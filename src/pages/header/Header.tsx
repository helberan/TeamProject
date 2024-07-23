import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Header.css';

export const Header = () => {
  return (
    <div>
      <Navbar expand='lg' className='bg-body-teriary' fixed='top'>
        <Container>
          <Navbar.Brand>
            <Link className='navbar-brand ' to='/team-project' id='logo'>
              PhysioReact
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-center flex-grow-1 pe-5 navlinks'>
              <Link
                to='/team-project/services'
                style={{ textDecoration: 'none' }}
                className='nav-link'
              >
                Naše služby
              </Link>
              <Link
                to='/team-project/aboutus'
                style={{ textDecoration: 'none' }}
                className='nav-link'
              >
                O nás
              </Link>
              <Link
                to='/team-project/prices'
                style={{ textDecoration: 'none' }}
                className='nav-link'
              >
                Ceník
              </Link>

              <Link
                to='/team-project/contact'
                style={{ textDecoration: 'none' }}
                className='nav-link'
              >
                Kontakt
              </Link>
            </Nav>
            <Nav>
              <Link
                to='/team-project/bookingform'
                style={{ textDecoration: 'none' }}
              >
                <div className='bookingform-btn'>Objednat se</div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
