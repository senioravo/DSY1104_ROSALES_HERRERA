import { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { PersonFill, TelephoneFill, EnvelopeFill, ChatLeftTextFill } from 'react-bootstrap-icons';
import { PRODUCTS_PS } from '../../data/productos';
import { authService } from '../../services/authService';
import { customOrderService } from '../../services/customOrderService';

export default function PersonalizeForm({ onSuccess, onError }) {
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
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        
        setFormData(prev => ({
            ...prev,
            productoCode: productCode,
            productoNombre: product ? product.nombre : '',
            tamano: product && product.tamanosDisponibles.length > 0 ? product.tamanosDisponibles[0] : ''
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);
        setError('');

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
                setError(errorMessage);
                if (onError) {
                    onError(errorMessage);
                }
            }
        } catch (err) {
            const errorMessage = 'Error al enviar la solicitud';
            setError(errorMessage);
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
        setValidated(false);
        setError('');
    };

    const selectedProductData = PRODUCTS_PS.find(p => p.code === selectedProduct);

    return (
        <>
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Selección de Producto */}
                <div className="form-section">
                    <h5 className="section-title">1. Selecciona tu Producto</h5>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Producto a Personalizar *</Form.Label>
                        <Form.Select 
                            value={selectedProduct}
                            onChange={handleProductChange}
                            required
                        >
                            <option value="">Selecciona un producto...</option>
                            {customizableProducts.map(product => (
                                <option key={product.code} value={product.code}>
                                    {product.nombre} - ${product.precioCLP.toLocaleString('es-CL')}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Por favor selecciona un producto.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {selectedProductData && (
                        <Form.Group className="mb-3">
                            <Form.Label>Tamaño *</Form.Label>
                            <Form.Select 
                                name="tamano"
                                value={formData.tamano}
                                onChange={handleInputChange}
                                required
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
                        <InputGroup>
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa tu nombre.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono de Contacto *</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <TelephoneFill />
                            </InputGroup.Text>
                            <Form.Control
                                type="tel"
                                name="telefono"
                                placeholder="+56 9 1234 5678"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa tu teléfono.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico *</Form.Label>
                        <InputGroup>
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa un correo válido.
                            </Form.Control.Feedback>
                        </InputGroup>
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
                        <Form.Label>Detalles adicionales sobre tu pedido</Form.Label>
                        <InputGroup>
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor describe tu pedido.
                            </Form.Control.Feedback>
                        </InputGroup>
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
        </>
    );
}