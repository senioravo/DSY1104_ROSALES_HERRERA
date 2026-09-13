// Validaciones mejoradas siguiendo las mejores prácticas de Bootstrap
import { useState } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Reglas de validación
    const validationRules = {
        nombre: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        },
        telefono: {
            required: true,
            pattern: /^(\+56\s?)?[9]\s?[0-9]{4}\s?[0-9]{4}$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        descripcion: {
            required: true,
            minLength: 10,
            maxLength: 500
        },
        productoCode: {
            required: true
        }
    };

    // Mensajes de error personalizados
    const errorMessages = {
        nombre: {
            required: 'El nombre es obligatorio',
            minLength: 'El nombre debe tener al menos 2 caracteres',
            maxLength: 'El nombre no puede exceder 50 caracteres',
            pattern: 'El nombre solo puede contener letras y espacios'
        },
        telefono: {
            required: 'El teléfono es obligatorio',
            pattern: 'Formato válido: +56 9 1234 5678 o 912345678'
        },
        email: {
            required: 'El correo electrónico es obligatorio',
            pattern: 'Ingresa un correo electrónico válido'
        },
        descripcion: {
            required: 'La descripción es obligatoria',
            minLength: 'La descripción debe tener al menos 10 caracteres',
            maxLength: 'La descripción no puede exceder 500 caracteres'
        },
        productoCode: {
            required: 'Debes seleccionar un producto'
        }
    };

    // Validar un campo específico
    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (!rules) return null;

        // Required
        if (rules.required && (!value || value.trim() === '')) {
            return errorMessages[name].required;
        }

        if (value && value.trim() !== '') {
            // MinLength
            if (rules.minLength && value.length < rules.minLength) {
                return errorMessages[name].minLength;
            }

            // MaxLength
            if (rules.maxLength && value.length > rules.maxLength) {
                return errorMessages[name].maxLength;
            }

            // Pattern
            if (rules.pattern && !rules.pattern.test(value)) {
                return errorMessages[name].pattern;
            }
        }

        return null;
    };

    // Validar todo el formulario
    const validateForm = (formData) => {
        const newErrors = {};

        Object.keys(validationRules).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambio de campo
    const handleFieldChange = (name, value) => {
        // Marcar como tocado
        setTouched(prev => ({...prev, [name]: true }));

        // Validar solo si ya fue tocado
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    // Limpiar errores
    const clearErrors = () => {
        setErrors({});
        setTouched({});
    };

    return {
        errors,
        touched,
        validateForm,
        handleFieldChange,
        clearErrors,
        hasErrors: Object.keys(errors).length > 0
    };
};