import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import cakeBg from '../../../assets/three-cake-long-bg-2.png';
import { Link } from 'react-router-dom';
import './blog-section.css';


export default function BlogSection() {
    return (
        <section className="blog-section py-5" id="blog" style={{ backgroundImage: `url(${cakeBg})` }}>
            <Container fluid>
                <div className='blog-content-container'>
                    <p id='custom-cake-title'>¿Necesitas <br />una torta <br />personalizada?</p>
                    <Link id="custom-cake-button" className="primary-button" to="/personaliza-tu-torta">
                        <ArrowRightSquareFill size={32} />
                    </Link>
                </div>
            </Container>
        </section>
    );
}