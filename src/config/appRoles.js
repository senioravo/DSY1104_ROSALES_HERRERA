/** App roles definidos en Azure Entra (App registration → App roles). */
export const ROLES = {
    CLIENTE: 'CLIENTE',
    SUPERVISOR: 'SUPERVISOR',
    ADMIN: 'ADMIN',
};

/** Comprar y flujo tienda (cliente; admin también puede probar). */
export const CLIENTE_ACCESS = [ROLES.CLIENTE, ROLES.ADMIN];

/** Operación diaria: pedidos / ventas (supervisor; admin incluido). */
export const SUPERVISOR_ACCESS = [ROLES.SUPERVISOR, ROLES.ADMIN];

/** Configuración y APIs internas (solo admin). */
export const ADMIN_ACCESS = [ROLES.ADMIN];
