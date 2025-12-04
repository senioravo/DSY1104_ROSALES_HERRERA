import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Table } from 'react-bootstrap';
import { cartService } from '../../services/cartService';
import { authService } from '../../services/authService';
import API_CONFIG from '../../config/api.config';
import './TestCarrito.css';

const API_URL = API_CONFIG.CARRITO_SERVICE;

export default function TestCarrito() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    // Estados para formularios
    const [addItemForm, setAddItemForm] = useState({
        productoCode: '',
        productoNombre: '',
        precioCLP: '',
        productoImagen: '',
        cantidad: 1,
        stockDisponible: 10
    });
    const [updateForm, setUpdateForm] = useState({
        itemId: '',
        cantidad: 1
    });
    const [deleteItemId, setDeleteItemId] = useState('');
    const [userIdForQuery, setUserIdForQuery] = useState('');

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = () => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        if (user) {
            loadCart();
        }
    };

    const clearMessages = () => {
        setMessage(null);
        setError(null);
    };

    // 1. OBTENER CARRITO
    const loadCart = async () => {
        clearMessages();
        setLoading(true);
        try {
            const items = await cartService.getCart();
            setCartItems(items || []);
            
            const totalAmount = await cartService.getCartTotal();
            const count = await cartService.getCartItemCount();
            setTotal(totalAmount);
            setItemCount(count);
            
            setMessage(`✅ Carrito cargado: ${items?.length || 0} items`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    // 2. OBTENER CARRITO POR USUARIO ID
    const handleGetCartByUserId = async (e) => {
        e.preventDefault();
        if (!userIdForQuery) {
            setError('❌ Ingrese un ID de usuario');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/carrito/usuario/${userIdForQuery}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) throw new Error('Error al obtener carrito');

            const data = await response.json();
            setCartItems(data.items || []);
            setMessage(`✅ Carrito del usuario ${userIdForQuery}: ${data.items?.length || 0} items`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 3. AGREGAR ITEM AL CARRITO
    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('❌ Debe iniciar sesión primero');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const product = {
                code: addItemForm.productoCode,
                nombre: addItemForm.productoNombre,
                precioCLP: parseFloat(addItemForm.precioCLP),
                imagen: addItemForm.productoImagen,
                stock: parseInt(addItemForm.stockDisponible)
            };

            await cartService.addToCart(product, parseInt(addItemForm.cantidad));
            setMessage(`✅ Producto agregado al carrito`);
            setAddItemForm({
                productoCode: '',
                productoNombre: '',
                precioCLP: '',
                productoImagen: '',
                cantidad: 1,
                stockDisponible: 10
            });
            loadCart();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 4. ACTUALIZAR CANTIDAD
    const handleUpdateQuantity = async (e) => {
        e.preventDefault();
        if (!updateForm.itemId) {
            setError('❌ Ingrese un ID de item');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            await cartService.updateQuantity(
                parseInt(updateForm.itemId),
                parseInt(updateForm.cantidad)
            );
            setMessage(`✅ Cantidad actualizada`);
            setUpdateForm({ itemId: '', cantidad: 1 });
            loadCart();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 5. ELIMINAR ITEM
    const handleDeleteItem = async (e) => {
        e.preventDefault();
        if (!deleteItemId) {
            setError('❌ Ingrese un ID de item');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            await cartService.removeFromCart(parseInt(deleteItemId));
            setMessage(`✅ Item eliminado del carrito`);
            setDeleteItemId('');
            loadCart();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 6. LIMPIAR CARRITO
    const handleClearCart = async () => {
        if (!currentUser) {
            setError('❌ Debe iniciar sesión primero');
            return;
        }
        if (!window.confirm('¿Está seguro de vaciar el carrito?')) return;
        
        clearMessages();
        setLoading(true);
        try {
            await cartService.clearCart();
            setMessage(`✅ Carrito vaciado exitosamente`);
            loadCart();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 7. OBTENER TOTAL
    const handleGetTotal = async () => {
        if (!currentUser) {
            setError('❌ Debe iniciar sesión primero');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const totalAmount = await cartService.getCartTotal();
            setTotal(totalAmount);
            setMessage(`✅ Total del carrito: $${totalAmount.toLocaleString('es-CL')}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 8. OBTENER CANTIDAD DE ITEMS
    const handleGetItemCount = async () => {
        if (!currentUser) {
            setError('❌ Debe iniciar sesión primero');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const count = await cartService.getCartItemCount();
            setItemCount(count);
            setMessage(`✅ Cantidad de items en el carrito: ${count}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="test-carrito-page py-4">
            <h1 className="text-center mb-4">🧪 Panel de Pruebas - API de Carrito</h1>
            <p className="text-center text-muted mb-4">
                Prueba todas las funcionalidades del carrito de compras
            </p>

            {/* Usuario actual */}
            {currentUser ? (
                <Alert variant="success" className="text-center">
                    👤 Usuario: <strong>{currentUser.nombre}</strong> | 
                    🛒 Items: <strong>{itemCount}</strong> | 
                    💰 Total: <strong>${total.toLocaleString('es-CL')}</strong>
                </Alert>
            ) : (
                <Alert variant="warning" className="text-center">
                    ⚠️ Debes iniciar sesión para usar el carrito. 
                    <a href="/test-usuarios" className="ms-2">Ir a Test de Usuarios</a>
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
                                <Button 
                                    variant="outline-primary" 
                                    onClick={loadCart} 
                                    disabled={loading || !currentUser}
                                >
                                    Ver Mi Carrito
                                </Button>
                                <Button 
                                    variant="outline-info" 
                                    onClick={handleGetTotal} 
                                    disabled={loading || !currentUser}
                                >
                                    Obtener Total
                                </Button>
                                <Button 
                                    variant="outline-success" 
                                    onClick={handleGetItemCount} 
                                    disabled={loading || !currentUser}
                                >
                                    Obtener Cantidad de Items
                                </Button>
                            </div>

                            <hr />

                            <Form onSubmit={handleGetCartByUserId}>
                                <Form.Label><strong>Consultar carrito por Usuario ID:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="number"
                                        placeholder="ID del usuario"
                                        value={userIdForQuery}
                                        onChange={(e) => setUserIdForQuery(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* ACTUALIZAR CANTIDAD */}
                    <Card className="mb-3">
                        <Card.Header className="bg-warning">
                            <h5 className="mb-0">✏️ Actualizar Cantidad (PUT)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdateQuantity}>
                                <Form.Group className="mb-2">
                                    <Form.Label>ID del item*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="ID del item en el carrito"
                                        value={updateForm.itemId}
                                        onChange={(e) => setUpdateForm({...updateForm, itemId: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nueva cantidad*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="1"
                                        value={updateForm.cantidad}
                                        onChange={(e) => setUpdateForm({...updateForm, cantidad: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="warning" className="w-100" disabled={loading}>
                                    Actualizar Cantidad
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* ELIMINAR ITEM */}
                    <Card className="mb-3">
                        <Card.Header className="bg-danger text-white">
                            <h5 className="mb-0">🗑️ Eliminar Item (DELETE)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleDeleteItem}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ID del item*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="ID del item"
                                        value={deleteItemId}
                                        onChange={(e) => setDeleteItemId(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="danger" className="w-100 mb-2" disabled={loading}>
                                    Eliminar Item
                                </Button>
                            </Form>
                            <Button 
                                variant="outline-danger" 
                                className="w-100"
                                onClick={handleClearCart}
                                disabled={loading || !currentUser}
                            >
                                Vaciar Todo el Carrito
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* PANEL DE AGREGAR */}
                <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">➕ Agregar Item al Carrito (POST)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleAddItem}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Código del producto*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="TRT001"
                                        value={addItemForm.productoCode}
                                        onChange={(e) => setAddItemForm({...addItemForm, productoCode: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nombre del producto*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Torta de Chocolate"
                                        value={addItemForm.productoNombre}
                                        onChange={(e) => setAddItemForm({...addItemForm, productoNombre: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Precio CLP*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="15000"
                                                value={addItemForm.precioCLP}
                                                onChange={(e) => setAddItemForm({...addItemForm, precioCLP: e.target.value})}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Cantidad*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                placeholder="1"
                                                value={addItemForm.cantidad}
                                                onChange={(e) => setAddItemForm({...addItemForm, cantidad: e.target.value})}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-2">
                                    <Form.Label>Stock disponible*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="10"
                                        value={addItemForm.stockDisponible}
                                        onChange={(e) => setAddItemForm({...addItemForm, stockDisponible: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Imagen (opcional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="producto.jpg"
                                        value={addItemForm.productoImagen}
                                        onChange={(e) => setAddItemForm({...addItemForm, productoImagen: e.target.value})}
                                    />
                                </Form.Group>
                                <Button 
                                    type="submit" 
                                    variant="success" 
                                    className="w-100" 
                                    disabled={loading || !currentUser}
                                >
                                    {loading ? 'Agregando...' : 'Agregar al Carrito'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Info de conexión */}
                    <Card className="mb-3">
                        <Card.Header className="bg-secondary text-white">
                            <h5 className="mb-0">🔌 Estado de Conexión</h5>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Endpoint API:</strong> <code>{API_URL}</code></p>
                            <p><strong>Swagger UI:</strong> <a href="http://localhost:8083/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                                http://localhost:8083/swagger-ui.html
                            </a></p>
                            {currentUser && (
                                <>
                                    <p><strong>Usuario actual ID:</strong> <code>{currentUser.id}</code></p>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="w-100"
                                        onClick={loadCart}
                                    >
                                        Probar Conexión con BD
                                    </Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* RESULTADOS */}
            <Card>
                <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">🛒 Items en el Carrito ({cartItems.length})</h5>
                    <div>
                        <Badge bg="info" className="me-2">Total: ${total.toLocaleString('es-CL')}</Badge>
                        <Badge bg="success">Items: {itemCount}</Badge>
                    </div>
                </Card.Header>
                <Card.Body>
                    {loading && <p className="text-center">Cargando...</p>}
                    {!loading && cartItems.length === 0 && (
                        <p className="text-center text-muted">El carrito está vacío. Agrega productos para probar.</p>
                    )}
                    {!loading && cartItems.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Precio Unit.</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Stock Disp.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td><code>{item.id}</code></td>
                                            <td><code>{item.productoCode}</code></td>
                                            <td>{item.productoNombre}</td>
                                            <td>${item.precioCLP?.toLocaleString('es-CL')}</td>
                                            <td>
                                                <Badge bg="primary">{item.cantidad}</Badge>
                                            </td>
                                            <td>
                                                <strong>${(item.precioCLP * item.cantidad).toLocaleString('es-CL')}</strong>
                                            </td>
                                            <td>
                                                <Badge bg={item.stockDisponible > 0 ? 'success' : 'danger'}>
                                                    {item.stockDisponible}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="table-info">
                                        <td colSpan="5" className="text-end"><strong>TOTAL:</strong></td>
                                        <td colSpan="2"><strong>${total.toLocaleString('es-CL')}</strong></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}
