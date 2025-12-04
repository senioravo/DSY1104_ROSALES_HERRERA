import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Alert, Overlay, Popover } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import './UserLogin.css';

export default function UserLogin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const target = useRef(null);

  const handleToggle = () => {
    const newShowState = !show;
    setShow(newShowState);
    
    // Disparar evento para notificar el cambio de estado
    window.dispatchEvent(new CustomEvent('userLoginToggle', { detail: { show: newShowState } }));
    
    if (!newShowState) {
      setError('');
    }
  };

  const handleClose = () => {
    setShow(false);
    setError('');
    setEmail('');
    setPassword('');
    
    // Disparar evento cuando se cierra
    window.dispatchEvent(new CustomEvent('userLoginToggle', { detail: { show: false } }));
  };

  // Cargar sesión al montar y cuando se actualice
  useEffect(() => {
    loadSession();
    
    // Escuchar eventos de actualización de sesión
    const handleSessionUpdate = () => loadSession();
    window.addEventListener('sessionUpdated', handleSessionUpdate);
    
    return () => {
      window.removeEventListener('sessionUpdated', handleSessionUpdate);
    };
  }, []);

  // Cerrar popover cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (show) {
        handleClose();
      }
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [show]); // Dependencia: show

  const loadSession = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setEmail('');
        setPassword('');
        setTimeout(() => handleClose(), 500); // Cerrar después de un momento
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleClose();
  };

  const popover = (
    <Popover id="user-popover" className="user-popover">
      <Popover.Header as="h3">
        {user ? 'Mi Perfil' : 'Iniciar sesión'}
      </Popover.Header>
      <Popover.Body>
        {user ? (
          // Usuario logueado - mostrar perfil
          <div className="user-profile">
            <div className="profile-icon">
              <PersonCircle size={60} />
            </div>
            <h5 className="user-name">{user.nombre}</h5>
            <p className="user-email">{user.email}</p>
            
            <Button 
              variant="danger" 
              className="w-100 logout-btn"
              onClick={handleLogout}
              size="sm"
            >
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          // Usuario no logueado - mostrar formulario de login
          <div className="login-form-container">
            {error && (
              <Alert variant="danger" className="mb-2 py-2" dismissible onClose={() => setError('')}>
                <small>{error}</small>
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-2" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  size="sm"
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-btn"
                disabled={loading}
                size="sm"
              >
                {loading ? 'Iniciando...' : 'Login'}
              </Button>
            </Form>

            <div className="register-link-container">
              <a 
                href="#" 
                className="register-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  navigate('/register');
                }}
              >
                Registrarse en el sistema
              </a>
            </div>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Button 
        ref={target}
        onClick={handleToggle} 
        variant="outline-secondary" 
        className="user-btn"
      >
        <PersonCircle size={24} />
      </Button>

      <Overlay
        show={show}
        target={target.current}
        placement="bottom-end"
        rootClose
        onHide={handleClose}
      >
        {popover}
      </Overlay>
    </>
  );
}
