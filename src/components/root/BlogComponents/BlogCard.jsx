import { Card, Badge } from 'react-bootstrap';

export default function BlogCard({ post, onClick }) {
  return (
    <Card 
      className="h-100 blog-card-bootstrap shadow-sm"
      onClick={onClick}
      style={{ cursor: 'pointer', borderRadius: '20px', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={post.imagen} 
          alt={post.titulo}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Badge 
          className="position-absolute rounded-pill"
          style={{ 
            top: '1rem',
            left: '1rem',
            backgroundColor: '#F4A5C4',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
        >
          {post.categoria}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column" style={{ backgroundColor: '#FFF9F5' }}>
        <Card.Title 
          className="fw-bold mb-3"
          style={{ color: '#6B4226', fontSize: '1.4rem' }}
        >
          {post.titulo}
        </Card.Title>
        <Card.Text className="text-muted mb-3 flex-grow-1">
          {post.descripcion}
        </Card.Text>
        <Card.Text className="text-muted small">
          <small>{post.fecha}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
