import Select from 'react-select';

// Ejemplo de Select personalizado para tu formulario
const CustomSelect = ({ options, value, onChange, placeholder, isRequired = false }) => {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '2px solid var(--mint-light)',
            borderRadius: '8px',
            padding: '0.25rem',
            borderColor: state.isFocused ? 'var(--strawberry-emphasis)' : 'var(--mint-light)',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'var(--strawberry-emphasis)'
            }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--mint-light)',
            zIndex: 9999
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            borderRadius: '8px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? 'var(--strawberry-emphasis)' 
                : state.isFocused 
                    ? 'var(--strawberry-lighter)' 
                    : 'white',
            color: state.isSelected 
                ? 'white' 
                : state.isFocused 
                    ? 'var(--strawberry-emphasis)' 
                    : 'var(--chocolate-dark)',
            padding: '0.75rem 1rem',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: 'var(--strawberry-emphasis)'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--chocolate-light)'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--chocolate-dark)'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'var(--strawberry-emphasis)' : 'var(--mint-dark)',
            '&:hover': {
                color: 'var(--strawberry-emphasis)'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none'
        })
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            styles={customStyles}
            isSearchable={false}
            required={isRequired}
            className="custom-select"
            classNamePrefix="select"
        />
    );
};

// Uso en tu formulario:
const productOptions = customizableProducts.map(product => ({
    value: product.code,
    label: `${product.nombre} - $${product.precioCLP.toLocaleString('es-CL')}`
}));

// En el render:
<CustomSelect
    options={productOptions}
    value={productOptions.find(option => option.value === selectedProduct)}
    onChange={(selectedOption) => handleProductChange({ target: { value: selectedOption?.value || '' } })}
    placeholder="Selecciona un producto..."
    isRequired={true}
/>

export default CustomSelect;