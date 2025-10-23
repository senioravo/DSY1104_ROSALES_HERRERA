import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { PersonCircle, CheckCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = authService.register(
        formData.email,
        formData.password,
        formData.nombre
      );

      if (result.success) {
        setSuccess(true);
        // Redirigir a home después de 2 segundos
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="register-card">
              <Card.Body>
                <div className="register-header">
                  <PersonCircle size={80} className="register-icon" />
                  <h2 className="register-title">Crear Cuenta</h2>
                  <p className="register-subtitle">
                    Únete a Mil Sabores y disfruta de nuestros productos
                  </p>
                </div>

                {success ? (
                  <Alert variant="success" className="text-center">
                    <CheckCircle size={40} className="mb-2" />
                    <h5>¡Registro exitoso!</h5>
                    <p className="mb-0">Redirigiendo a la página principal...</p>
                  </Alert>
                ) : (
                  <>
                    {error && (
                      <Alert variant="danger" dismissible onClose={() => setError('')}>
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          placeholder="Juan Pérez"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Mínimo 6 caracteres"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          minLength={6}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 register-submit-btn"
                        disabled={loading}
                        size="lg"
                      >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                      </Button>
                    </Form>

                    <div className="login-link-container">
                      <p className="text-center mb-0">
                        ¿Ya tienes cuenta?{' '}
                        <a href="/" className="login-link">
                          Inicia sesión
                        </a>
                      </p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
