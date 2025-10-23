import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductsMenu from '../../components/products-components/ProductsMenu/ProductsMenu';
import ProductsSection from '../../components/products-components/ProductsSection/ProductsSection';
import { PRODUCTS_PS } from '../../data/productos';
import './productos.css';

export default function Productos() {
    const [searchParams] = useSearchParams();
    const categoryFromURL = searchParams.get('categoria');

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromURL || 'all');
    const [filters, setFilters] = useState({
        soloDisponibles: false,
        personalizables: false,
        sinGluten: false,
        vegano: false,
        sinLactosa: false
    });

    // Actualizar categoría si cambia la URL
    useEffect(() => {
        if (categoryFromURL) {
            setSelectedCategory(categoryFromURL);
        }
    }, [categoryFromURL]);

    // Scroll to top cuando cambien los filtros
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [selectedCategory, filters, searchTerm]);

    // Filtrar productos
    const filteredProducts = PRODUCTS_PS.filter(product => {
        // Filtro de búsqueda
        const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro de categoría
        const matchesCategory = selectedCategory === 'all' || product.categoria === selectedCategory;

        // Filtro de disponibilidad
        const matchesStock = !filters.soloDisponibles || product.stock > 0;

        // Filtro de personalizable
        const matchesCustomizable = !filters.personalizables || product.personalizable;

        // Filtros de etiquetas dietéticas
        const matchesGlutenFree = !filters.sinGluten || product.etiquetas?.includes('Sin Gluten');
        const matchesVegan = !filters.vegano || product.etiquetas?.includes('Vegano');
        const matchesLactoseFree = !filters.sinLactosa || product.etiquetas?.includes('Sin Lactosa');

        return matchesSearch && matchesCategory && matchesStock && 
               matchesCustomizable && matchesGlutenFree && matchesVegan && matchesLactoseFree;
    });

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    return (
        <section className="productos-page">
            <Container fluid>
                <Row>
                    {/* Menú lateral - 1/4 del ancho */}
                    <Col lg={3} className="products-menu-col">
                        <ProductsMenu
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </Col>

                    {/* Sección de productos - 3/4 del ancho */}
                    <Col lg={9} className="products-section-col">
                        <ProductsSection products={filteredProducts} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}