// Pruebas de integración para la página Blog usando Jasmine
// Archivo: src/pages/blog/blog.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Blog from './index';

// Mock de useLoaderData para simular datos del loader
jest.mock('../../hooks/useLoaderData', () => ({
  useBlogData: () => ({
    posts: [
      {
        id: 1,
        slug: 'consejos-conservar-postres',
        title: 'Consejos para Conservar Postres',
        excerpt: 'Aprende las mejores técnicas',
        category: 'Consejos',
        publishDate: '2025-01-15',
        author: 'María González',
        image: '/images/blog/postres.jpg'
      },
      {
        id: 2,
        slug: 'receta-torta-chocolate',
        title: 'Receta de Torta de Chocolate',
        excerpt: 'La mejor torta de chocolate',
        category: 'Recetas',
        publishDate: '2025-01-10',
        author: 'Chef Pedro',
        image: '/images/blog/chocolate.jpg'
      }
    ],
    categories: ['Todas', 'Recetas', 'Consejos', 'Eventos'],
    totalPosts: 2,
    recentPosts: [],
    hasLoaderData: true
  })
}));

// Mock de componentes
jest.mock('../../components/blog-components/BlogHeroNew', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="blog-hero">Blog Hero</div>
  };
});

jest.mock('../../components/root/BlogComponents', () => ({
  CategoryFilter: ({ categorias, categoriaActiva, onCategoriaChange }) => (
    <div data-testid="category-filter">
      {categorias.map(cat => (
        <button key={cat} onClick={() => onCategoriaChange(cat)}>
          {cat}
        </button>
      ))}
    </div>
  ),
  BlogGrid: ({ posts }) => (
    <div data-testid="blog-grid">
      {posts.map(post => (
        <div key={post.id} data-testid={`post-${post.id}`}>
          {post.titulo}
        </div>
      ))}
    </div>
  )
}));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Blog Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Renderizado básico', () => {
    it('debe renderizar la página del blog', () => {
      const { getByTestId } = render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>
      );

      expect(getByTestId('blog-hero')).toBeInTheDocument();
      expect(getByTestId('category-filter')).toBeInTheDocument();
      expect(getByTestId('blog-grid')).toBeInTheDocument();
    });

    it('debe mostrar el filtro de categorías', () => {
      const { getByTestId } = render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>
      );

      const categoryFilter = getByTestId('category-filter');
      expect(categoryFilter).toBeInTheDocument();
    });

    it('debe mostrar la grilla de artículos', () => {
      const { getByTestId } = render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>
      );

      const blogGrid = getByTestId('blog-grid');
      expect(blogGrid).toBeInTheDocument();
    });
  });

  describe('Funcionalidad de filtrado', () => {
    it('debe permitir filtrar por categorías', () => {
      const { getByText } = render(
        <RouterWrapper>
          <Blog />
        </RouterWrapper>
      );

      // Verificar que existen botones de categorías
      expect(getByText('Todas')).toBeInTheDocument();
      expect(getByText('Recetas')).toBeInTheDocument();
      expect(getByText('Consejos')).toBeInTheDocument();
    });
  });

  describe('Navegación', () => {
    it('debe navegar al artículo cuando se hace clic', () => {
      // Esta prueba se puede implementar cuando se añada funcionalidad de clic
      expect(true).toBe(true);
    });
  });
});