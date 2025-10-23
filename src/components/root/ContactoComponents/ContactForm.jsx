import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validarEmail, validarTelefono, validarNombre, validarAsunto, validarMensaje } from './FormValidation';
import { authService } from '../../../services/authService';
import UserLogin from '../../root/user/UserLogin';
import './ContactForm.css';

export default function ContactForm({ opcionesAsunto }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        asuntoPersonalizado: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [exito, setExito] = useState('');
    const [mostrarAsuntoPersonalizado, setMostrarAsuntoPersonalizado] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    // Verificar autenticación al cargar el componente
    useEffect(() => {
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            const user = authService.getCurrentUser();
            setIsAuthenticated(authenticated);
            setCurrentUser(user);
            
            // Pre-llenar el formulario con datos del usuario si está autenticado
            if (authenticated && user) {
                setFormData(prev => ({
                    ...prev,
                    nombre: user.nombre || '',
                    email: user.email || ''
                }));
            }
        };
        
        checkAuth();
    }, []);

    // 🔄 USAR OPCIONES DINÁMICAS o fallback estático
    const opcionesAsuntoFinal = opcionesAsunto && opcionesAsunto.length > 0 
        ? opcionesAsunto.map(opcion => opcion.label)
        : [
            'Consulta sobre productos',
            'Pedido personalizado',
            'Cotización',
            'Reclamo',
            'Sugerencia',
            'Otro'
        ];

    const limpiarErrores = () => {
        setErrors({});
        setExito('');
    };

    const mostrarError = (campo, mensaje) => {
        setErrors(prev => ({ ...prev, [campo]: mensaje }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Si cambia el asunto, verificar si es "Otro"
        if (name === 'asunto') {
            setMostrarAsuntoPersonalizado(value === 'Otro');
            if (value !== 'Otro') {
                setFormData(prev => ({ ...prev, asuntoPersonalizado: '' }));
            }
        }

        // Validación en tiempo real
        if (name === 'email' && value.trim()) {
            validarEmail(value, mostrarError);
        }
        if (name === 'telefono' && value.trim()) {
            validarTelefono(value, mostrarError);
        }
    };

    // Manejar login exitoso
    const handleLoginSuccess = (user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        setShowLogin(false);
        setErrors(prev => ({ ...prev, auth: '' })); // Limpiar error de auth
        
        // Pre-llenar formulario con datos del usuario
        setFormData(prev => ({
            ...prev,
            nombre: user.nombre || '',
            email: user.email || ''
        }));
    };

    // Manejar logout
    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        
        // Limpiar formulario
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            asunto: '',
            asuntoPersonalizado: '',
            mensaje: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        limpiarErrores();

        // Verificar autenticación PRIMERO
        if (!isAuthenticated) {
            setShowLogin(true);
            mostrarError('auth', 'Debes iniciar sesión para enviar un mensaje');
            return;
        }

        let valido = true;

        // Validaciones
        if (!validarNombre(formData.nombre, mostrarError)) valido = false;
        if (!validarEmail(formData.email, mostrarError)) valido = false;
        if (!validarTelefono(formData.telefono, mostrarError)) valido = false;
        if (!validarAsunto(formData.asunto, mostrarError)) valido = false;
        
        // Si seleccionó "Otro", validar el asunto personalizado
        if (formData.asunto === 'Otro') {
            if (!validarAsunto(formData.asuntoPersonalizado, mostrarError)) {
                mostrarError('asunto', 'Por favor especifica tu asunto');
                valido = false;
            }
        }
        
        if (!validarMensaje(formData.mensaje, mostrarError)) valido = false;

        if (valido) {
            const asuntoFinal = formData.asunto === 'Otro' 
                ? formData.asuntoPersonalizado 
                : formData.asunto;

            const contactoData = {
                ...formData,
                asunto: asuntoFinal,
                fecha: new Date().toLocaleString(),
                id: Date.now()
            };
            
            const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
            contactos.push(contactoData);
            localStorage.setItem('contactos', JSON.stringify(contactos));

            setExito('¡Mensaje guardado correctamente! Puedes ver todos los mensajes en "Ver Mensajes Guardados".');
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                asuntoPersonalizado: '',
                mensaje: ''
            });
            setMostrarAsuntoPersonalizado(false);

            setTimeout(() => setExito(''), 5000);
        }
    };

    return (
        <section className="contacto-form-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="d-flex justify-content-end mb-3">
                            <Link 
                                to="/mensajes-contacto" 
                                className="btn btn-outline-secondary"
                                style={{
                                    borderColor: 'var(--chocolate)',
                                    color: 'var(--chocolate)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'var(--chocolate)';
                                    e.target.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = 'var(--chocolate)';
                                }}
                            >
                                <i className="fas fa-inbox me-2"></i>
                                Ver Mensajes Guardados
                            </Link>
                        </div>
                        <div className="form-card">
                            {/* Sección de autenticación */}
                            {!isAuthenticated ? (
                                <div className="auth-section mb-4">
                                    <div className="alert alert-warning" style={{ 
                                        backgroundColor: '#fff3cd',
                                        borderColor: '#ffc107',
                                        color: '#856404'
                                    }}>
                                        <i className="fas fa-lock me-2"></i>
                                        <strong>¡Debes iniciar sesión para enviar un mensaje!</strong>
                                        <p className="mb-2 mt-2">Para garantizar la seguridad y poder responderte correctamente, necesitas una cuenta.</p>
                                        <div className="d-flex gap-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-warning btn-sm"
                                                onClick={() => setShowLogin(true)}
                                            >
                                                <i className="fas fa-sign-in-alt me-1"></i>
                                                Iniciar Sesión
                                            </button>
                                            <Link 
                                                to="/register" 
                                                className="btn btn-outline-warning btn-sm"
                                            >
                                                <i className="fas fa-user-plus me-1"></i>
                                                Crear Cuenta
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Modal de login */}
                                    {showLogin && (
                                        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                                <div className="modal-header">
                                                    <h5>Iniciar Sesión</h5>
                                                    <button 
                                                        type="button" 
                                                        className="btn-close"
                                                        onClick={() => setShowLogin(false)}
                                                    ></button>
                                                </div>
                                                <UserLogin 
                                                    onLoginSuccess={handleLoginSuccess}
                                                    embedded={true}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-section mb-4">
                                    <div className="alert alert-success" style={{ 
                                        backgroundColor: '#d1edff',
                                        borderColor: '#0d6efd',
                                        color: '#084298'
                                    }}>
                                        <i className="fas fa-check-circle me-2"></i>
                                        <strong>¡Bienvenido, {currentUser?.nombre}!</strong>
                                        <p className="mb-2 mt-2">Ya puedes enviar tu mensaje. Tu información de contacto se llenará automáticamente.</p>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-out-alt me-1"></i>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}

                            {errors.auth && (
                                <div className="alert alert-danger" style={{ 
                                    backgroundColor: '#f8d7da',
                                    borderColor: '#dc3545',
                                    color: '#721c24'
                                }}>
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    {errors.auth}
                                </div>
                            )}

                            {exito && (
                                <div className="alert alert-success" style={{ 
                                    backgroundColor: 'var(--mint-light)',
                                    borderColor: 'var(--mint)',
                                    color: 'var(--chocolate)'
                                }}>
                                    <i className="fas fa-check-circle me-2"></i>
                                    {exito}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={`contact-form ${!isAuthenticated ? 'disabled' : ''}`}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nombre">
                                                <i className="fas fa-user"></i>
                                                Nombre completo *
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="Tu nombre completo"
                                                disabled={!isAuthenticated}
                                                readOnly={isAuthenticated && currentUser}
                                            />
                                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <i className="fas fa-envelope"></i>
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="tu@email.com"
                                                disabled={!isAuthenticated}
                                                readOnly={isAuthenticated && currentUser}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="telefono">
                                                <i className="fas fa-phone"></i>
                                                Teléfono (opcional)
                                            </label>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="+56 9 1234 5678"
                                                disabled={!isAuthenticated}
                                            />
                                            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="asunto">
                                                <i className="fas fa-tag"></i>
                                                Asunto *
                                            </label>
                                            <select
                                                id="asunto"
                                                name="asunto"
                                                value={formData.asunto}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                disabled={!isAuthenticated}
                                            >
                                                <option value="">Selecciona un asunto</option>
                                                {opcionesAsuntoFinal.map((opcion, index) => (
                                                    <option key={index} value={opcion}>
                                                        {opcion}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
                                        </div>
                                    </div>
                                </div>

                                {mostrarAsuntoPersonalizado && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="asuntoPersonalizado">
                                                    <i className="fas fa-pen"></i>
                                                    Especifica tu asunto *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="asuntoPersonalizado"
                                                    name="asuntoPersonalizado"
                                                    value={formData.asuntoPersonalizado}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    placeholder="Escribe el motivo de tu consulta"
                                                    disabled={!isAuthenticated}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="mensaje">
                                        <i className="fas fa-comment"></i>
                                        Mensaje *
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="5"
                                        placeholder="Escribe aquí tu mensaje..."
                                        disabled={!isAuthenticated}
                                    ></textarea>
                                    <div className="char-counter">
                                        {formData.mensaje.length}/500 caracteres
                                    </div>
                                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                                </div>

                                <div className="form-actions">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-send"
                                        disabled={!isAuthenticated}
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                        {isAuthenticated ? 'Enviar Mensaje' : 'Inicia sesión para enviar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
