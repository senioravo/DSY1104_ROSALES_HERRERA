// Test simple para verificar que Jasmine + Karma + React funcionan
import React from 'react';
import { createRoot } from 'react-dom/client';

describe('Test Simple - Verificación del Sistema', () => {
    let container = null;
    let root = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        container.remove();
        container = null;
        root = null;
    });

    it('debería poder crear un componente React simple', (done) => {
        const SimpleComponent = () => <div data-testid="simple">¡Hola Mundo!</div>;
        
        root.render(<SimpleComponent />);
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const element = container.querySelector('[data-testid="simple"]');
            expect(element).not.toBeNull();
            expect(element && element.textContent).toBe('¡Hola Mundo!');
            done();
        }, 10);
    });

    it('debería poder hacer assertions básicas', () => {
        expect(1 + 1).toBe(2);
        expect('hola').toBe('hola');
        expect(true).toBeTruthy();
        expect(false).toBeFalsy();
    });

    it('debería poder trabajar con arrays', () => {
        const array = [1, 2, 3];
        expect(array.length).toBe(3);
        expect(array).toContain(2);
    });

    it('debería poder trabajar con objetos', () => {
        const objeto = { nombre: 'Test', activo: true };
        expect(objeto.nombre).toBe('Test');
        expect(objeto.activo).toBeTruthy();
        expect(objeto).toEqual(jasmine.objectContaining({ nombre: 'Test' }));
    });
});