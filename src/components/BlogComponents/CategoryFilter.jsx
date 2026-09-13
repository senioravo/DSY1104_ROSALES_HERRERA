import { ButtonGroup, Button } from 'react-bootstrap';

export default function CategoryFilter({ categorias, categoriaActiva, onCategoriaChange }) {
  return (
    <ButtonGroup className="flex-wrap gap-2">
      {categorias.map((categoria) => (
        <Button
          key={categoria}
          variant={categoriaActiva === categoria ? 'primary' : 'outline-primary'}
          onClick={() => onCategoriaChange(categoria)}
          className="rounded-pill mx-1"
          style={{
            backgroundColor: categoriaActiva === categoria ? 'var(--strawberry)' : 'var(--vanilla-lighter)',
            borderColor: categoriaActiva === categoria ? 'var(--strawberry-darker)' : 'var(--strawberry)',
            color: categoriaActiva === categoria ? 'white' : 'var(--strawberry-dark)',
            fontWeight: categoriaActiva === categoria ? '600' : '500',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1.5rem'
          }}
        >
          {categoria}
        </Button>
      ))}
    </ButtonGroup>
  );
}
