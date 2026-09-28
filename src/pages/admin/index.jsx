import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const adminLinks = [
    { to: '/test-usuarios', title: 'Usuarios (API)', desc: 'Listar y probar usuario-service / Neon' },
    { to: '/test-productos', title: 'Productos (API)', desc: 'CRUD y pruebas de catálogo' },
    { to: '/test-carrito', title: 'Carritos (API)', desc: 'Pruebas carrito-service' },
    { to: '/test-ventas', title: 'Ventas (API)', desc: 'Ventas y Transbank' },
    { to: '/test-api', title: 'Hub APIs', desc: 'Índice de pruebas de microservicios' },
];

export default function AdminPanel() {
    return (
        <Container className="py-4">
            <h1 className="mb-2">Panel administrador</h1>
            <p className="text-muted mb-4">
                Rol <strong>ADMIN</strong> (Entra ID). Herramientas internas; no visible para clientes.
            </p>
            <Row xs={1} md={2} className="g-3">
                {adminLinks.map((item) => (
                    <Col key={item.to}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text className="small text-muted">{item.desc}</Card.Text>
                                <Button as={Link} to={item.to} variant="primary" size="sm">
                                    Abrir
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button as={Link} to="/" variant="outline-secondary" className="mt-4">
                Volver al inicio
            </Button>
        </Container>
    );
}
