import { useLoaderData } from 'react-router-dom';
import ContactoHeroNew from '../../components/ContactoComponents/ContactoHeroNew';
import { ContactForm, ContactInfo } from '../../components/ContactoComponents';
import './contacto.css';

export default function Contacto() {
    // 🔄 OBTENER DATOS DINÁMICOS del loader
    const { contactInfo, sucursales, opcionesAsunto, metadata } = useLoaderData();
    
    return (
        <main className="contacto-page">
            <ContactoHeroNew />
            <ContactForm opcionesAsunto={opcionesAsunto} />
            <ContactInfo 
                contactData={contactInfo}
                sucursales={sucursales}
            />
            
            {/* 🛠️ INFO DE DEBUG (puedes quitarlo después) */}
            {metadata?.error && (
                <div style={{ 
                    background: '#fff3cd', 
                    padding: '10px', 
                    margin: '10px',
                    borderRadius: '5px',
                    fontSize: '12px'
                }}>
                    ⚠️ Debug: {metadata.message} - Sucursales activas: {metadata.sucursalesActivas}
                </div>
            )}
        </main>
    );
}
