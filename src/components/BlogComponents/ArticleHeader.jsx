import { Badge } from 'react-bootstrap';

export default function ArticleHeader({ categoria, titulo, fecha, categoriaColor = 'var(--mint-dark)' }) {
  return (
    <>
      <Badge 
        bg="primary" 
        className="rounded-pill px-4 py-2 mb-3"
        style={{ 
          backgroundColor: categoriaColor,
          fontSize: '0.9rem',
          fontWeight: '600'
        }}
      >
        {categoria}
      </Badge>
      <h1 className="display-4 fw-bold text-brown mb-3">{titulo}</h1>
      <p className="text-muted">{fecha}</p>
    </>
  );
}
