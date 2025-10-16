import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = '/blog', text = '← Volver al Blog' }) {
  const navigate = useNavigate();

  return (
    <Button 
      variant="primary"
      className="mb-4 rounded-pill px-4"
      style={{ backgroundColor: '#F4A5C4', borderColor: '#F4A5C4' }}
      onClick={() => navigate(to)}
    >
      {text}
    </Button>
  );
}
