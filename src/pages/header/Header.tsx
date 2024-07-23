import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Header.css';

export const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleNavClick = () => setExpanded(false);

  return (
    <div>
      <Navbar
        expand='lg'
        className='bg-body-teriary'
        fixed='top'
        expanded={expanded}
      >
        <Container>
          <Navbar.Brand>
            <Link className='navbar-brand' to='/team-project' id='logo'>
              PhysioReact
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            onClick={handleToggle}
          />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className={expanded ? 'show' : ''}
          >
            <Nav className='me-auto justify-content-center flex-grow-1 pe-5 navlinks'>
              <Link
                to='/team-project/services'
                style={{ textDecoration: 'none' }}
                className='nav-link'
                onClick={handleNavClick}
              >
                Naše služby
              </Link>
              <Link
                to='/team-project/aboutus'
                style={{ textDecoration: 'none' }}
                className='nav-link'
                onClick={handleNavClick}
              >
                O nás
              </Link>
              <Link
                to='/team-project/prices'
                style={{ textDecoration: 'none' }}
                className='nav-link'
                onClick={handleNavClick}
              >
                Ceník
              </Link>
              <Link
                to='/team-project/contact'
                style={{ textDecoration: 'none' }}
                className='nav-link'
                onClick={handleNavClick}
              >
                Kontakt
              </Link>
            </Nav>
            <Nav className='booking-nav'>
              <Link
                to='/team-project/bookingform'
                style={{ textDecoration: 'none' }}
                onClick={handleNavClick}
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
