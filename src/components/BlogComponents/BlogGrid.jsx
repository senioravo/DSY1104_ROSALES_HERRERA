import { Row, Col } from 'react-bootstrap';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts, onPostClick }) {
    return (
        <Row>
            {posts.map((post) => (
                <Col key={post.id} lg={4} md={6} className="mb-4">
                    <BlogCard 
                        post={post} 
                        onClick={() => onPostClick(post.slug)}
                    />
                </Col>
            ))}
        </Row>
    );
}