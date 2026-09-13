import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Table } from 'react-bootstrap';
import { productoService } from '../../services/productoService';
import { categoriaService } from '../../services/categoriaService';
import './TestProductos.css';

export default function TestProductos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Estados para formularios de prueba
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productCode, setProductCode] = useState('');
    const [stockValue, setStockValue] = useState('');

    // Estados para crear/actualizar producto
    const [formData, setFormData] = useState({
        code: '',
        nombre: '',
        descripcion: '',
        precioCLP: '',
        stock: '',
        categoriaId: '',
        imagen: '',
        destacado: false,
        activo: true
    });

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const data = await categoriaService.getAll();
            setCategorias(data);
        } catch (err) {
            console.error('Error al cargar categorías:', err);
        }
    };

    const clearMessages = () => {
        setMessage(null);
        setError(null);
    };

    // 1. OBTENER TODOS LOS PRODUCTOS
    const handleGetAll = async () => {
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.getAll();
            setProductos(data);
            setMessage(`✅ Se encontraron ${data.length} productos`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 2. OBTENER PRODUCTOS DESTACADOS
    const handleGetFeatured = async () => {
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.getFeatured();
            setProductos(data);
            setMessage(`✅ Se encontraron ${data.length} productos destacados`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 3. BUSCAR POR NOMBRE
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setError('❌ Ingrese un término de búsqueda');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.searchByName(searchTerm);
            setProductos(data);
            setMessage(`✅ Se encontraron ${data.length} productos con "${searchTerm}"`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 4. BUSCAR POR CATEGORÍA
    const handleSearchByCategory = async (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError('❌ Seleccione una categoría');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.getByCategory(selectedCategory);
            setProductos(data);
            const categoria = categorias.find(c => c.id === parseInt(selectedCategory));
            setMessage(`✅ Se encontraron ${data.length} productos en "${categoria?.nombre}"`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 5. OBTENER POR CÓDIGO
    const handleGetByCode = async (e) => {
        e.preventDefault();
        if (!productCode.trim()) {
            setError('❌ Ingrese un código de producto');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.getByCode(productCode);
            setSelectedProduct(data);
            setProductos([data]);
            setMessage(`✅ Producto encontrado: ${data.nombre}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
            setSelectedProduct(null);
        } finally {
            setLoading(false);
        }
    };

    // 6. ACTUALIZAR STOCK
    const handleUpdateStock = async (e) => {
        e.preventDefault();
        if (!productCode.trim() || !stockValue) {
            setError('❌ Ingrese código y nuevo stock');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const data = await productoService.updateStock(productCode, parseInt(stockValue));
            setMessage(`✅ Stock actualizado: ${data.nombre} - Nuevo stock: ${data.stock}`);
            setSelectedProduct(data);
            handleGetAll(); // Refrescar lista
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 7. CREAR PRODUCTO
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const newProduct = {
                ...formData,
                precioCLP: parseFloat(formData.precioCLP),
                stock: parseInt(formData.stock),
                categoriaId: parseInt(formData.categoriaId)
            };
            const data = await productoService.create(newProduct);
            setMessage(`✅ Producto creado exitosamente: ${data.nombre}`);
            setFormData({
                code: '',
                nombre: '',
                descripcion: '',
                precioCLP: '',
                stock: '',
                categoriaId: '',
                imagen: '',
                destacado: false,
                activo: true
            });
            handleGetAll(); // Refrescar lista
        } catch (err) {
            setError(`❌ Error al crear: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Container fluid className="test-productos-page py-4">
            <h1 className="text-center mb-4">🧪 Panel de Pruebas - API de Productos</h1>
            <p className="text-center text-muted mb-4">
                Prueba todas las funcionalidades de la API de productos desde aquí
            </p>

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
                            {/* Botones rápidos */}
                            <div className="d-grid gap-2 mb-3">
                                <Button variant="outline-primary" onClick={handleGetAll} disabled={loading}>
                                    Ver Todos los Productos
                                </Button>
                                <Button variant="outline-success" onClick={handleGetFeatured} disabled={loading}>
                                    Ver Productos Destacados
                                </Button>
                            </div>

                            <hr />

                            {/* Buscar por nombre */}
                            <Form onSubmit={handleSearch} className="mb-3">
                                <Form.Label><strong>Buscar por nombre:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: torta, pie, kuchen..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>

                            {/* Buscar por categoría */}
                            <Form onSubmit={handleSearchByCategory} className="mb-3">
                                <Form.Label><strong>Buscar por categoría:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Seleccione una categoría...</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                        ))}
                                    </Form.Select>
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>

                            {/* Buscar por código */}
                            <Form onSubmit={handleGetByCode}>
                                <Form.Label><strong>Buscar por código:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: TRT001, PIE002..."
                                        value={productCode}
                                        onChange={(e) => setProductCode(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* ACTUALIZAR STOCK */}
                    <Card className="mb-3">
                        <Card.Header className="bg-warning">
                            <h5 className="mb-0">📦 Actualizar Stock (PATCH)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdateStock}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Código del producto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="TRT001"
                                        value={productCode}
                                        onChange={(e) => setProductCode(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nuevo stock:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        placeholder="10"
                                        value={stockValue}
                                        onChange={(e) => setStockValue(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="warning" className="w-100" disabled={loading}>
                                    Actualizar Stock
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* PANEL DE CREACIÓN */}
                <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">➕ Crear Producto (POST)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleCreateProduct}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Código*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="code"
                                                placeholder="TEST001"
                                                value={formData.code}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Categoría*</Form.Label>
                                            <Form.Select
                                                name="categoriaId"
                                                value={formData.categoriaId}
                                                onChange={handleFormChange}
                                                required
                                            >
                                                <option value="">Seleccione...</option>
                                                {categorias.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-2">
                                    <Form.Label>Nombre*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        placeholder="Torta de Prueba"
                                        value={formData.nombre}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Descripción*</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="descripcion"
                                        placeholder="Descripción del producto..."
                                        value={formData.descripcion}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Precio CLP*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="precioCLP"
                                                placeholder="15000"
                                                value={formData.precioCLP}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Stock*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stock"
                                                placeholder="10"
                                                value={formData.stock}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imagen"
                                        placeholder="producto.jpg"
                                        value={formData.imagen}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>

                                <Form.Check
                                    type="checkbox"
                                    label="Producto destacado"
                                    name="destacado"
                                    checked={formData.destacado}
                                    onChange={handleFormChange}
                                    className="mb-2"
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Producto activo"
                                    name="activo"
                                    checked={formData.activo}
                                    onChange={handleFormChange}
                                    className="mb-3"
                                />

                                <Button type="submit" variant="success" className="w-100" disabled={loading}>
                                    {loading ? 'Creando...' : 'Crear Producto'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* RESULTADOS */}
            <Card>
                <Card.Header className="bg-info text-white">
                    <h5 className="mb-0">📊 Resultados ({productos.length})</h5>
                </Card.Header>
                <Card.Body>
                    {loading && <p className="text-center">Cargando...</p>}
                    {!loading && productos.length === 0 && (
                        <p className="text-center text-muted">No hay productos para mostrar. Realiza una consulta.</p>
                    )}
                    {!loading && productos.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map(prod => (
                                        <tr key={prod.code}>
                                            <td><code>{prod.code}</code></td>
                                            <td>
                                                {prod.nombre}
                                                {prod.destacado && <Badge bg="warning" className="ms-2">⭐</Badge>}
                                            </td>
                                            <td>{prod.categoriaNombre || '-'}</td>
                                            <td>${prod.precioCLP?.toLocaleString('es-CL')}</td>
                                            <td>
                                                <Badge bg={prod.stock > 0 ? 'success' : 'danger'}>
                                                    {prod.stock}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg={prod.activo ? 'success' : 'secondary'}>
                                                    {prod.activo ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Producto seleccionado */}
            {selectedProduct && (
                <Card className="mt-3">
                    <Card.Header className="bg-dark text-white">
                        <h5 className="mb-0">🔍 Producto Seleccionado</h5>
                    </Card.Header>
                    <Card.Body>
                        <pre className="bg-light p-3 rounded">
                            {JSON.stringify(selectedProduct, null, 2)}
                        </pre>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
