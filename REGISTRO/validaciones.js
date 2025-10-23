document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    const password = document.getElementById('password');
    const codigoPromo = document.getElementById('codigoPromo');
    const exito = document.getElementById('registro-exito');

    // Validación en tiempo real
    email.addEventListener('input', validarEmail);
    password.addEventListener('input', validarPassword);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores();
        let valido = true;

        if (!nombre.value.trim()) {
            mostrarError('nombre', 'El nombre es obligatorio');
            valido = false;
        }
        if (!apellidos.value.trim()) {
            mostrarError('apellidos', 'Los apellidos son obligatorios');
            valido = false;
        }
        if (!validarEmail()) valido = false;
        if (!fechaNacimiento.value) {
            mostrarError('fechaNacimiento', 'La fecha de nacimiento es obligatoria');
            valido = false;
        }
        if (!validarPassword()) valido = false;

        if (valido) {
            // Calcular edad
            const edad = calcularEdad(fechaNacimiento.value);
            // Flags
            const flags = {};
            if (edad >= 50) flags.flag50 = true;
            if (codigoPromo.value.trim().toUpperCase() === 'FELICES50') flags.flag10 = true;

            const dominio = email.value.split('@')[1] || '';
            const hoy = new Date();
            const cumple = new Date(fechaNacimiento.value);
            if (
                (dominio === 'duoc.cl' || dominio === 'profesor.duoc.cl') &&
                hoy.getDate() === cumple.getDate() &&
                hoy.getMonth() === cumple.getMonth()
            ) {
                flags.flagCumple = true;
            }

            // Guardar usuario mock en localStorage
            const usuario = {
                nombre: nombre.value.trim(),
                apellidos: apellidos.value.trim(),
                email: email.value.trim(),
                fechaNacimiento: fechaNacimiento.value,
                password: password.value,
                codigoPromo: codigoPromo.value.trim(),
                edad,
                ...flags
            };
            let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            exito.textContent = '¡Registro exitoso! Beneficios aplicados: ' + Object.keys(flags).join(', ');
            form.reset();
        }
    });

    function mostrarError(campo, mensaje) {
        document.getElementById('error-' + campo).textContent = mensaje;
    }

    function limpiarErrores() {
        ['nombre', 'apellidos', 'email', 'fechaNacimiento', 'password', 'codigoPromo'].forEach(id => {
            mostrarError(id, '');
        });
        exito.textContent = '';
    }

    function validarEmail() {
        const val = email.value.trim();
        const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
        let valido = true;
        if (!val) {
            mostrarError('email', 'El email es obligatorio');
            valido = false;
        } else if (val.length > 100) {
            mostrarError('email', 'Máximo 100 caracteres');
            valido = false;
        } else {
            const partes = val.split('@');
            if (partes.length !== 2 || !dominiosPermitidos.includes(partes[1])) {
                mostrarError('email', 'Dominio no permitido');
                valido = false;
            }
        }
        if (valido) mostrarError('email', '');
        return valido;
    }

    function validarPassword() {
        const val = password.value;
        if (!val) {
            mostrarError('password', 'La contraseña es obligatoria');
            return false;
        }
        if (val.length < 4 || val.length > 10) {
            mostrarError('password', 'Debe tener entre 4 y 10 caracteres');
            return false;
        }
        mostrarError('password', '');
        return true;
    }

    function calcularEdad(fecha) {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }
});