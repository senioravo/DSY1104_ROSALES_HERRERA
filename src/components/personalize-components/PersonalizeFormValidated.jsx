import { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { PersonFill, TelephoneFill, EnvelopeFill, ChatLeftTextFill, ExclamationTriangleFill, CheckCircleFill } from 'react-bootstrap-icons';
import { PRODUCTS_PS } from '../../data/productos';
import { authService } from '../../services/authService';
import { customOrderService } from '../../services/customOrderService';
import { useFormValidation } from '../../hooks/useFormValidation';

export default function PersonalizeFormValidated({ onSuccess, onError }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        descripcion: '',
        productoCode: '',
        productoNombre: '',
        tamano: '',
        mensaje: '',
        decoracionTematica: false,
        colorPersonalizado: false,
        frutasFrescas: false,
        sinAzucar: false,
        sinGluten: false,
        vegano: false
    });
    const [loading, setLoading] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    // Hook de validación personalizado
    const { errors, validateForm, handleFieldChange, clearErrors, hasErrors } = useFormValidation();

    // Obtener productos personalizables
    const customizableProducts = PRODUCTS_PS.filter(product => product.personalizable);

    // Cargar usuario actual
    useEffect(() => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre: user.nombre,
                email: user.email
            }));
        }

        // Escuchar cambios en la sesión
        const handleSessionUpdate = () => {
            const updatedUser = authService.getCurrentUser();
            setCurrentUser(updatedUser);
            if (updatedUser) {
                setFormData(prev => ({
                    ...prev,
                    nombre: updatedUser.nombre,
                    email: updatedUser.email
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    nombre: '',
                    email: ''
                }));
            }
        };

        window.addEventListener('sessionUpdated', handleSessionUpdate);
        
        return () => {
            window.removeEventListener('sessionUpdated', handleSessionUpdate);
        };
    }, []);

    const handleProductChange = (e) => {
        const productCode = e.target.value;
        setSelectedProduct(productCode);
        
        const product = PRODUCTS_PS.find(p => p.code === productCode);
        
        const newFormData = {
            ...formData,
            productoCode: productCode,
            productoNombre: product ? product.nombre : '',
            tamano: product && product.tamanosDisponibles.length > 0 ? product.tamanosDisponibles[0] : ''
        };
        
        setFormData(newFormData);
        handleFieldChange('productoCode', productCode);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        // Validar campo en tiempo real si ya se intentó enviar
        if (submitAttempted) {
            handleFieldChange(name, fieldValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        // Validar formulario completo
        const isValid = validateForm(formData);
        
        if (!isValid) {
            // Mostrar alerta de errores
            if (onError) {
                onError('Por favor corrige los errores en el formulario');
            }
            return;
        }

        setLoading(true);

        try {
            const result = customOrderService.createOrder(formData);

            if (result.success) {
                // Notificar éxito al componente padre
                if (onSuccess) {
                    onSuccess();
                }
                
                // Reset form después de 3 segundos
                setTimeout(() => {
                    resetForm();
                }, 3000);
            } else {
                const errorMessage = result.message;
                if (onError) {
                    onError(errorMessage);
                }
            }
        } catch (err) {
            const errorMessage = 'Error al enviar la solicitud';
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: currentUser ? currentUser.nombre : '',
            telefono: '',
            email: currentUser ? currentUser.email : '',
            descripcion: '',
            productoCode: '',
            productoNombre: '',
            tamano: '',
            mensaje: '',
            decoracionTematica: false,
            colorPersonalizado: false,
            frutasFrescas: false,
            sinAzucar: false,
            sinGluten: false,
            vegano: false
        });
        setSelectedProduct('');
        setSubmitAttempted(false);
        clearErrors();
    };

    const selectedProductData = PRODUCTS_PS.find(p => p.code === selectedProduct);

    // Función helper para determinar el estado de validación de Bootstrap
    const getValidationState = (fieldName) => {
        if (!submitAttempted) return {};
        
        if (errors[fieldName]) {
            return { isInvalid: true };
        } else if (formData[fieldName] && formData[fieldName].toString().trim() !== '') {
            return { isValid: true };
        }
        
        return {};
    };

    return (
        <Form noValidate onSubmit={handleSubmit}>
            {/* Resumen de errores */}
            {submitAttempted && hasErrors && (
                <Alert variant="danger" className="mb-4">
                    <ExclamationTriangleFill className="me-2" />
                    <strong>Por favor corrige los siguientes errores:</strong>
                    <ul className="mb-0 mt-2">
                        {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>{error}</li>
                        ))}
                    </ul>
                </Alert>
            )}

            {/* Selección de Producto */}
            <div className="form-section">
                <h5 className="section-title">1. Selecciona tu Producto</h5>
                
                <Form.Group className="mb-3">
                    <Form.Label>Producto a Personalizar *</Form.Label>
                    <Form.Select 
                        value={selectedProduct}
                        onChange={handleProductChange}
                        {...getValidationState('productoCode')}
                    >
                        <option value="">Selecciona un producto...</option>
                        {customizableProducts.map(product => (
                            <option key={product.code} value={product.code}>
                                {product.nombre} - ${product.precioCLP.toLocaleString('es-CL')}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.productoCode && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            {errors.productoCode}
                        </Form.Control.Feedback>
                    )}
                    {!errors.productoCode && selectedProduct && (
                        <Form.Control.Feedback type="valid" style={{ display: 'block' }}>
                            <CheckCircleFill className="me-1" />
                            Producto seleccionado correctamente
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {selectedProductData && (
                    <Form.Group className="mb-3">
                        <Form.Label>Tamaño *</Form.Label>
                        <Form.Select 
                            name="tamano"
                            value={formData.tamano}
                            onChange={handleInputChange}
                        >
                            {selectedProductData.tamanosDisponibles.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}
            </div>

            {/* Datos de Contacto */}
            <div className="form-section">
                <h5 className="section-title">2. Datos de Contacto</h5>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>
                            <PersonFill />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre completo"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            disabled={!!currentUser}
                            className={currentUser ? 'text-muted' : ''}
                            {...getValidationState('nombre')}
                        />
                        {errors.nombre && (
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                        )}
                        {!errors.nombre && formData.nombre && !currentUser && (
                            <Form.Control.Feedback type="valid">
                                <CheckCircleFill className="me-1" />
                                Nombre válido
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    {currentUser && (
                        <Form.Text className="text-muted">
                            <CheckCircleFill className="me-1 text-success" />
                            Nombre tomado de tu cuenta
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono de Contacto *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>
                            <TelephoneFill />
                        </InputGroup.Text>
                        <Form.Control
                            type="tel"
                            name="telefono"
                            placeholder="+56 9 1234 5678"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            {...getValidationState('telefono')}
                        />
                        {errors.telefono && (
                            <Form.Control.Feedback type="invalid">
                                {errors.telefono}
                            </Form.Control.Feedback>
                        )}
                        {!errors.telefono && formData.telefono && (
                            <Form.Control.Feedback type="valid">
                                <CheckCircleFill className="me-1" />
                                Teléfono válido
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>
                            <EnvelopeFill />
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!!currentUser}
                            className={currentUser ? 'text-muted' : ''}
                            {...getValidationState('email')}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        )}
                        {!errors.email && formData.email && !currentUser && (
                            <Form.Control.Feedback type="valid">
                                <CheckCircleFill className="me-1" />
                                Correo válido
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    {currentUser && (
                        <Form.Text className="text-muted">
                            <CheckCircleFill className="me-1 text-success" />
                            Correo tomado de tu cuenta
                        </Form.Text>
                    )}
                </Form.Group>
            </div>

            {/* Opciones de Personalización */}
            <div className="form-section">
                <h5 className="section-title">3. Opciones de Personalización</h5>

                {selectedProductData && selectedProductData.maxMsgChars && (
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Mensaje Personalizado 
                            <small className="text-muted"> (máx. {selectedProductData.maxMsgChars} caracteres)</small>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="mensaje"
                            placeholder="Ej: Feliz cumpleaños María"
                            value={formData.mensaje}
                            onChange={handleInputChange}
                            maxLength={selectedProductData.maxMsgChars}
                        />
                        <Form.Text className="text-muted">
                            {formData.mensaje.length}/{selectedProductData.maxMsgChars} caracteres
                        </Form.Text>
                    </Form.Group>
                )}

                <div className="checkboxes-section">
                    <Form.Check
                        type="checkbox"
                        name="decoracionTematica"
                        label="Decoración temática especial"
                        checked={formData.decoracionTematica}
                        onChange={handleInputChange}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        name="colorPersonalizado"
                        label="Color personalizado"
                        checked={formData.colorPersonalizado}
                        onChange={handleInputChange}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        name="frutasFrescas"
                        label="Frutas frescas adicionales"
                        checked={formData.frutasFrescas}
                        onChange={handleInputChange}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        name="sinAzucar"
                        label="Sin azúcar"
                        checked={formData.sinAzucar}
                        onChange={handleInputChange}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        name="sinGluten"
                        label="Sin gluten"
                        checked={formData.sinGluten}
                        onChange={handleInputChange}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        name="vegano"
                        label="Vegano"
                        checked={formData.vegano}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Descripción Adicional */}
            <div className="form-section">
                <h5 className="section-title">4. Descripción Adicional</h5>

                <Form.Group className="mb-4">
                    <Form.Label>Detalles adicionales sobre tu pedido *</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>
                            <ChatLeftTextFill />
                        </InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="descripcion"
                            placeholder="Describe cualquier detalle especial que debamos considerar..."
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            {...getValidationState('descripcion')}
                        />
                        {errors.descripcion && (
                            <Form.Control.Feedback type="invalid">
                                {errors.descripcion}
                            </Form.Control.Feedback>
                        )}
                        {!errors.descripcion && formData.descripcion && (
                            <Form.Control.Feedback type="valid">
                                <CheckCircleFill className="me-1" />
                                Descripción válida
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    <Form.Text className="text-muted">
                        {formData.descripcion.length}/500 caracteres
                    </Form.Text>
                </Form.Group>

                <div className="text-center">
                    <Button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Solicitud'}
                    </Button>
                </div>
            </div>
        </Form>
    );
}