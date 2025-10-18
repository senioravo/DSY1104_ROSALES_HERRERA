import { useState } from 'react';
import { validarEmail, validarTelefono, validarNombre, validarAsunto, validarMensaje } from './FormValidation';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [exito, setExito] = useState('');

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
        if (!validarMensaje(formData.mensaje, mostrarError)) valido = false;

        if (valido) {
            const contactoData = {
                ...formData,
                fecha: new Date().toLocaleString(),
                id: Date.now()
            };
            
            const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
            contactos.push(contactoData);
            localStorage.setItem('contactos', JSON.stringify(contactos));

            setExito('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: ''
            });

            setTimeout(() => setExito(''), 5000);
        }
    };

    return (
        <section className="contacto-form-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="form-card">
                            {exito && (
                                <div className="alert alert-success">
                                    <i className="fas fa-check-circle"></i>
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
                                                className={orm-control }
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
                                                className={orm-control }
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
                                                className={orm-control }
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
                                            <input
                                                type="text"
                                                id="asunto"
                                                name="asunto"
                                                value={formData.asunto}
                                                onChange={handleInputChange}
                                                className={orm-control }
                                                placeholder="Motivo de tu consulta"
                                            />
                                            {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
                                        </div>
                                    </div>
                                </div>

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
                                        className={orm-control }
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
