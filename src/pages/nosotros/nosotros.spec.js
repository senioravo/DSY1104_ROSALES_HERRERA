// Pruebas de integración para la página Nosotros usando Jasmine
// Archivo: src/pages/nosotros/nosotros.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nosotros from './index';

// Mock de componentes para evitar errores de importación
jest.mock('../../components/root/NosotrosComponents', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
  MissionSection: () => <div data-testid="mission-section">Mission Section</div>,
  TimelineSection: () => <div data-testid="timeline-section">Timeline Section</div>,
  ValuesSection: () => <div data-testid="values-section">Values Section</div>
}));

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Página Nosotros - Integración', () => {
  
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
  
  describe('Estructura de la página', () => {
    
    it('debe renderizar todas las secciones en el orden correcto', () => {
      render(
        <RouterWrapper>
          <Nosotros />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main.nosotros-page');
      expect(main).toBeTruthy();
      
      // Verificar orden de secciones según el cambio reciente
      const sections = main.children;
      expect(sections.length).toBe(4);
      
      // Verificar orden: Hero, Mission, Timeline, Values
      expect(sections[0].getAttribute('data-testid')).toBe('hero-section');
      expect(sections[1].getAttribute('data-testid')).toBe('mission-section');
      expect(sections[2].getAttribute('data-testid')).toBe('timeline-section');
      expect(sections[3].getAttribute('data-testid')).toBe('values-section');
    });
    
    it('debe tener la clase CSS correcta', () => {
      render(
        <RouterWrapper>
          <Nosotros />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main.className).toContain('nosotros-page');
    });
    
  });
  
  describe('Funcionalidad de la página', () => {
    
    it('debe cargar todos los componentes sin errores', () => {
      expect(() => {
        render(
          <RouterWrapper>
            <Nosotros />
          </RouterWrapper>, 
          { container }
        );
      }).not.toThrow();
    });
    
    it('debe tener contenido accesible', () => {
      render(
        <RouterWrapper>
          <Nosotros />
        </RouterWrapper>, 
        { container }
      );
      
      // Verificar que hay contenido de texto
      expect(container.textContent.trim().length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Responsividad y estilos', () => {
    
    it('debe tener estructura responsive', () => {
      render(
        <RouterWrapper>
          <Nosotros />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      
      // Verificar que tiene estructura block apropiada
      const computedStyle = window.getComputedStyle(main);
      expect(['block', 'flex', 'grid']).toContain(computedStyle.display);
    });
    
  });
  
});