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
            backgroundColor: categoriaActiva === categoria ? '#F4A5C4' : 'transparent',
            borderColor: '#F4A5C4',
            color: categoriaActiva === categoria ? 'white' : '#F4A5C4'
          }}
        >
          {categoria}
        </Button>
      ))}
    </ButtonGroup>
  );
}
