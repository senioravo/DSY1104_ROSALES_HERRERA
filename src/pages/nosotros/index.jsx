import { HeroSection, MissionSection, ValuesSection, TimelineSection } from '../../components/root/NosotrosComponents';
import { useNosotrosData } from '../../hooks/useLoaderData';
import './nosotros.css';

export default function Nosotros() {
    const { mission, vision, timeline, values, team } = useNosotrosData();
    
    return (
        <main className="nosotros-page">
            <HeroSection team={team} />
            <MissionSection mission={mission} vision={vision} />
            <TimelineSection timeline={timeline} />
            <ValuesSection values={values} />
        </main>
    );
}