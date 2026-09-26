import { useEffect, useMemo, useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest, isMsalConfigured } from '../../config/msalConfig';
import { clearNeonProfile, syncNeonProfileFromApi } from '../../services/neonProfileService';
import { cartService } from '../../services/cartService';

/**
 * Login / logout con Entra ID usando redirect (no popup).
 */
export default function MicrosoftAuthButton({
    onLoginStart,
    onLogoutStart,
    size = 'sm',
    className = '',
}) {
    const { instance, accounts, inProgress } = useMsal();
    const [error, setError] = useState('');

    const account = useMemo(() => {
        return instance.getActiveAccount() ?? accounts[0] ?? null;
    }, [instance, accounts]);

    const sessionReady = inProgress !== InteractionStatus.Startup;
    const isLoggedIn = sessionReady && accounts.length > 0 && account;

    useEffect(() => {
        if (account && !instance.getActiveAccount()) {
            instance.setActiveAccount(account);
        }
    }, [account, instance]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        syncNeonProfileFromApi()
            .then(() => cartService.mergeGuestCartToServer())
            .catch((err) => {
                console.warn('Sync perfil Neon:', err);
                setError(err?.message ?? 'No se pudo vincular tu perfil con Neon.');
            });
    }, [isLoggedIn, account?.homeAccountId]);

    const handleLogin = async () => {
        setError('');
        if (!isMsalConfigured()) {
            setError('Configura .env.local con las variables VITE_AZURE_* (ver .env.example).');
            return;
        }
        onLoginStart?.();
        try {
            await instance.loginRedirect({
                ...loginRequest,
                redirectUri: window.location.origin,
            });
        } catch (err) {
            console.error('MSAL loginRedirect:', err);
            setError('No se pudo iniciar el inicio de sesión con Microsoft.');
        }
    };

    const handleLogout = async () => {
        setError('');
        onLogoutStart?.();
        clearNeonProfile();
        try {
            await instance.logoutRedirect({
                account: account ?? undefined,
                postLogoutRedirectUri: window.location.origin,
            });
        } catch (err) {
            console.error('MSAL logoutRedirect:', err);
            setError('No se pudo cerrar sesión.');
        }
    };

    if (!sessionReady) {
        return (
            <div className="text-center py-2">
                <Spinner animation="border" size="sm" className="me-2" />
                <small className="text-muted">Comprobando sesión…</small>
            </div>
        );
    }

    if (isLoggedIn) {
        return (
            <>
                {error && (
                    <Alert variant="danger" className="mb-2 py-2" dismissible onClose={() => setError('')}>
                        <small>{error}</small>
                    </Alert>
                )}
                <div className="user-profile">
                    <h5 className="user-name">{account.name ?? account.username ?? 'Usuario'}</h5>
                    <p className="user-email mb-2">{account.username}</p>
                    <Button
                        variant="danger"
                        className={`w-100 logout-btn ${className}`}
                        onClick={handleLogout}
                        size={size}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </>
        );
    }

    return (
        <>
            {error && (
                <Alert variant="danger" className="mb-2 py-2" dismissible onClose={() => setError('')}>
                    <small>{error}</small>
                </Alert>
            )}
            <Button
                variant="primary"
                className={`w-100 login-btn ${className}`}
                onClick={handleLogin}
                size={size}
            >
                Iniciar sesión con Microsoft
            </Button>
        </>
    );
}
