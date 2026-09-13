import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Person, 
    Telephone, 
    Envelope, 
    GeoAlt, 
    Truck, 
    Shop,
    CreditCard,
    CheckCircleFill 
} from 'react-bootstrap-icons';
import { cartService } from '../../services/cartService';
import { orderService } from '../../services/orderService';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        note: '',
        deliveryType: '',
        paymentMethod: ''
    });

    const [errors, setErrors] = useState({});

    // Cargar datos del carrito y sesión
    useEffect(() => {
        const loadCheckoutData = async () => {
            const cart = await cartService.getCart();
            if (!cart || cart.length === 0) {
                navigate('/productos');
                return;
            }
            setCartItems(cart);

            // Cargar datos de sesión si existen
            const sessionData = localStorage.getItem('mil_sabores_session');
            if (sessionData) {
                const userData = JSON.parse(sessionData);
                setFormData(prev => ({
                    ...prev,
                    fullName: userData.nombre || '',
                    email: userData.email || ''
                }));
            }
        };
        loadCheckoutData();
    }, [navigate]);

    // Validación de campos
    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = 'El nombre completo es obligatorio';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'El número de contacto es obligatorio';
            } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
                newErrors.phone = 'Ingrese un número válido';
            }
            if (!formData.email.trim()) {
                newErrors.email = 'El correo es obligatorio';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Ingrese un correo válido';
            }
            if (!formData.address.trim()) {
                newErrors.address = 'La dirección es obligatoria';
            }
        }

        if (step === 2) {
            if (!formData.deliveryType) {
                newErrors.deliveryType = 'Seleccione un tipo de entrega';
            }
        }

        if (step === 3) {
            if (!formData.paymentMethod) {
                newErrors.paymentMethod = 'Seleccione un medio de pago';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleOptionSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmitOrder = async () => {
        if (!validateStep(3)) return;

        setLoading(true);

        try {
            const total = await cartService.getCartTotal();
            
            const orderData = {
                customer: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address
                },
                note: formData.note,
                deliveryType: formData.deliveryType,
                paymentMethod: formData.paymentMethod,
                items: cartItems,
                total: total
            };

            // Guardar orden y procesar pago con Transbank
            const result = await orderService.saveOrder(orderData);
            console.log('Resultado procesamiento:', result);

            // Si se debe redirigir a Webpay
            if (result.redirectToWebpay && result.token && result.url) {
                console.log('Redirigiendo a Webpay...');
                // Redirigir a Webpay usando el método del servicio
                orderService.redirectToWebpay(result.token, result.url);
                // El usuario será redirigido a Transbank, no continuar ejecución
            } else if (result.success) {
                // Si es una orden guardada localmente (sin Transbank)
                await cartService.clearCart();
                setLoading(false);
                setShowSuccessModal(true);
            } else {
                throw new Error(result.mensaje || 'Error al procesar la orden');
            }
            
        } catch (error) {
            console.error('Error al procesar orden:', error);
            setLoading(false);
            alert('Error al procesar la orden: ' + error.message + '\nPor favor intente nuevamente.');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    // Calcular total desde los items del carrito
    const total = cartItems.reduce((sum, item) => sum + (item.precioCLP * item.cantidad), 0);

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h1 className="checkout-title">Finalizar Compra</h1>

                {/* Progress Steps */}
                <div className="checkout-progress">
                    <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                        <div className="step-number">1</div>
                        <span>Datos de Contacto</span>
                    </div>
                    <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                        <div className="step-number">2</div>
                        <span>Tipo de Entrega</span>
                    </div>
                    <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <span>Medio de Pago</span>
                    </div>
                </div>

                {/* Content */}
                <div className="checkout-content">
                    {/* Left: Form Cards */}
                    <div>
                        {/* Step 1: Contact Data */}
                        {currentStep === 1 && (
                            <div className="checkout-card">
                                <h2 className="card-title">
                                    <Person className="card-icon" size={28} />
                                    Datos de Contacto
                                </h2>
                                <form className="checkout-form">
                                    <div className="form-group">
                                        <label className="form-label required">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.fullName ? 'error' : ''}`}
                                            placeholder="Ingrese su nombre completo"
                                        />
                                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label required">Número de Contacto</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            placeholder="+56 9 1234 5678"
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label required">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="correo@ejemplo.com"
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label required">Dirección</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`form-input ${errors.address ? 'error' : ''}`}
                                            placeholder="Calle, número, comuna, ciudad"
                                        />
                                        {errors.address && <span className="error-message">{errors.address}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Nota (opcional)</label>
                                        <textarea
                                            name="note"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            className="form-textarea"
                                            placeholder="Instrucciones especiales, preferencias, etc."
                                        />
                                    </div>

                                    <div className="checkout-buttons">
                                        <button type="button" className="btn-checkout btn-next" onClick={handleNext}>
                                            Continuar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 2: Delivery Type */}
                        {currentStep === 2 && (
                            <div className="checkout-card">
                                <h2 className="card-title">
                                    <Truck className="card-icon" size={28} />
                                    Tipo de Entrega
                                </h2>
                                <div className="checkout-form">
                                    <div className="check-options">
                                        <div 
                                            className={`check-option ${formData.deliveryType === 'delivery' ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('deliveryType', 'delivery')}
                                        >
                                            <input
                                                type="radio"
                                                name="deliveryType"
                                                value="delivery"
                                                checked={formData.deliveryType === 'delivery'}
                                                onChange={() => handleOptionSelect('deliveryType', 'delivery')}
                                                className="check-input"
                                            />
                                            <Truck className="check-icon" />
                                            <label className="check-label">
                                                Envío a domicilio
                                                <br />
                                                <small>Entrega en la dirección indicada</small>
                                            </label>
                                        </div>

                                        <div 
                                            className={`check-option ${formData.deliveryType === 'pickup' ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('deliveryType', 'pickup')}
                                        >
                                            <input
                                                type="radio"
                                                name="deliveryType"
                                                value="pickup"
                                                checked={formData.deliveryType === 'pickup'}
                                                onChange={() => handleOptionSelect('deliveryType', 'pickup')}
                                                className="check-input"
                                            />
                                            <Shop className="check-icon" />
                                            <label className="check-label">
                                                Retiro en tienda
                                                <br />
                                                <small>Retira personalmente tu pedido</small>
                                            </label>
                                        </div>
                                    </div>
                                    {errors.deliveryType && <span className="error-message">{errors.deliveryType}</span>}

                                    <div className="checkout-buttons">
                                        <button type="button" className="btn-checkout btn-back" onClick={handleBack}>
                                            Volver
                                        </button>
                                        <button type="button" className="btn-checkout btn-next" onClick={handleNext}>
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment Method */}
                        {currentStep === 3 && (
                            <div className="checkout-card">
                                <h2 className="card-title">
                                    <CreditCard className="card-icon" size={28} />
                                    Medio de Pago
                                </h2>
                                <div className="checkout-form">
                                    {loading ? (
                                        <div className="checkout-loader">
                                            <div className="spinner"></div>
                                            <p className="loader-text">Procesando tu compra...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="check-options">
                                                <div 
                                                    className={`check-option ${formData.paymentMethod === 'debit' ? 'selected' : ''}`}
                                                    onClick={() => handleOptionSelect('paymentMethod', 'debit')}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="debit"
                                                        checked={formData.paymentMethod === 'debit'}
                                                        onChange={() => handleOptionSelect('paymentMethod', 'debit')}
                                                        className="check-input"
                                                    />
                                                    <CreditCard className="check-icon" />
                                                    <label className="check-label">
                                                        Tarjeta de Débito
                                                        <br />
                                                        <small>Pago con tarjeta de débito</small>
                                                    </label>
                                                </div>

                                                <div 
                                                    className={`check-option ${formData.paymentMethod === 'credit' ? 'selected' : ''}`}
                                                    onClick={() => handleOptionSelect('paymentMethod', 'credit')}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="credit"
                                                        checked={formData.paymentMethod === 'credit'}
                                                        onChange={() => handleOptionSelect('paymentMethod', 'credit')}
                                                        className="check-input"
                                                    />
                                                    <CreditCard className="check-icon" />
                                                    <label className="check-label">
                                                        Tarjeta de Crédito
                                                        <br />
                                                        <small>Pago con tarjeta de crédito</small>
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}

                                            <div className="checkout-buttons">
                                                <button type="button" className="btn-checkout btn-back" onClick={handleBack}>
                                                    Volver
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn-checkout btn-next" 
                                                    onClick={handleSubmitOrder}
                                                >
                                                    Continuar al Pago
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="order-summary">
                        <div className="checkout-card">
                            <h2 className="card-title">Resumen del Pedido</h2>
                            <div className="summary-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <div className="item-info">
                                            <div className="item-name">{item.productoNombre}</div>
                                            <div className="item-quantity">Cantidad: {item.cantidad}</div>
                                        </div>
                                        <div className="item-price">
                                            ${(item.precioCLP * item.cantidad).toLocaleString('es-CL')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-total">
                                <span>Total:</span>
                                <span className="total-amount">${total.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="success-modal">
                    <div className="success-content">
                        <CheckCircleFill className="success-icon" />
                        <h2 className="success-title">¡Compra Realizada!</h2>
                        <p className="success-message">Flujo terminado</p>
                        <p>Tu pedido ha sido procesado exitosamente.</p>
                        <button className="btn-close-modal" onClick={handleCloseModal}>
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
