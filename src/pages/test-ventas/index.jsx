import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Table } from 'react-bootstrap';
import { ventasService } from '../../services/ventasService';
import { authService } from '../../services/authService';
import './TestVentas.css';

export default function TestVentas() {
    const [ventas, setVentas] = useState([]);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Estados para formularios
    const [ventaId, setVentaId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('PENDIENTE');
    const [estadoUpdate, setEstadoUpdate] = useState({
        ventaId: '',
        estado: 'CONFIRMADA'
    });

    // Form para crear venta
    const [createForm, setCreateForm] = useState({
        usuarioId: '',
        nombreCliente: '',
        emailCliente: '',
        telefonoCliente: '',
        direccionEntrega: '',
        tipoEntrega: 'DELIVERY',
        metodoPago: 'TRANSBANK',
        notasAdicionales: '',
        items: [
            {
                productoCode: '',
                productoNombre: '',
                cantidad: 1,
                precioUnitario: 0
            }
        ]
    });

    const estados = ['PENDIENTE', 'CONFIRMADA', 'EN_PREPARACION', 'EN_CAMINO', 'ENTREGADA', 'CANCELADA'];
    const tiposEntrega = ['DELIVERY', 'RETIRO_TIENDA'];
    const metodosPago = ['TRANSBANK', 'EFECTIVO', 'TRANSFERENCIA'];

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = () => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        if (user) {
            setCreateForm(prev => ({ ...prev, usuarioId: user.id }));
            setUsuarioId(user.id);
        }
    };

    const clearMessages = () => {
        setMessage(null);
        setError(null);
    };

    // 1. OBTENER TODAS LAS VENTAS
    const handleGetAll = async () => {
        clearMessages();
        setLoading(true);
        try {
            const data = await ventasService.obtenerTodas();
            setVentas(data);
            setMessage(`✅ Se encontraron ${data.length} ventas`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 2. OBTENER VENTA POR ID
    const handleGetById = async (e) => {
        e.preventDefault();
        if (!ventaId) {
            setError('❌ Ingrese un ID de venta');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await ventasService.obtenerPorId(ventaId);
            setSelectedVenta(data);
            setVentas([data]);
            setMessage(`✅ Venta encontrada: ID ${data.id}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
            setSelectedVenta(null);
        } finally {
            setLoading(false);
        }
    };

    // 3. OBTENER VENTAS POR USUARIO
    const handleGetByUser = async (e) => {
        e.preventDefault();
        if (!usuarioId) {
            setError('❌ Ingrese un ID de usuario');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await ventasService.obtenerPorUsuario(usuarioId);
            setVentas(data);
            setMessage(`✅ Se encontraron ${data.length} ventas del usuario ${usuarioId}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 4. OBTENER VENTAS POR ESTADO
    const handleGetByStatus = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const data = await ventasService.obtenerPorEstado(estadoFilter);
            setVentas(data);
            setMessage(`✅ Se encontraron ${data.length} ventas con estado ${estadoFilter}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 5. CREAR VENTA
    const handleCreateVenta = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const ventaData = {
                ...createForm,
                usuarioId: parseInt(createForm.usuarioId),
                items: createForm.items.map(item => ({
                    ...item,
                    cantidad: parseInt(item.cantidad),
                    precioUnitario: parseFloat(item.precioUnitario)
                }))
            };

            const data = await ventasService.crearVenta(ventaData);
            setMessage(`✅ Venta creada exitosamente: ID ${data.id}`);
            handleGetAll();
        } catch (err) {
            setError(`❌ Error al crear: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 6. ACTUALIZAR ESTADO
    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if (!estadoUpdate.ventaId) {
            setError('❌ Ingrese un ID de venta');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await ventasService.actualizarEstado(
                parseInt(estadoUpdate.ventaId),
                estadoUpdate.estado
            );
            setMessage(`✅ Estado actualizado: ${data.estado}`);
            handleGetAll();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 7. ELIMINAR VENTA
    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar esta venta?')) return;
        
        clearMessages();
        setLoading(true);
        try {
            await ventasService.eliminar(id);
            setMessage(`✅ Venta eliminada exitosamente`);
            handleGetAll();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addItemToForm = () => {
        setCreateForm(prev => ({
            ...prev,
            items: [...prev.items, {
                productoCode: '',
                productoNombre: '',
                cantidad: 1,
                precioUnitario: 0
            }]
        }));
    };

    const removeItemFromForm = (index) => {
        setCreateForm(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const updateItemInForm = (index, field, value) => {
        setCreateForm(prev => ({
            ...prev,
            items: prev.items.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const getEstadoBadgeColor = (estado) => {
        const colors = {
            'PENDIENTE': 'warning',
            'CONFIRMADA': 'info',
            'EN_PREPARACION': 'primary',
            'EN_CAMINO': 'secondary',
            'ENTREGADA': 'success',
            'CANCELADA': 'danger'
        };
        return colors[estado] || 'secondary';
    };

    return (
        <Container fluid className="test-ventas-page py-4">
            <h1 className="text-center mb-4">🧪 Panel de Pruebas - API de Ventas</h1>
            <p className="text-center text-muted mb-4">
                Prueba todas las funcionalidades del sistema de ventas
            </p>

            {/* Usuario actual */}
            {currentUser && (
                <Alert variant="success" className="text-center">
                    👤 Usuario: <strong>{currentUser.nombre}</strong> (ID: {currentUser.id})
                </Alert>
            )}

            {/* Mensajes */}
            {message && <Alert variant="success" dismissible onClose={clearMessages}>{message}</Alert>}
            {error && <Alert variant="danger" dismissible onClose={clearMessages}>{error}</Alert>}

            <Row>
                {/* PANEL DE CONSULTAS */}
                <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">📋 Consultas (GET)</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="outline-primary" onClick={handleGetAll} disabled={loading}>
                                    Ver Todas las Ventas
                                </Button>
                            </div>

                            <hr />

                            {/* Por ID */}
                            <Form onSubmit={handleGetById} className="mb-3">
                                <Form.Label><strong>Buscar por ID:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="number"
                                        placeholder="ID de venta"
                                        value={ventaId}
                                        onChange={(e) => setVentaId(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>

                            {/* Por Usuario */}
                            <Form onSubmit={handleGetByUser} className="mb-3">
                                <Form.Label><strong>Por Usuario ID:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="number"
                                        placeholder="ID del usuario"
                                        value={usuarioId}
                                        onChange={(e) => setUsuarioId(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>

                            {/* Por Estado */}
                            <Form onSubmit={handleGetByStatus}>
                                <Form.Label><strong>Por Estado:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Select
                                        value={estadoFilter}
                                        onChange={(e) => setEstadoFilter(e.target.value)}
                                    >
                                        {estados.map(estado => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))}
                                    </Form.Select>
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* ACTUALIZAR ESTADO */}
                    <Card className="mb-3">
                        <Card.Header className="bg-warning">
                            <h5 className="mb-0">✏️ Actualizar Estado (PATCH)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdateStatus}>
                                <Form.Group className="mb-2">
                                    <Form.Label>ID de venta*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="1"
                                        value={estadoUpdate.ventaId}
                                        onChange={(e) => setEstadoUpdate({...estadoUpdate, ventaId: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nuevo estado*</Form.Label>
                                    <Form.Select
                                        value={estadoUpdate.estado}
                                        onChange={(e) => setEstadoUpdate({...estadoUpdate, estado: e.target.value})}
                                    >
                                        {estados.map(estado => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit" variant="warning" className="w-100" disabled={loading}>
                                    Actualizar Estado
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Info */}
                    <Card className="mb-3">
                        <Card.Header className="bg-secondary text-white">
                            <h5 className="mb-0">🔌 Estado de Conexión</h5>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Puerto API:</strong> <code>8084</code></p>
                            <p><strong>Swagger UI:</strong> <a href="http://localhost:8084/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                                http://localhost:8084/swagger-ui.html
                            </a></p>
                            <Button 
                                variant="outline-secondary" 
                                className="w-100"
                                onClick={handleGetAll}
                            >
                                Probar Conexión con BD
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* PANEL DE CREACIÓN */}
                <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">➕ Crear Venta (POST)</h5>
                        </Card.Header>
                        <Card.Body style={{maxHeight: '600px', overflowY: 'auto'}}>
                            <Form onSubmit={handleCreateVenta}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Usuario ID*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={createForm.usuarioId}
                                                onChange={(e) => setCreateForm({...createForm, usuarioId: e.target.value})}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Tipo Entrega*</Form.Label>
                                            <Form.Select
                                                value={createForm.tipoEntrega}
                                                onChange={(e) => setCreateForm({...createForm, tipoEntrega: e.target.value})}
                                            >
                                                {tiposEntrega.map(tipo => (
                                                    <option key={tipo} value={tipo}>{tipo}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-2">
                                    <Form.Label>Nombre Cliente*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={createForm.nombreCliente}
                                        onChange={(e) => setCreateForm({...createForm, nombreCliente: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Email*</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={createForm.emailCliente}
                                                onChange={(e) => setCreateForm({...createForm, emailCliente: e.target.value})}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Teléfono*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={createForm.telefonoCliente}
                                                onChange={(e) => setCreateForm({...createForm, telefonoCliente: e.target.value})}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-2">
                                    <Form.Label>Dirección*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={createForm.direccionEntrega}
                                        onChange={(e) => setCreateForm({...createForm, direccionEntrega: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Método de Pago*</Form.Label>
                                    <Form.Select
                                        value={createForm.metodoPago}
                                        onChange={(e) => setCreateForm({...createForm, metodoPago: e.target.value})}
                                    >
                                        {metodosPago.map(metodo => (
                                            <option key={metodo} value={metodo}>{metodo}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Notas</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={createForm.notasAdicionales}
                                        onChange={(e) => setCreateForm({...createForm, notasAdicionales: e.target.value})}
                                    />
                                </Form.Group>

                                <hr />
                                <h6>Items de la Venta</h6>
                                {createForm.items.map((item, index) => (
                                    <Card key={index} className="mb-2 bg-light">
                                        <Card.Body className="p-2">
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        placeholder="Código"
                                                        value={item.productoCode}
                                                        onChange={(e) => updateItemInForm(index, 'productoCode', e.target.value)}
                                                        className="mb-1"
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        placeholder="Nombre"
                                                        value={item.productoNombre}
                                                        onChange={(e) => updateItemInForm(index, 'productoNombre', e.target.value)}
                                                        className="mb-1"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        placeholder="Cantidad"
                                                        value={item.cantidad}
                                                        onChange={(e) => updateItemInForm(index, 'cantidad', e.target.value)}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        placeholder="Precio"
                                                        value={item.precioUnitario}
                                                        onChange={(e) => updateItemInForm(index, 'precioUnitario', e.target.value)}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    {createForm.items.length > 1 && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="danger" 
                                                            className="w-100"
                                                            onClick={() => removeItemFromForm(index)}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <Button 
                                    size="sm" 
                                    variant="outline-secondary" 
                                    className="w-100 mb-3"
                                    onClick={addItemToForm}
                                >
                                    + Agregar Item
                                </Button>

                                <Button type="submit" variant="success" className="w-100" disabled={loading}>
                                    {loading ? 'Creando...' : 'Crear Venta'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* RESULTADOS */}
            <Card>
                <Card.Header className="bg-dark text-white">
                    <h5 className="mb-0">📊 Resultados ({ventas.length})</h5>
                </Card.Header>
                <Card.Body>
                    {loading && <p className="text-center">Cargando...</p>}
                    {!loading && ventas.length === 0 && (
                        <p className="text-center text-muted">No hay ventas para mostrar. Realiza una consulta.</p>
                    )}
                    {!loading && ventas.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Usuario</th>
                                        <th>Cliente</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Entrega</th>
                                        <th>Pago</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventas.map(venta => (
                                        <tr key={venta.id}>
                                            <td><code>{venta.id}</code></td>
                                            <td>{venta.usuarioId}</td>
                                            <td>{venta.nombreCliente}</td>
                                            <td><strong>${venta.total?.toLocaleString('es-CL')}</strong></td>
                                            <td>
                                                <Badge bg={getEstadoBadgeColor(venta.estado)}>
                                                    {venta.estado}
                                                </Badge>
                                            </td>
                                            <td>{venta.tipoEntrega}</td>
                                            <td>{venta.metodoPago}</td>
                                            <td>{new Date(venta.fechaVenta).toLocaleDateString('es-CL')}</td>
                                            <td>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-danger"
                                                    onClick={() => handleDelete(venta.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Venta seleccionada */}
            {selectedVenta && (
                <Card className="mt-3">
                    <Card.Header className="bg-dark text-white">
                        <h5 className="mb-0">🔍 Venta Seleccionada</h5>
                    </Card.Header>
                    <Card.Body>
                        <pre className="bg-light p-3 rounded">
                            {JSON.stringify(selectedVenta, null, 2)}
                        </pre>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
