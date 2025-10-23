import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Search } from 'react-bootstrap-icons';
import { CATEGORIES_PS } from '../../../data/categorias';
import './ProductsMenu.css';

export default function ProductsMenu({ 
    searchTerm, 
    onSearchChange, 
    selectedCategory, 
    onCategoryChange, 
    filters, 
    onFilterChange 
}) {
    return (
        <aside className="products-menu">
            <div className="menu-section">
                <h5 className="menu-title">Buscar</h5>
                <div className="search-container">
                    <Search className="search-icon" />
                    <Form.Control
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="menu-section">
                <h5 className="menu-title">Categorías</h5>
                <ListGroup variant="flush">
                    <ListGroup.Item
                        action
                        active={selectedCategory === 'all'}
                        onClick={() => onCategoryChange('all')}
                        className="category-item"
                    >
                        Todas las categorías
                    </ListGroup.Item>
                    {CATEGORIES_PS.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            action
                            active={selectedCategory === category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className="category-item"
                        >
                            {category.nombre}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

            <div className="menu-section">
                <h5 className="menu-title">Filtros</h5>
                <Form.Check
                    type="checkbox"
                    label="Solo con stock"
                    id="stock-filter"
                    className="filter-checkbox"
                    checked={filters.soloDisponibles}
                    onChange={(e) => onFilterChange('soloDisponibles', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Personalizables"
                    id="customizable-filter"
                    className="filter-checkbox"
                    checked={filters.personalizables}
                    onChange={(e) => onFilterChange('personalizables', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Sin gluten"
                    id="gluten-free-filter"
                    className="filter-checkbox"
                    checked={filters.sinGluten}
                    onChange={(e) => onFilterChange('sinGluten', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Vegano"
                    id="vegan-filter"
                    className="filter-checkbox"
                    checked={filters.vegano}
                    onChange={(e) => onFilterChange('vegano', e.target.checked)}
                />
                <Form.Check
                    type="checkbox"
                    label="Sin lactosa"
                    id="lactose-free-filter"
                    className="filter-checkbox"
                    checked={filters.sinLactosa}
                    onChange={(e) => onFilterChange('sinLactosa', e.target.checked)}
                />
            </div>
        </aside>
    );
}
