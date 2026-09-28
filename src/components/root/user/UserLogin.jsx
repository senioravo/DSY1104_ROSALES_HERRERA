import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import MicrosoftAuthButton from '../../auth/MicrosoftAuthButton';
import './UserLogin.css';

export default function UserLogin() {
  const { instance, accounts, inProgress } = useMsal();
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const account = useMemo(
    () => instance.getActiveAccount() ?? accounts[0] ?? null,
    [instance, accounts],
  );
  const sessionReady = inProgress !== InteractionStatus.Startup;
  const isAuthenticated = sessionReady && accounts.length > 0;

  const handleToggle = () => {
    const newShowState = !show;
    setShow(newShowState);
    window.dispatchEvent(new CustomEvent('userLoginToggle', { detail: { show: newShowState } }));
  };

  const handleClose = () => {
    setShow(false);
    window.dispatchEvent(new CustomEvent('userLoginToggle', { detail: { show: false } }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (show) {
        handleClose();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [show]);

  const popover = (
    <Popover id="user-popover" className="user-popover">
      <Popover.Header as="h3">
        {isAuthenticated ? 'Mi perfil' : 'Iniciar sesión'}
      </Popover.Header>
      <Popover.Body>
        <div className="login-form-container">
          <div className="profile-icon text-center mb-2">
            <PersonCircle size={isAuthenticated ? 60 : 40} />
          </div>
          <MicrosoftAuthButton
            onLoginStart={handleClose}
            onLogoutStart={handleClose}
          />
          {!isAuthenticated && sessionReady && (
            <p className="text-muted small mt-3 mb-0 text-center">
              Usa la cuenta Microsoft que te asignó el administrador (Entra ID).
            </p>
          )}
        </div>
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
        title={isAuthenticated ? account?.name ?? 'Mi cuenta' : 'Iniciar sesión'}
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
