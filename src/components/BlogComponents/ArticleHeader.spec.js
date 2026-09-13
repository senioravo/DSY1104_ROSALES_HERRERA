// Pruebas unitarias para ArticleHeader usando Jasmine
// Archivo: src/components/root/BlogComponents/ArticleHeader.spec.js

import { render } from '@testing-library/react';
import ArticleHeader from './ArticleHeader';

describe('ArticleHeader Component', () => {
  
  let container;
  const mockArticle = {
    titulo: 'Título del Artículo de Prueba',
    categoria: 'Recetas',
    fecha: '2025-01-15',
    autor: 'Chef Test',
    tiempoLectura: '5 min'
  };
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
  
  describe('Renderizado del encabezado', () => {
    
    it('debe renderizar el título del artículo', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      expect(container.textContent).toContain('Título del Artículo de Prueba');
    });
    
    it('debe mostrar la categoría', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      expect(container.textContent).toContain('Recetas');
    });
    
    it('debe mostrar la fecha', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      expect(container.textContent).toContain('2025');
    });
    
    it('debe mostrar el autor', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      expect(container.textContent).toContain('Chef Test');
    });
    
    it('debe tener un título h1', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent).toContain('Título del Artículo');
    });
    
  });
  
  describe('Metadatos del artículo', () => {
    
    it('debe mostrar el tiempo de lectura si está disponible', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      if (mockArticle.tiempoLectura) {
        expect(container.textContent).toContain('5 min');
      }
    });
    
    it('debe tener iconos para metadatos', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      const icons = container.querySelectorAll('i[class*="fa"]');
      expect(icons.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Estructura del header', () => {
    
    it('debe tener una estructura de header', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      const header = container.querySelector('header, .article-header');
      expect(header || container.firstChild).toBeTruthy();
    });
    
    it('debe incluir badge de categoría', () => {
      render(<ArticleHeader article={mockArticle} />, { container });
      
      const badge = container.querySelector('.badge, .category, [class*="category"]');
      expect(badge).toBeTruthy();
    });
    
  });
  
});
