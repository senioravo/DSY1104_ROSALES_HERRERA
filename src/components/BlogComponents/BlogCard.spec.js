// Pruebas unitarias para BlogCard usando Jasmine
// Archivo: src/components/root/BlogComponents/BlogCard.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogCard from './BlogCard';

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('BlogCard Component', () => {
  
  let container;
  const mockArticle = {
    slug: 'test-article',
    titulo: 'Artículo de Prueba',
    descripcion: 'Esta es una descripción de prueba',
    imagen: '/images/test.jpg',
    categoria: 'Recetas',
    fecha: '2025-01-15',
    autor: 'Chef Test'
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
  
  describe('Renderizado de tarjeta', () => {
    
    it('debe renderizar el título del artículo', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('Artículo de Prueba');
    });
    
    it('debe renderizar la descripción', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('Esta es una descripción de prueba');
    });
    
    it('debe renderizar la categoría', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('Recetas');
    });
    
    it('debe tener una imagen', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      const img = container.querySelector('img');
      expect(img).toBeTruthy();
    });
    
    it('debe tener un enlace al artículo', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      const link = container.querySelector('a[href*="test-article"]');
      expect(link).toBeTruthy();
    });
    
  });
  
  describe('Estructura de tarjeta', () => {
    
    it('debe usar clases de Bootstrap para tarjetas', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      const card = container.querySelector('.card');
      expect(card).toBeTruthy();
    });
    
    it('debe tener un cuerpo de tarjeta', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      const cardBody = container.querySelector('.card-body');
      expect(cardBody).toBeTruthy();
    });
    
  });
  
  describe('Metadatos del artículo', () => {
    
    it('debe mostrar la fecha', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('2025');
    });
    
    it('debe mostrar el autor', () => {
      render(
        <RouterWrapper>
          <BlogCard article={mockArticle} />
        </RouterWrapper>, 
        { container }
      );
      
      expect(container.textContent).toContain('Chef Test');
    });
    
  });
  
});
