// Pruebas unitarias para BackButton usando Jasmine
// Archivo: src/components/root/BlogComponents/BackButton.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BackButton from './BackButton';

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('BackButton Component', () => {
  
  let container;
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
  
  describe('Renderizado del botón', () => {
    
    it('debe renderizar un enlace de retorno', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a');
      expect(link).toBeTruthy();
    });
    
    it('debe tener texto de retorno', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const text = container.textContent;
      expect(text.toLowerCase()).toMatch(/volver|regresar|atrás|back/);
    });
    
    it('debe tener un icono', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const icon = container.querySelector('i[class*="fa"]');
      expect(icon).toBeTruthy();
    });
    
    it('debe apuntar a la página del blog', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a');
      expect(link.getAttribute('href')).toContain('blog');
    });
    
  });
  
  describe('Estilos del botón', () => {
    
    it('debe tener clase de estilo', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a');
      expect(link.className).toBeTruthy();
      expect(link.className.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Navegación', () => {
    
    it('debe ser un componente de React Router Link', () => {
      render(
        <RouterWrapper>
          <BackButton />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.tagName).toBe('A');
    });
    
  });
  
});
