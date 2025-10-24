import { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, Row, Col } from 'react-bootstrap';

export default function MensajesGuardados() {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        cargarMensajes();
    }, []);

    const cargarMensajes = () => {
        const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
        // Ordenar por más reciente primero
        const ordenados = contactos.sort((a, b) => b.id - a.id);
        setMensajes(ordenados);
    };

    const eliminarMensaje = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
            const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
            const filtrados = contactos.filter(c => c.id !== id);
            localStorage.setItem('contactos', JSON.stringify(filtrados));
            cargarMensajes();
        }
    };

    const eliminarTodos = () => {
        if (window.confirm('¿Estás seguro de eliminar TODOS los mensajes?')) {
            localStorage.removeItem('contactos');
            setMensajes([]);
        }
    };

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: 'var(--chocolate)' }}>
                    <i className="fas fa-envelope-open-text me-3"></i>
                    Mensajes Recibidos
                </h2>
                {mensajes.length > 0 && (
                    <Button 
                        variant="danger" 
                        size="sm"
                        onClick={eliminarTodos}
                    >
                        <i className="fas fa-trash me-2"></i>
                        Eliminar Todos
                    </Button>
                )}
            </div>

            <Badge 
                bg="info" 
                className="mb-4"
                style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
            >
                Total de mensajes: {mensajes.length}
            </Badge>

            {mensajes.length === 0 ? (
                <Card 
                    className="text-center p-5"
                    style={{ 
                        backgroundColor: 'var(--vanilla-lighter)',
                        border: '2px dashed var(--vanilla-dark)'
                    }}
                >
                    <Card.Body>
                        <i 
                            className="fas fa-inbox" 
                            style={{ 
                                fontSize: '4rem', 
                                color: 'var(--chocolate-light)',
                                marginBottom: '1rem'
                            }}
                        ></i>
                        <h4 style={{ color: 'var(--chocolate)' }}>
                            No hay mensajes guardados
                        </h4>
                        <p style={{ color: 'var(--chocolate-light)' }}>
                            Los mensajes enviados desde el formulario aparecerán aquí.
                        </p>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {mensajes.map((mensaje) => (
                        <Col key={mensaje.id} lg={6} className="mb-4">
                            <Card 
                                className="h-100 shadow-sm"
                                style={{ 
                                    backgroundColor: 'var(--lemon)',
                                    border: '2px solid var(--vanilla-dark)',
                                    borderRadius: '15px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Card.Header 
                                    style={{ 
                                        backgroundColor: 'var(--strawberry-light)',
                                        borderBottom: '2px solid var(--strawberry)'
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0" style={{ color: 'var(--chocolate)' }}>
                                            <i className="fas fa-user me-2"></i>
                                            {mensaje.nombre}
                                        </h5>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => eliminarMensaje(mensaje.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--chocolate)' }}>
                                            <i className="fas fa-envelope me-2"></i>
                                            Email:
                                        </strong>
                                        <p className="mb-1" style={{ color: 'var(--chocolate-light)' }}>
                                            {mensaje.email}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--chocolate)' }}>
                                            <i className="fas fa-phone me-2"></i>
                                            Teléfono:
                                        </strong>
                                        <p className="mb-1" style={{ color: 'var(--chocolate-light)' }}>
                                            {mensaje.telefono}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--chocolate)' }}>
                                            <i className="fas fa-tag me-2"></i>
                                            Asunto:
                                        </strong>
                                        <p className="mb-1" style={{ color: 'var(--chocolate-light)' }}>
                                            {mensaje.asunto}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--chocolate)' }}>
                                            <i className="fas fa-comment me-2"></i>
                                            Mensaje:
                                        </strong>
                                        <p 
                                            className="mb-0" 
                                            style={{ 
                                                color: 'var(--chocolate-light)',
                                                whiteSpace: 'pre-wrap'
                                            }}
                                        >
                                            {mensaje.mensaje}
                                        </p>
                                    </div>

                                    <hr style={{ borderColor: 'var(--vanilla-dark)' }} />

                                    <div className="text-end">
                                        <small style={{ color: 'var(--chocolate-light)' }}>
                                            <i className="fas fa-clock me-2"></i>
                                            {mensaje.fecha}
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
