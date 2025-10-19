import { HeroSection, MissionSection, ValuesSection, TimelineSection } from '../../components/root/NosotrosComponents';
import './nosotros.css';

export default function Nosotros() {
    return (
        <main className="nosotros-page">
            <HeroSection />
            <MissionSection />
            <TimelineSection />
            <ValuesSection />
        </main>
    );
}