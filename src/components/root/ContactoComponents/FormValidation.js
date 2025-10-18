// Dominios permitidos para email
const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'hotmail.com', 'outlook.com'];

export const validarEmail = (email, mostrarError) => {
    if (!email.trim()) {
        mostrarError('email', 'El email es obligatorio');
        return false;
    }
    if (email.length > 100) {
        mostrarError('email', 'Máximo 100 caracteres');
        return false;
    }
    const partes = email.split('@');
    if (partes.length !== 2 || !dominiosPermitidos.includes(partes[1])) {
        mostrarError('email', 'Dominio no permitido. Use: duoc.cl, profesor.duoc.cl, gmail.com, hotmail.com, outlook.com');
        return false;
    }
    return true;
};

export const validarTelefono = (telefono, mostrarError) => {
    if (telefono && telefono.trim()) {
        // Validar formato chileno básico: +56 9 XXXX XXXX o 9 XXXX XXXX
        const telefonoLimpio = telefono.replace(/[\s\-\(\)]/g, '');
        const formatoChileno = /^(\+?56)?9\d{8}$/;
        if (!formatoChileno.test(telefonoLimpio)) {
            mostrarError('telefono', 'Formato inválido. Ej: +56 9 1234 5678 o 9 1234 5678');
            return false;
        }
    }
    return true;
};

export const validarNombre = (nombre, mostrarError) => {
    if (!nombre.trim()) {
        mostrarError('nombre', 'El nombre es obligatorio');
        return false;
    }
    if (nombre.length > 50) {
        mostrarError('nombre', 'Máximo 50 caracteres');
        return false;
    }
    return true;
};

export const validarAsunto = (asunto, mostrarError) => {
    if (!asunto.trim()) {
        mostrarError('asunto', 'El asunto es obligatorio');
        return false;
    }
    if (asunto.length > 100) {
        mostrarError('asunto', 'Máximo 100 caracteres');
        return false;
    }
    return true;
};

export const validarMensaje = (mensaje, mostrarError) => {
    if (!mensaje.trim()) {
        mostrarError('mensaje', 'El mensaje es obligatorio');
        return false;
    }
    if (mensaje.length > 500) {
        mostrarError('mensaje', 'Máximo 500 caracteres');
        return false;
    }
    return true;
};