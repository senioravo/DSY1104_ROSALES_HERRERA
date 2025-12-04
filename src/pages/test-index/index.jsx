import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
    Person, 
    Box, 
    Cart3, 
    Receipt,
    Database
} from 'react-bootstrap-icons';
import './TestIndex.css';

export default function TestIndex() {
    const navigate = useNavigate();

    const tests = [
        {
            title: 'Test Usuarios',
            icon: <Person size={50} />,
            description: 'Prueba autenticación, registro, login y gestión de usuarios',
            path: '/test-usuarios',
            color: 'primary',
            features: ['Registro', 'Login/Logout', 'CRUD Usuarios', 'JWT Tokens']
        },
        {
            title: 'Test Productos',
            icon: <Box size={50} />,
            description: 'Prueba operaciones CRUD de productos y categorías',
            path: '/test-productos',
            color: 'success',
            features: ['Ver productos', 'Crear/Editar', 'Buscar', 'Actualizar stock']
        },
        {
            title: 'Test Carrito',
            icon: <Cart3 size={50} />,
            description: 'Prueba el sistema de carrito de compras',
            path: '/test-carrito',
            color: 'warning',
            features: ['Agregar items', 'Actualizar cantidad', 'Ver total', 'Vaciar carrito']
        },
        {
            title: 'Test Ventas',
            icon: <Receipt size={50} />,
            description: 'Prueba el sistema de ventas y pedidos',
            path: '/test-ventas',
            color: 'info',
            features: ['Crear ventas', 'Ver historial', 'Actualizar estado', 'Filtrar por estado']
        }
    ];

    return (
        <Container fluid className="test-index-page">
            <div className="test-index-header text-center py-5">
                <Database size={80} className="mb-3 text-primary" />
                <h1 className="display-4 mb-3">🧪 Panel de Pruebas de API</h1>
                <p className="lead text-muted">
                    Herramientas para probar la comunicación con la base de datos de cada microservicio
                </p>
            </div>

            <Container>
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="info-card">
                            <Card.Body>
                                <h5>📋 ¿Qué puedes hacer aquí?</h5>
                                <ul className="mb-0">
                                    <li>✅ <strong>Probar endpoints</strong> de cada microservicio</li>
                                    <li>✅ <strong>Verificar conexión</strong> con PostgreSQL (Neon)</li>
                                    <li>✅ <strong>Crear, leer, actualizar y eliminar</strong> datos en tiempo real</li>
                                    <li>✅ <strong>Ver respuestas JSON</strong> completas de la API</li>
                                    <li>✅ <strong>Probar flujos completos</strong> sin necesidad de Postman</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    {tests.map((test, index) => (
                        <Col lg={6} key={index} className="mb-4">
                            <Card className={`test-card border-${test.color}`}>
                                <Card.Body>
                                    <div className={`test-icon text-${test.color} mb-3`}>
                                        {test.icon}
                                    </div>
                                    <h3 className="mb-3">{test.title}</h3>
                                    <p className="text-muted mb-3">{test.description}</p>
                                    
                                    <div className="features mb-4">
                                        <strong>Funcionalidades:</strong>
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {test.features.map((feature, i) => (
                                                <span key={i} className="badge bg-light text-dark border">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Button 
                                        variant={test.color} 
                                        size="lg" 
                                        className="w-100"
                                        onClick={() => navigate(test.path)}
                                    >
                                        Ir al Test {test.title.replace('Test ', '')}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mt-4 mb-5">
                    <Col md={12}>
                        <Card className="bg-dark text-white">
                            <Card.Body>
                                <h5 className="mb-3">🔧 Información de los Microservicios</h5>
                                <Row>
                                    <Col md={6} lg={3} className="mb-3">
                                        <div className="service-info">
                                            <strong>Usuario Service</strong>
                                            <p className="mb-0">Puerto: <code>8081</code></p>
                                            <a href="http://localhost:8081/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="text-info">
                                                Swagger UI →
                                            </a>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={3} className="mb-3">
                                        <div className="service-info">
                                            <strong>Producto Service</strong>
                                            <p className="mb-0">Puerto: <code>8082</code></p>
                                            <a href="http://localhost:8082/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="text-info">
                                                Swagger UI →
                                            </a>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={3} className="mb-3">
                                        <div className="service-info">
                                            <strong>Carrito Service</strong>
                                            <p className="mb-0">Puerto: <code>8083</code></p>
                                            <a href="http://localhost:8083/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="text-info">
                                                Swagger UI →
                                            </a>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={3} className="mb-3">
                                        <div className="service-info">
                                            <strong>Ventas Service</strong>
                                            <p className="mb-0">Puerto: <code>8084</code></p>
                                            <a href="http://localhost:8084/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="text-info">
                                                Swagger UI →
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <hr className="bg-light" />
                                <p className="mb-0 text-center">
                                    <strong>Base de Datos:</strong> PostgreSQL en Neon | 
                                    <strong className="ms-3">BD:</strong> milsabores
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
