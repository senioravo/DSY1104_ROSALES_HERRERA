import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/home-components/Hero/index.jsx';
import CategoriesSection from '../../components/home-components/categories-section/categories-section.jsx';
import HighlightsSection from '../../components/home-components/highlights-section/highllights-section.jsx';
import BlogSection from '../../components/home-components/blog-section/blog-section.jsx';
import '../root.css';

export default function Home() {
    return (
        <Container fluid className="p-0">
            <Row>
                <Hero />
            </Row>
            <Row>
                <CategoriesSection />
            </Row>
            <Row>
                <HighlightsSection />
            </Row>
            <Row>
                <BlogSection />
            </Row>
        </Container>
    );
}