import { Card, Badge } from 'react-bootstrap';

export default function BlogCard({ post, onClick }) {
  return (
    <Card 
      className="h-100 blog-card-bootstrap shadow-sm"
      onClick={onClick}
      style={{ 
        cursor: 'pointer', 
        borderRadius: '20px', 
        overflow: 'hidden',
        border: '2px solid var(--vanilla-dark)',
        transition: 'all 0.3s ease'
      }}
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
            backgroundColor: 'var(--mint-dark) !important',
            color: 'white',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
        >
          {post.categoria}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column" style={{ backgroundColor: 'var(--lemon)' }}>
        <Card.Title 
          className="fw-bold mb-3"
          style={{ color: 'var(--chocolate)', fontSize: '1.4rem' }}
        >
          {post.titulo}
        </Card.Title>
        <Card.Text className="mb-3 flex-grow-1" style={{ color: 'var(--chocolate-light)' }}>
          {post.descripcion}
        </Card.Text>
        <Card.Text className="small" style={{ color: 'var(--chocolate-light)' }}>
          <small>{post.fecha}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
