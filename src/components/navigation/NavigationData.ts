
import { 
  Stethoscope, 
  Pill,
  Activity,
  Video,
  LucideProps
} from "lucide-react";

export interface MenuItem {
  id: string;
  title: string;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>>;
  href?: string;
}

export const coreMenuItems: MenuItem[] = [
  {
    id: 'symptoms',
    title: "Symptoms",
    icon: Stethoscope,
  },
  {
    id: 'medications',
    title: "Medications",
    icon: Pill,
  },
  {
    id: 'monitoring',
    title: "Monitoring",
    icon: Activity,
  },
  {
    id: 'telemedicine',
    title: "Telemedicine",
    icon: Video,
  },
];
