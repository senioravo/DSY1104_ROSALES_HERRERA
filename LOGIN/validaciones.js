document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const notification = document.getElementById('notification');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Login attempt with:', { email });

        // Get data from the correct key 'usuarios'
        const usuariosData = localStorage.getItem('usuarios');
        console.log('Found usuarios data:', usuariosData);

        if (!usuariosData) {
            showNotification('No hay usuarios registrados', 'error');
            return;
        }

        try {
            const usuarios = JSON.parse(usuariosData);
            console.log('Parsed usuarios:', usuarios);

            const foundUser = usuarios.find(user =>
                user.email.toLowerCase() === email.toLowerCase()
            );

            console.log('Found user:', foundUser);

            if (!foundUser) {
                showNotification('Usuario no existe', 'error');
                return;
            }

            if (foundUser.password !== password) {
                showNotification('Usuario o contraseña incorrecta', 'error');
                return;
            }

            // Success!
            showNotification('¡Inicio de sesión exitoso!', 'success');

            // Store session
            localStorage.setItem('currentUser', JSON.stringify({
                email: foundUser.email,
                nombre: foundUser.nombre,
                apellidos: foundUser.apellidos,
                isLoggedIn: true
            }));

            setTimeout(() => {
                window.location.href = '../HOME/index.html';
            }, 1000);

        } catch (error) {
            console.error('Error validating user:', error);
            showNotification('Error al procesar los datos', 'error');
        }
    });

    function showNotification(message, type) {
        if (!notification) return;
        notification.textContent = message;
        notification.className = `notification ${type}`;

        setTimeout(() => {
            notification.className = 'notification hidden';
        }, 3000);
    }
});