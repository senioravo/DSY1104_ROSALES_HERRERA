// Pruebas de integración para la página Blog usando Jasmine// Pruebas de integración para la página Blog usando Jasmine

// Archivo: src/pages/blog/blog.spec.js// Archivo: src/pages/blog/blog.spec.js



import { render } from '@testing-library/react';import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';import { BrowserRouter } from 'react-router-dom';

import Blog from './index';import Blog from './index';



// Mock de useLoaderData para simular datos del loader// Mock de useLoaderData para simular datos del loader

jest.mock('../../hooks/useLoaderData', () => ({jest.mock('react-router-dom', () => ({

  useBlogData: () => ({  ...jest.requireActual('react-router-dom'),

    posts: [  useLoaderData: () => ({

      {    articles: [

        id: 1,      {

        slug: 'consejos-conservar-postres',        id: 1,

        title: 'Consejos para Conservar Postres',        slug: 'consejos-conservar-postres',

        excerpt: 'Aprende las mejores técnicas',        titulo: 'Consejos para Conservar Postres',

        category: 'Consejos',        descripcion: 'Aprende las mejores técnicas',

        publishDate: '2025-01-15',        categoria: 'Consejos',

        author: 'María González',        fecha: '2025-01-15',

        image: '/images/blog/postres.jpg'        autor: 'María González',

      },        imagen: '/images/blog/postres.jpg'

      {      },

        id: 2,      {

        slug: 'receta-torta-chocolate',        id: 2,

        title: 'Receta de Torta de Chocolate',        slug: 'receta-torta-chocolate',

        excerpt: 'La mejor torta de chocolate',        titulo: 'Receta de Torta de Chocolate',

        category: 'Recetas',        descripcion: 'La mejor torta de chocolate',

        publishDate: '2025-01-10',        categoria: 'Recetas',

        author: 'Chef Pedro',        fecha: '2025-01-10',

        image: '/images/blog/chocolate.jpg'        autor: 'Chef Pedro',

      }        imagen: '/images/blog/chocolate.jpg'

    ],      }

    categories: ['Todas', 'Recetas', 'Consejos', 'Eventos'],    ],

    totalPosts: 2,    categories: ['Todas', 'Recetas', 'Consejos', 'Eventos']

    recentPosts: [],  })

    hasLoaderData: true}));

  })

}));// Mock de componentes

