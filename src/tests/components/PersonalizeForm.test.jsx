import React from 'react';
import { createRoot } from 'react-dom/client';
import PersonalizeForm from '../../../components/personalize-components/PersonalizeForm.jsx';
import { authService } from '../../../services/authService.js';
import { customOrderService } from '../../../services/customOrderService.js';

// Mock de los servicios
jest.mock('../../../services/authService.js');
jest.mock('../../../services/customOrderService.js');

describe('PersonalizeForm Component', () => {
    let container = null;
    let root = null;
    let mockOnSuccess = null;
    let mockOnError = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
        
        // Mocks de las funciones callback
        mockOnSuccess = jest.fn();
        mockOnError = jest.fn();
        
        // Mock del authService
        authService.getCurrentUser = jest.fn().mockReturnValue(null);
        
        // Mock del customOrderService
        customOrderService.createOrder = jest.fn().mockReturnValue({
            success: true,
            message: 'Orden creada exitosamente'
        });
        
        // Mock del addEventListener para sessionUpdated
        global.addEventListener = jest.fn();
        global.removeEventListener = jest.fn();
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        container.remove();
        container = null;
        root = null;
        
        // Limpiar mocks
        jest.clearAllMocks();
    });

    function renderComponent(props = {}) {
        return new Promise(resolve => {
            const defaultProps = {
                onSuccess: mockOnSuccess,
                onError: mockOnError
            };
            root.render(<PersonalizeForm {...defaultProps} {...props} />);
            setTimeout(resolve, 100);
        });
    }

    it('debería renderizarse sin errores', (done) => {
        renderComponent().then(() => {
            expect(container.querySelector('form')).toBeTruthy();
            done();
        });
    });

    it('debería mostrar las 4 secciones del formulario', (done) => {
        renderComponent().then(() => {
            const sections = container.querySelectorAll('.form-section');
            expect(sections.length).toBe(4);
            
            const sectionTitles = container.querySelectorAll('.section-title');
            expect(sectionTitles[0].textContent).toContain('1. Selecciona tu Producto');
            expect(sectionTitles[1].textContent).toContain('2. Datos de Contacto');
            expect(sectionTitles[2].textContent).toContain('3. Opciones de Personalización');
            expect(sectionTitles[3].textContent).toContain('4. Descripción Adicional');
            done();
        });
    });

    it('debería mostrar el select de productos con opciones', (done) => {
        renderComponent().then(() => {
            const productSelect = container.querySelector('select[value=""]');
            expect(productSelect).toBeTruthy();
            
            const options = productSelect.querySelectorAll('option');
            expect(options.length).toBeGreaterThan(1); // Al menos la opción placeholder + productos
            expect(options[0].textContent).toBe('Selecciona un producto...');
            done();
        });
    });

    it('debería mostrar los campos de contacto requeridos', (done) => {
        renderComponent().then(() => {
            // Verificar campos de contacto
            const nombreInput = container.querySelector('input[name="nombre"]');
            const telefonoInput = container.querySelector('input[name="telefono"]');
            const emailInput = container.querySelector('input[name="email"]');
            
            expect(nombreInput).toBeTruthy();
            expect(telefonoInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            
            // Verificar que son requeridos
            expect(nombreInput.required).toBe(true);
            expect(telefonoInput.required).toBe(true);
            expect(emailInput.required).toBe(true);
            done();
        });
    });

    it('debería mostrar los iconos en los InputGroups', (done) => {
        renderComponent().then(() => {
            const inputGroups = container.querySelectorAll('.input-group');
            expect(inputGroups.length).toBeGreaterThanOrEqual(3); // nombre, teléfono, email mínimo
            
            // Verificar que cada InputGroup tiene un icono
            inputGroups.forEach(group => {
                const icon = group.querySelector('.input-group-text svg');
                expect(icon).toBeTruthy();
            });
            done();
        });
    });

    it('debería mostrar checkboxes de personalización', (done) => {
        renderComponent().then(() => {
            const checkboxes = container.querySelectorAll('input[type="checkbox"]');
            const expectedCheckboxes = [
                'decoracionTematica',
                'colorPersonalizado', 
                'frutasFrescas',
                'sinAzucar',
                'sinGluten',
                'vegano'
            ];
            
            expect(checkboxes.length).toBe(expectedCheckboxes.length);
            
            expectedCheckboxes.forEach(name => {
                const checkbox = container.querySelector(`input[name="${name}"]`);
                expect(checkbox).toBeTruthy();
                expect(checkbox.type).toBe('checkbox');
            });
            done();
        });
    });

    it('debería mostrar el textarea de descripción', (done) => {
        renderComponent().then(() => {
            const textarea = container.querySelector('textarea[name="descripcion"]');
            expect(textarea).toBeTruthy();
            expect(textarea.required).toBe(true);
            expect(textarea.rows).toBe(4);
            done();
        });
    });

    it('debería mostrar el botón de envío', (done) => {
        renderComponent().then(() => {
            const submitButton = container.querySelector('button[type="submit"]');
            expect(submitButton).toBeTruthy();
            expect(submitButton.textContent).toBe('Enviar Solicitud');
            expect(submitButton.classList.contains('submit-btn')).toBe(true);
            done();
        });
    });

    it('debería deshabilitar campos cuando hay usuario logueado', (done) => {
        // Mock usuario logueado
        authService.getCurrentUser.mockReturnValue({
            nombre: 'Usuario Test',
            email: 'test@example.com'
        });
        
        renderComponent().then(() => {
            const nombreInput = container.querySelector('input[name="nombre"]');
            const emailInput = container.querySelector('input[name="email"]');
            
            expect(nombreInput.disabled).toBe(true);
            expect(emailInput.disabled).toBe(true);
            expect(nombreInput.value).toBe('Usuario Test');
            expect(emailInput.value).toBe('test@example.com');
            done();
        });
    });

    it('debería mostrar validación cuando se envía formulario vacío', (done) => {
        renderComponent().then(() => {
            const form = container.querySelector('form');
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            
            form.dispatchEvent(submitEvent);
            
            setTimeout(() => {
                const form = container.querySelector('form');
                expect(form.classList.contains('was-validated')).toBe(true);
                done();
            }, 50);
        });
    });

    it('debería llamar onSuccess cuando se envía exitosamente', (done) => {
        renderComponent().then(() => {
            // Simular campos llenos y válidos
            const nombreInput = container.querySelector('input[name="nombre"]');
            const telefonoInput = container.querySelector('input[name="telefono"]');
            const emailInput = container.querySelector('input[name="email"]');
            const descripcionTextarea = container.querySelector('textarea[name="descripcion"]');
            const productSelect = container.querySelector('select');
            
            // Llenar campos
            nombreInput.value = 'Test Usuario';
            telefonoInput.value = '+56912345678';
            emailInput.value = 'test@example.com';
            descripcionTextarea.value = 'Descripción de prueba';
            
            // Seleccionar primer producto disponible
            if (productSelect.options.length > 1) {
                productSelect.value = productSelect.options[1].value;
            }
            
            // Simular eventos de cambio
            ['input', 'change'].forEach(eventType => {
                [nombreInput, telefonoInput, emailInput, descripcionTextarea, productSelect].forEach(input => {
                    input.dispatchEvent(new Event(eventType, { bubbles: true }));
                });
            });
            
            const form = container.querySelector('form');
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            
            form.dispatchEvent(submitEvent);
            
            setTimeout(() => {
                expect(customOrderService.createOrder).toHaveBeenCalled();
                expect(mockOnSuccess).toHaveBeenCalled();
                done();
            }, 200);
        });
    });

    it('debería llamar onError cuando hay error en el envío', (done) => {
        // Mock error en el servicio
        customOrderService.createOrder.mockReturnValue({
            success: false,
            message: 'Error de prueba'
        });
        
        renderComponent().then(() => {
            // Simular campos llenos
            const nombreInput = container.querySelector('input[name="nombre"]');
            const telefonoInput = container.querySelector('input[name="telefono"]');
            const emailInput = container.querySelector('input[name="email"]');
            const descripcionTextarea = container.querySelector('textarea[name="descripcion"]');
            
            nombreInput.value = 'Test Usuario';
            telefonoInput.value = '+56912345678';
            emailInput.value = 'test@example.com';
            descripcionTextarea.value = 'Descripción de prueba';
            
            // Disparar eventos
            [nombreInput, telefonoInput, emailInput, descripcionTextarea].forEach(input => {
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
            
            const form = container.querySelector('form');
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            
            form.dispatchEvent(submitEvent);
            
            setTimeout(() => {
                expect(mockOnError).toHaveBeenCalledWith('Error de prueba');
                done();
            }, 200);
        });
    });

    it('debería mostrar checkboxes en sección con fondo lemon-lighter', (done) => {
        renderComponent().then(() => {
            const checkboxesSection = container.querySelector('.checkboxes-section');
            expect(checkboxesSection).toBeTruthy();
            
            const checkboxLabels = checkboxesSection.querySelectorAll('.form-check-label');
            expect(checkboxLabels.length).toBe(6);
            done();
        });
    });
});