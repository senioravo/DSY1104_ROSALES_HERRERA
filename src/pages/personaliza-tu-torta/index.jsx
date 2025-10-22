import { useState } from 'react';
import { Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import PersonalizeForm from '../../components/personalize-components/PersonalizeForm';
import './personaliza.css';

export default function PersonalizaTuTorta() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSuccess = () => {
        setSuccess(true);
        setError('');
        
        // Resetear el estado de éxito después de 3 segundos
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    return (
        <div className="personalize-page">
            <Container>
                <div className="personalize-header">
                    <h1 className="personalize-title">Personaliza tu torta</h1>
                    <p className="personalize-subtitle">
                        Crea un producto único y especial adaptado a tus necesidades
                    </p>
                </div>

                {success ? (
                    <Alert variant="success" className="success-alert">
                        <CheckCircleFill size={40} className="mb-3" />
                        <h4>¡Solicitud enviada exitosamente!</h4>
                        <p>Nos pondremos en contacto contigo pronto para confirmar los detalles.</p>
                    </Alert>
                ) : (
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="personalize-card">
                                <Card.Body>
                                    {error && (
                                        <Alert variant="danger" dismissible onClose={() => setError('')}>
                                            {error}
                                        </Alert>
                                    )}
                                    
                                    <PersonalizeForm 
                                        onSuccess={handleSuccess}
                                        onError={handleError}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}