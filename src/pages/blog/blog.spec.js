// Pruebas de integración para la página Blog usando Jasmine
// Archivo: src/pages/blog/blog.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Blog from './index';

// Mock de useLoaderData para simular datos del loader
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => ({
    articles: [
      {
        id: 1,
        slug: 'consejos-conservar-postres',
        titulo: 'Consejos para Conservar Postres',
        descripcion: 'Aprende las mejores técnicas',
        categoria: 'Consejos',
        fecha: '2025-01-15',
        autor: 'María González',
        imagen: '/images/blog/postres.jpg'
      },
      {
        id: 2,
        slug: 'receta-torta-chocolate',
        titulo: 'Receta de Torta de Chocolate',
        descripcion: 'La mejor torta de chocolate',
        categoria: 'Recetas',
        fecha: '2025-01-10',
        autor: 'Chef Pedro',
        imagen: '/images/blog/chocolate.jpg'
      }
    ],
    categories: ['Todas', 'Recetas', 'Consejos', 'Eventos']
  })
}));

// Mock de componentes
jest.mock('../../components/root/BlogComponents', () => ({
  BlogHero: () => <div data-testid="blog-hero">Blog Hero</div>,
  CategoryFilter: ({ categories, activeCategory, onCategoryChange }) => (
    <div data-testid="category-filter">
      {categories.map(cat => (
        <button key={cat} onClick={() => onCategoryChange(cat)}>
          {cat}
        </button>
      ))}
    </div>
  ),
  BlogGrid: ({ articles }) => (
    <div data-testid="blog-grid">
      {articles.map(article => (
        <div key={article.id}>{article.titulo}</div>
      ))}
    </div>
  )
}));

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Página Blog - Integración', () => {
  
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
    
    it('debe renderizar el elemento principal main', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main).toBeTruthy();
    });
    
    it('debe tener la clase CSS correcta', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main.blog-page');
      expect(main).toBeTruthy();
    });
    
    it('debe renderizar el hero del blog', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const hero = container.querySelector('[data-testid="blog-hero"]');
      expect(hero).toBeTruthy();
    });
    
    it('debe renderizar el filtro de categorías', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const filter = container.querySelector('[data-testid="category-filter"]');
      expect(filter).toBeTruthy();
    });
    
    it('debe renderizar la grilla de artículos', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const grid = container.querySelector('[data-testid="blog-grid"]');
      expect(grid).toBeTruthy();
    });
    
  });
  
  describe('Funcionalidad del blog', () => {
    
    it('debe mostrar artículos del loader', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('Consejos para Conservar Postres');
      expect(container.textContent).toContain('Receta de Torta de Chocolate');
    });
    
    it('debe tener filtros de categoría', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Uso de React Router Loader', () => {
    
    it('debe usar useLoaderData para obtener artículos', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      // Verificar que los datos del loader se están usando
      const grid = container.querySelector('[data-testid="blog-grid"]');
      expect(grid).toBeTruthy();
      expect(grid.children.length).toBe(2);
    });
    
  });
  
  describe('Accesibilidad', () => {
    
    it('debe usar elemento semántico main', () => {
      render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main.tagName).toBe('MAIN');
    });
    
  });
  
});
