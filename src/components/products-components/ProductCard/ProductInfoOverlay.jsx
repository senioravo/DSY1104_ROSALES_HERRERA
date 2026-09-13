import { useState } from 'react';
import { InfoCircleFill } from 'react-bootstrap-icons';
import './ProductInfoOverlay.css';

export default function ProductInfoOverlay({ description }) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <button
                className="info-button"
                onClick={() => setShowInfo(true)}
                aria-label="Ver información del producto"
            >
                
                <InfoCircleFill size={20} />
                
            </button>
            {showInfo && (
                <div className="info-overlay" onClick={() => setShowInfo(false)}>
                    <div className="info-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="info-close"
                            onClick={() => setShowInfo(false)}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        <h5 className="info-title">Descripción del producto</h5>
                        <p className="info-description">{description}</p>
                    </div>
                </div>
            )}
        </>
    );
}
