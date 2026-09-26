import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import LoadingSpinner from '../common/LoadingSpinner';
import MicrosoftAuthButton from './MicrosoftAuthButton';

function resolveAccount(instance, accounts) {
    return instance.getActiveAccount() ?? accounts[0] ?? null;
}

function getEntraRoles(account) {
    const roles = account?.idTokenClaims?.roles;
    return Array.isArray(roles) ? roles : [];
}

/**
 * Guard de ruta (equivalente a canActivate en Angular).
 * - Sin sesión Entra → pantalla con login Microsoft.
 * - Con roles requeridos → valida claim "roles" del id token (app roles Azure).
 */
export default function RequireAuth({ children, roles = null }) {
    const { instance, accounts, inProgress } = useMsal();
    const location = useLocation();

    const account = useMemo(
        () => resolveAccount(instance, accounts),
        [instance, accounts],
    );

    useEffect(() => {
        if (account && !instance.getActiveAccount()) {
            instance.setActiveAccount(account);
        }
    }, [account, instance]);

    if (inProgress === InteractionStatus.Startup) {
        return <LoadingSpinner message="Comprobando sesión…" />;
    }

    const isAuthenticated = accounts.length > 0 && Boolean(account);

    if (!isAuthenticated) {
        return (
            <Container className="py-5" style={{ maxWidth: 480 }}>
                <Alert variant="warning">
                    <Alert.Heading>Acceso requerido</Alert.Heading>
                    <p className="mb-0">
                        Para ver <strong>{location.pathname}</strong> debes iniciar sesión con Microsoft
                        (Entra ID).
                    </p>
                </Alert>
                <MicrosoftAuthButton className="mb-3" />
                <Button as={Link} to="/" variant="outline-secondary" className="w-100">
                    Volver al inicio
                </Button>
            </Container>
        );
    }

    if (roles?.length) {
        const userRoles = getEntraRoles(account);
        const allowed = roles.some((role) => userRoles.includes(role));
        if (!allowed) {
            return (
                <Container className="py-5" style={{ maxWidth: 520 }}>
                    <Alert variant="danger">
                        <Alert.Heading>Sin permiso</Alert.Heading>
                        <p className="mb-2">
                            Tu cuenta (<strong>{account.username}</strong>) no tiene el rol necesario
                            ({roles.join(' o ')}).
                        </p>
                        <p className="mb-0 small text-muted">
                            Asigna el rol en Azure → Enterprise applications → Usuarios y grupos.
                        </p>
                    </Alert>
                    <Button as={Link} to="/" variant="primary" className="w-100">
                        Ir al inicio
                    </Button>
                </Container>
            );
        }
    }

    return children;
}
