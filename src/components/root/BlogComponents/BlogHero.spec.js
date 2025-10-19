// Pruebas unitarias para BlogHero usando Jasmine
// Archivo: src/components/root/BlogComponents/BlogHero.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogHero from './BlogHero';

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('BlogHero Component', () => {
  
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
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const heroSection = container.querySelector('.hero-section');
      expect(heroSection).toBeTruthy();
    });
    
    it('debe mostrar el título principal', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const title = container.querySelector('h1');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Blog');
    });
    
    it('debe tener un botón de volver', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const backButton = container.querySelector('.back-button, a[href="/"]');
      expect(backButton).toBeTruthy();
    });
    
    it('debe tener contenido descriptivo', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const text = container.textContent;
      expect(text.length).toBeGreaterThan(10);
    });
    
    it('debe tener iconos decorativos', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const icons = container.querySelectorAll('i[class*="fa"]');
      expect(icons.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Estructura', () => {
    
    it('debe tener contenido de hero', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const heroContent = container.querySelector('.hero-content');
      expect(heroContent).toBeTruthy();
    });
    
    it('debe tener patrón de fondo', () => {
      render(
        <RouterWrapper>
          <BlogHero />
        </RouterWrapper>, 
        { container }
      );
      
      const bgPattern = container.querySelector('.hero-bg-pattern');
      expect(bgPattern).toBeTruthy();
    });
    
  });
  
});
