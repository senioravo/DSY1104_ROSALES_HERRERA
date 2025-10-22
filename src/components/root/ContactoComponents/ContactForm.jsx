import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validarEmail, validarTelefono, validarNombre, validarAsunto, validarMensaje } from './FormValidation';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        limpiarErrores();
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

                            <form onSubmit={handleSubmit} className="contact-form">
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
                                    ></textarea>
                                    <div className="char-counter">
                                        {formData.mensaje.length}/500 caracteres
                                    </div>
                                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary btn-send">
                                        <i className="fas fa-paper-plane"></i>
                                        Enviar Mensaje
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
