import { ContactoHero, ContactForm, ContactInfo } from '../../components/root/ContactoComponents';
import { useContactoData } from '../../hooks/useLoaderData';
import './contacto.css';

export default function Contacto() {
    const { contactInfo, socialMedia, branches, formConfig } = useContactoData();
    
    return (
        <main className="contacto-page">
            <ContactoHero />
            <ContactForm formConfig={formConfig} />
            <ContactInfo 
                contactInfo={contactInfo} 
                socialMedia={socialMedia} 
                branches={branches} 
            />
            
            {/* Sección adicional con datos del loader */}
            {branches && branches.length > 0 && (
                <section className="branches-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Nuestras Sucursales</h2>
                        <div className="row">
                            {branches.map(branch => (
                                <div key={branch.id} className="col-md-4 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body text-center">
                                            <h5 className="card-title text-primary">{branch.name}</h5>
                                            <p className="card-text">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                {branch.address}
                                            </p>
                                            <p className="card-text">
                                                <i className="fas fa-phone me-2"></i>
                                                <a href={`tel:${branch.phone}`} className="text-decoration-none">
                                                    {branch.phone}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {/* Información de redes sociales mejorada */}
            {socialMedia && socialMedia.length > 0 && (
                <section className="social-section py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h3 className="mb-4">Síguenos en Redes Sociales</h3>
                                <div className="row">
                                    {socialMedia.map((social, index) => (
                                        <div key={index} className="col-md-4 mb-3">
                                            <div className="social-card p-3">
                                                <h5>{social.platform}</h5>
                                                <p className="text-muted">{social.url}</p>
                                                <small className="text-success">
                                                    {social.followers} seguidores
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
