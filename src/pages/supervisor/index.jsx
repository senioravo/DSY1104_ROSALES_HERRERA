import { Link } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';

/**
 * Panel supervisor: operación (pedidos/ventas), no catálogo ni usuarios.
 */
export default function SupervisorPanel() {
    return (
        <Container className="py-4" style={{ maxWidth: 640 }}>
            <h1 className="mb-2">Panel supervisor</h1>
            <p className="text-muted mb-4">
                Rol <strong>SUPERVISOR</strong> (Entra ID). Gestión operativa de la pastelería.
            </p>

            <Card className="mb-3">
                <Card.Header>Pedidos y ventas</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Consultar ventas, estados y flujo Transbank (herramienta de prueba API).
                        <div className="mt-2">
                            <Button as={Link} to="/test-ventas" variant="primary" size="sm">
                                Ir a ventas
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            <Card className="mb-4 border-light">
                <Card.Body className="small text-muted">
                    <strong>No incluye:</strong> editar productos, listar usuarios en Neon ni panel{' '}
                    <code>/admin</code> (solo rol ADMIN).
                </Card.Body>
            </Card>

            <Button as={Link} to="/" variant="outline-secondary">
                Volver al inicio
            </Button>
        </Container>
    );
}
