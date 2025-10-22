import { useLoaderData } from 'react-router-dom';
import { HeroSection, MissionSection, ValuesSection, TimelineSection } from '../../components/root/NosotrosComponents';
import './nosotros.css';

export default function Nosotros() {
    // 🔄 OBTENER TODOS LOS DATOS DINÁMICOS
    const { 
        hero, 
        mision, 
        estadisticas, 
        timeline, 
        valoresInfo, 
        valores, 
        metadata 
    } = useLoaderData();
    
    return (
        <main className="nosotros-page">
            <HeroSection heroData={hero} />
            <MissionSection 
                misionData={mision} 
                estadisticas={estadisticas}
            />
            <TimelineSection timelineData={timeline} />
            <ValuesSection 
                valoresInfo={valoresInfo}
                valores={valores}
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
                    ⚠️ Debug: {metadata.message} - Eventos: {metadata.totalEventos} - Valores: {metadata.totalValores}
                </div>
            )}
        </main>
    );
}