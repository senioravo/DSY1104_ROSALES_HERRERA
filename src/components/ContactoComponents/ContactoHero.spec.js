// Pruebas unitarias para ContactoHero usando Jasmine
// Archivo: src/components/root/ContactoComponents/ContactoHero.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactoHero from './ContactoHero';

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('ContactoHero Component', () => {
  
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
  
  describe('Renderizado de hero section', () => {
    
    it('debe renderizar la sección hero', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const heroSection = container.querySelector('.hero-section');
      expect(heroSection).toBeTruthy();
    });
    
    it('debe mostrar el título "Contáctanos"', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const title = container.querySelector('h1');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Contáctanos');
    });
    
    it('debe mostrar un subtítulo o descripción', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const description = container.querySelector('p');
      expect(description).toBeTruthy();
      expect(description.textContent.length).toBeGreaterThan(0);
    });
    
    it('debe tener un botón de volver', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const backButton = container.querySelector('.back-button, a[href="/"]');
      expect(backButton).toBeTruthy();
    });
    
    it('debe tener un icono decorativo', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const icon = container.querySelector('i[class*="fa"]');
      expect(icon).toBeTruthy();
    });
    
  });
  
  describe('Estructura y estilos', () => {
    
    it('debe tener contenido de hero', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const heroContent = container.querySelector('.hero-content');
      expect(heroContent).toBeTruthy();
    });
    
    it('debe tener patrón de fondo decorativo', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const bgPattern = container.querySelector('.hero-bg-pattern');
      expect(bgPattern).toBeTruthy();
    });
    
  });
  
  describe('Navegación', () => {
    
    it('debe tener un enlace válido de regreso', () => {
      render(
        <RouterWrapper>
          <ContactoHero />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe('/');
    });
    
  });
  
});
