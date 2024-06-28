import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row className='align-items-center'>
          <Col xs={12} lg={3} className='footer-brand mb-3 mb-lg-0'>
            <Link className='navbar-brand' to='/' id='logo'>
              PhysioReact
            </Link>
          </Col>
          <Col xs={12} lg={9}>
            <div className='footer-links d-flex flex-wrap justify-content-center justify-content-lg-start'>
              <Link to='/services' className='footer-link'>
                Naše služby
              </Link>
              <Link to='/aboutus' className='footer-link'>
                O nás
              </Link>
              <Link to='/prices' className='footer-link'>
                Ceník
              </Link>
              <Link to='/gdpr' className='footer-link'>
                Zpracování osobních údajů
              </Link>
              <Link to='#faq' className='footer-link'>
                Q&A
              </Link>
              <Link to='/contact' className='footer-link'>
                Kontakt
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
