import { useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { ROLES } from '../config/appRoles';

/** Roles de app del id token Entra (vacío si no hay sesión o MSAL aún inicia). */
export function useEntraAppRoles() {
    const { instance, accounts, inProgress } = useMsal();

    return useMemo(() => {
        if (inProgress === InteractionStatus.Startup) {
            return [];
        }
        const account = instance.getActiveAccount() ?? accounts[0];
        const roles = account?.idTokenClaims?.roles;
        return Array.isArray(roles) ? roles : [];
    }, [instance, accounts, inProgress]);
}

export function hasEntraRole(appRoles, role) {
    return appRoles.includes(role);
}

export function showAdminNav(appRoles) {
    return hasEntraRole(appRoles, ROLES.ADMIN);
}

export function showSupervisorNav(appRoles) {
    return (
        hasEntraRole(appRoles, ROLES.SUPERVISOR) ||
        hasEntraRole(appRoles, ROLES.ADMIN)
    );
}
