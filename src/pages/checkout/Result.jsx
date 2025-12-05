import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { cartService } from '../../services/cartService';
import './Result.css';

export default function CheckoutResult() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const ventaId = searchParams.get('ventaId');
    const statusParam = searchParams.get('status');
    
    useEffect(() => {
        const processResult = async () => {
            setLoading(true);
            setStatus(statusParam);
            
            // Si el pago fue exitoso, limpiar carrito
            if (statusParam === 'COMPLETADA') {
                try {
                    await cartService.clearCart();
                    console.log('Carrito limpiado exitosamente');
                } catch (error) {
                    console.error('Error al limpiar carrito:', error);
                }
            }
            
            setLoading(false);
        };
        
        processResult();
    }, [statusParam]);
    
    if (loading) {
        return (
            <div className="checkout-result-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Procesando resultado del pago...</p>
                </div>
            </div>
        );
    }
    
    const isSuccess = status === 'COMPLETADA';
    
    return (
        <div className="checkout-result-container">
            <div className="result-card">
                {isSuccess ? (
                    <div className="success-message">
                        <CheckCircleFill size={100} className="icon-success" />
                        <h1>¡Pago Exitoso!</h1>
                        <p className="result-text">
                            Tu orden <strong>#{ventaId}</strong> ha sido procesada correctamente.
                        </p>
                        <p className="result-subtext">
                            Recibirás un correo electrónico con los detalles de tu compra.
                        </p>
                        <div className="button-group">
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/productos')}
                            >
                                Seguir Comprando
                            </button>
                            <button 
                                className="btn btn-outline-secondary btn-lg"
                                onClick={() => navigate('/')}
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="error-message">
                        <XCircleFill size={100} className="icon-error" />
                        <h1>Pago Rechazado</h1>
                        <p className="result-text">
                            No se pudo procesar tu pago.
                        </p>
                        <p className="result-subtext">
                            Puedes intentar nuevamente con otro método de pago o contactar con tu banco.
                        </p>
                        <div className="button-group">
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/cart')}
                            >
                                Volver al Carrito
                            </button>
                            <button 
                                className="btn btn-outline-secondary btn-lg"
                                onClick={() => navigate('/')}
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
