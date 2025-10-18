import { ContactoHero, ContactForm, ContactInfo } from '../../components/root/ContactoComponents';
import './contacto.css';

export default function Contacto() {
    return (
        <main className="contacto-page">
            <ContactoHero />
            <ContactForm />
            <ContactInfo />
        </main>
    );
}
