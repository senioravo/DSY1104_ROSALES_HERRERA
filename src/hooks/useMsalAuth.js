import { useMemo } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

/** Sesión Entra (MSAL) para UI — no usa login legacy email/password. */
export function useMsalAuth() {
    const { instance, accounts, inProgress } = useMsal();

    return useMemo(() => {
        const sessionReady = inProgress !== InteractionStatus.Startup;
        const account = sessionReady
            ? instance.getActiveAccount() ?? accounts[0] ?? null
            : null;
        const isAuthenticated = sessionReady && accounts.length > 0 && Boolean(account);

        return {
            sessionReady,
            isAuthenticated,
            account,
            displayName: account?.name ?? account?.username ?? '',
            email: account?.username ?? '',
        };
    }, [instance, accounts, inProgress]);
}