jest.mock('../../components/blog-components/BlogHeroNew', () => ({

// Mock de BlogHeroNew  __esModule: true,

jest.mock('../../components/blog-components/BlogHeroNew', () => ({  default: () => <div data-testid="blog-hero">Blog Hero</div>

  __esModule: true,}));

  default: () => <div data-testid="blog-hero">Blog Hero</div>

}));jest.mock('../../components/root/BlogComponents', () => ({

jest.mock('../../components/root/BlogComponents', () => ({

// Mock de componentes de BlogComponents  CategoryFilter: ({ categorias, categoriaActiva, onCategoriaChange }) => (

jest.mock('../../components/root/BlogComponents', () => ({    <div data-testid="category-filter">

  CategoryFilter: ({ categorias, categoriaActiva, onCategoriaChange }) => (      {categorias.map(cat => (

    <div data-testid="category-filter">        <button key={cat} onClick={() => onCategoriaChange(cat)}>

      {categorias.map(cat => (          {cat}

        <button key={cat} onClick={() => onCategoriaChange(cat)}>        </button>

          {cat}      ))}

        </button>    </div>

      ))}  ),

    </div>  BlogGrid: ({ posts }) => (

  ),    <div data-testid="blog-grid">

  BlogGrid: ({ posts }) => (      {posts.map(post => (

    <div data-testid="blog-grid">        <div key={post.id} data-testid={`post-${post.id}`}>

      {posts.map(post => (          {post.titulo}

        <div key={post.id} data-testid={`post-${post.id}`}>        </div>

          {post.titulo}      ))}

        </div>    </div>

      ))}  )

    </div>}));

  )

}));const RouterWrapper = ({ children }) => {

  return <BrowserRouter>{children}</BrowserRouter>;

const RouterWrapper = ({ children }) => {};

  return <BrowserRouter>{children}</BrowserRouter>;

};describe('Página Blog - Integración', () => {

  

describe('Página Blog - Integración', () => {  let container;

    

  let container;  beforeEach(() => {

      container = document.createElement('div');

  beforeEach(() => {    document.body.appendChild(container);

    container = document.createElement('div');  });

    document.body.appendChild(container);  

  });  afterEach(() => {

      if (container.parentNode) {

  afterEach(() => {      container.parentNode.removeChild(container);

    if (container.parentNode) {    }

      container.parentNode.removeChild(container);  });

    }  

  });  describe('Estructura de la página', () => {

    

  describe('Renderizado de componentes', () => {    it('debe renderizar el elemento principal main', () => {

          render(

    it('debe renderizar el BlogHeroNew', () => {        <RouterWrapper>

      render(          <Blog />

        <RouterWrapper>        </RouterWrapper>, 

          <Blog />        { container }

        </RouterWrapper>,       );

        { container }      

      );      const main = container.querySelector('main');

            expect(main).toBeTruthy();

      const hero = container.querySelector('[data-testid="blog-hero"]');    });

      expect(hero).toBeTruthy();    

    });    it('debe tener la clase CSS correcta', () => {

      render(

    it('debe renderizar el filtro de categorías', () => {        <RouterWrapper>

      render(          <Blog />

        <RouterWrapper>        </RouterWrapper>, 

          <Blog />        { container }

        </RouterWrapper>,       );

        { container }      

      );      const main = container.querySelector('main.blog-page');

            expect(main).toBeTruthy();

      const filter = container.querySelector('[data-testid="category-filter"]');    });

      expect(filter).toBeTruthy();    

    });    it('debe renderizar el hero del blog', () => {

      render(

    it('debe renderizar el grid de artículos', () => {        <RouterWrapper>

      render(          <Blog />

        <RouterWrapper>        </RouterWrapper>, 

          <Blog />        { container }

        </RouterWrapper>,       );

        { container }      

      );      const hero = container.querySelector('[data-testid="blog-hero"]');

            expect(hero).toBeTruthy();

      const grid = container.querySelector('[data-testid="blog-grid"]');    });

      expect(grid).toBeTruthy();    

    });    it('debe renderizar el filtro de categorías', () => {

  });      render(

        <RouterWrapper>

  describe('Funcionalidad de filtrado', () => {          <Blog />

            </RouterWrapper>, 

    it('debe mostrar todas las categorías en el filtro', () => {        { container }

      render(      );

        <RouterWrapper>      

          <Blog />      const filter = container.querySelector('[data-testid="category-filter"]');

        </RouterWrapper>,       expect(filter).toBeTruthy();

        { container }    });

      );    

          it('debe renderizar la grilla de artículos', () => {

      const categoryButtons = container.querySelectorAll('[data-testid="category-filter"] button');      render(

      expect(categoryButtons.length).toBeGreaterThan(0);        <RouterWrapper>

                <Blog />

      // Verificar que incluye "Todas"        </RouterWrapper>, 

      const todasButton = Array.from(categoryButtons).find(btn =>         { container }

        btn.textContent === 'Todas'      );

      );      

      expect(todasButton).toBeTruthy();      const grid = container.querySelector('[data-testid="blog-grid"]');

    });      expect(grid).toBeTruthy();

    });

    it('debe filtrar posts por categoría al hacer click', () => {    

      render(  });

        <RouterWrapper>  

          <Blog />  describe('Funcionalidad del blog', () => {

        </RouterWrapper>,     

        { container }    it('debe mostrar artículos del loader', () => {

      );      render(

              <RouterWrapper>

      // Simular click en una categoría específica          <Blog />

      const categoryButtons = container.querySelectorAll('[data-testid="category-filter"] button');        </RouterWrapper>, 

      const recetasButton = Array.from(categoryButtons).find(btn =>         { container }

        btn.textContent === 'Recetas'      );

      );      

            expect(container.textContent).toContain('Consejos para Conservar Postres');

      if (recetasButton) {      expect(container.textContent).toContain('Receta de Torta de Chocolate');

        recetasButton.click();    });

            

        // Verificar que se actualiza el contenido    it('debe tener filtros de categoría', () => {

        const grid = container.querySelector('[data-testid="blog-grid"]');      render(

        expect(grid).toBeTruthy();        <RouterWrapper>

      }          <Blog />

    });        </RouterWrapper>, 

  });        { container }

      );

  describe('Estructura de página', () => {      

          const buttons = container.querySelectorAll('button');

    it('debe tener la clase blog-page en el main', () => {      expect(buttons.length).toBeGreaterThan(0);

      render(    });

        <RouterWrapper>    

          <Blog />  });

        </RouterWrapper>,   

        { container }  describe('Uso de React Router Loader', () => {

      );    

          it('debe usar useLoaderData para obtener artículos', () => {

      const main = container.querySelector('main.blog-page');      render(

      expect(main).toBeTruthy();        <RouterWrapper>

    });          <Blog />

        </RouterWrapper>, 

    it('debe tener Container de Bootstrap', () => {        { container }

      render(      );

        <RouterWrapper>      

          <Blog />      // Verificar que los datos del loader se están usando

        </RouterWrapper>,       const grid = container.querySelector('[data-testid="blog-grid"]');

        { container }      expect(grid).toBeTruthy();

      );      expect(grid.children.length).toBe(2);

          });

      const container_bootstrap = container.querySelector('.container');    

      expect(container_bootstrap).toBeTruthy();  });

    });  

  });  describe('Accesibilidad', () => {

});    
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
