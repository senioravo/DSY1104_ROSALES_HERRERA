import React from 'react';
import { createRoot } from 'react-dom/client';

describe('ProductosComponents - Tests Básicos', () => {
    let container, root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        if (container) {
            container.remove();
        }
        container = null;
        root = null;
    });

    it('debería crear el contenedor de test correctamente', () => {
        expect(container).toBeDefined();
        expect(container.tagName).toBe('DIV');
    });

    it('debería poder renderizar un componente React simple', (done) => {
        const TestComponent = () => React.createElement('div', { 
            'data-testid': 'test-component' 
        }, 'Test Content');
        
        root.render(React.createElement(TestComponent));
        
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const element = container.querySelector('[data-testid="test-component"]');
        expect(element).not.toBeNull();
        expect(element.textContent).toBe('Test Content');
            done();
        }, 10);
    });

    it('debería manejar props correctamente', (done) => {
        const TestComponent = ({ message }) => React.createElement('span', {
            'data-testid': 'message'
        }, message);
        
        root.render(React.createElement(TestComponent, { message: 'Hello Jasmine' }));
        
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const element = container.querySelector('[data-testid="message"]');
            expect(element).not.toBeNull();
        expect(element.textContent).toBe('Hello Jasmine');
            done();
        }, 10);
    });
});