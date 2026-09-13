import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Table } from 'react-bootstrap';
import { authService } from '../../services/authService';
import API_CONFIG from '../../config/api.config';
import './TestUsuarios.css';

const API_URL = API_CONFIG.USUARIO_SERVICE;

export default function TestUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Estados para formularios
    const [userId, setUserId] = useState('');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [updateForm, setUpdateForm] = useState({
        id: '',
        nombre: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = () => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
    };

    const clearMessages = () => {
        setMessage(null);
        setError(null);
    };

    // 1. OBTENER TODOS LOS USUARIOS
    const handleGetAll = async () => {
        clearMessages();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/usuarios`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) throw new Error('Error al obtener usuarios');

            const data = await response.json();
            setUsuarios(data);
            setMessage(`✅ Se encontraron ${data.length} usuarios`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 2. OBTENER USUARIO POR ID
    const handleGetById = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('❌ Ingrese un ID de usuario');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/usuarios/${userId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) throw new Error('Usuario no encontrado');

            const data = await response.json();
            setSelectedUser(data);
            setUsuarios([data]);
            setMessage(`✅ Usuario encontrado: ${data.nombre}`);
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
            setSelectedUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 3. REGISTRAR USUARIO
    const handleRegister = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const result = await authService.register(
                registerForm.email,
                registerForm.password,
                registerForm.nombre
            );

            if (result.success) {
                setMessage(`✅ Usuario registrado: ${result.user.nombre}`);
                setRegisterForm({ nombre: '', email: '', password: '' });
                loadCurrentUser();
                handleGetAll();
            } else {
                setError(`❌ ${result.message}`);
            }
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 4. LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const result = await authService.login(loginForm.email, loginForm.password);

            if (result.success) {
                setMessage(`✅ Login exitoso: ${result.user.nombre}`);
                setLoginForm({ email: '', password: '' });
                loadCurrentUser();
            } else {
                setError(`❌ ${result.message}`);
            }
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 5. LOGOUT
    const handleLogout = () => {
        authService.logout();
        loadCurrentUser();
        setMessage('✅ Sesión cerrada exitosamente');
    };

    // 6. ACTUALIZAR USUARIO
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateForm.id) {
            setError('❌ Ingrese un ID de usuario');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const body = {
                nombre: updateForm.nombre,
                email: updateForm.email
            };
            if (updateForm.password) {
                body.password = updateForm.password;
            }

            const response = await fetch(`${API_URL}/usuarios/${updateForm.id}`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar usuario');
            }

            const data = await response.json();
            setMessage(`✅ Usuario actualizado: ${data.nombre}`);
            setUpdateForm({ id: '', nombre: '', email: '', password: '' });
            handleGetAll();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 7. ACTUALIZACIÓN PARCIAL (PATCH)
    const handlePatchUpdate = async (e) => {
        e.preventDefault();
        if (!updateForm.id) {
            setError('❌ Ingrese un ID de usuario');
            return;
        }
        clearMessages();
        setLoading(true);
        try {
            const body = {};
            if (updateForm.nombre) body.nombre = updateForm.nombre;
            if (updateForm.email) body.email = updateForm.email;
            if (updateForm.password) body.password = updateForm.password;

            const response = await fetch(`${API_URL}/usuarios/${updateForm.id}`, {
                method: 'PATCH',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar usuario');
            }

            const data = await response.json();
            setMessage(`✅ Usuario actualizado parcialmente: ${data.nombre}`);
            handleGetAll();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 8. ELIMINAR USUARIO
    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;
        
        clearMessages();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) throw new Error('Error al eliminar usuario');

            setMessage(`✅ Usuario eliminado (desactivado) exitosamente`);
            handleGetAll();
        } catch (err) {
            setError(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="test-usuarios-page py-4">
            <h1 className="text-center mb-4">🧪 Panel de Pruebas - API de Usuarios</h1>
            <p className="text-center text-muted mb-4">
                Prueba autenticación y gestión de usuarios
            </p>

            {/* Usuario actual */}
            {currentUser && (
                <Alert variant="info" className="text-center">
                    👤 Sesión activa: <strong>{currentUser.nombre}</strong> ({currentUser.email})
                    <Button variant="link" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
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
                                    Ver Todos los Usuarios
                                </Button>
                            </div>

                            <hr />

                            <Form onSubmit={handleGetById}>
                                <Form.Label><strong>Buscar por ID:</strong></Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="number"
                                        placeholder="ID del usuario"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        Buscar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* LOGIN */}
                    <Card className="mb-3">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">🔐 Login (POST)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="******"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="success" className="w-100" disabled={loading}>
                                    Iniciar Sesión
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* ACTUALIZAR */}
                    <Card className="mb-3">
                        <Card.Header className="bg-warning">
                            <h5 className="mb-0">✏️ Actualizar Usuario (PUT/PATCH)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-2">
                                    <Form.Label>ID del usuario*</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="1"
                                        value={updateForm.id}
                                        onChange={(e) => setUpdateForm({...updateForm, id: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nuevo nombre"
                                        value={updateForm.nombre}
                                        onChange={(e) => setUpdateForm({...updateForm, nombre: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="nuevo@ejemplo.com"
                                        value={updateForm.email}
                                        onChange={(e) => setUpdateForm({...updateForm, email: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nueva contraseña (opcional)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="******"
                                        value={updateForm.password}
                                        onChange={(e) => setUpdateForm({...updateForm, password: e.target.value})}
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="warning" disabled={loading}>
                                        Actualizar Completo (PUT)
                                    </Button>
                                    <Button type="button" variant="outline-warning" onClick={handlePatchUpdate} disabled={loading}>
                                        Actualizar Parcial (PATCH)
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* PANEL DE REGISTRO */}
                <Col lg={6}>
                    <Card className="mb-3">
                        <Card.Header className="bg-info text-white">
                            <h5 className="mb-0">➕ Registrar Usuario (POST)</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nombre completo*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Juan Pérez"
                                        value={registerForm.nombre}
                                        onChange={(e) => setRegisterForm({...registerForm, nombre: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={registerForm.email}
                                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña* (mín. 6 caracteres)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="******"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                                        required
                                        minLength={6}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="info" className="w-100" disabled={loading}>
                                    {loading ? 'Registrando...' : 'Registrar Usuario'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Conexión con BD */}
                    <Card className="mb-3">
                        <Card.Header className="bg-secondary text-white">
                            <h5 className="mb-0">🔌 Estado de Conexión</h5>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Endpoint API:</strong> <code>{API_URL}</code></p>
                            <p><strong>Swagger UI:</strong> <a href="http://localhost:8081/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                                http://localhost:8081/swagger-ui.html
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
            </Row>

            {/* RESULTADOS */}
            <Card>
                <Card.Header className="bg-dark text-white">
                    <h5 className="mb-0">📊 Resultados ({usuarios.length})</h5>
                </Card.Header>
                <Card.Body>
                    {loading && <p className="text-center">Cargando...</p>}
                    {!loading && usuarios.length === 0 && (
                        <p className="text-center text-muted">No hay usuarios para mostrar. Realiza una consulta.</p>
                    )}
                    {!loading && usuarios.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Fecha Registro</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(user => (
                                        <tr key={user.id}>
                                            <td><code>{user.id}</code></td>
                                            <td>{user.nombre}</td>
                                            <td>{user.email}</td>
                                            <td>{new Date(user.fechaRegistro).toLocaleDateString('es-CL')}</td>
                                            <td>
                                                <Badge bg={user.activo ? 'success' : 'secondary'}>
                                                    {user.activo ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-danger"
                                                    onClick={() => handleDelete(user.id)}
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

            {/* Usuario seleccionado */}
            {selectedUser && (
                <Card className="mt-3">
                    <Card.Header className="bg-dark text-white">
                        <h5 className="mb-0">🔍 Usuario Seleccionado</h5>
                    </Card.Header>
                    <Card.Body>
                        <pre className="bg-light p-3 rounded">
                            {JSON.stringify(selectedUser, null, 2)}
                        </pre>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
