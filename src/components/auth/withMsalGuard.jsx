import RequireAuth from './RequireAuth';

/** Envuelve una página con el guard de autenticación (y roles opcionales). */
export function withMsalGuard(PageComponent, { roles = null } = {}) {
    return function GuardedPage() {
        return (
            <RequireAuth roles={roles}>
                <PageComponent />
            </RequireAuth>
        );
    };
}
