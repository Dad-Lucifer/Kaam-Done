import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JoinCrewSection from "@/components/JoinCrewSection";
import Footer from "@/components/Footer";

// --- Page Configuration ---
// Toggle "isActive" to false to hide a section
// Reorder this array to change the layout order of the landing page
const LANDING_PAGE_SECTIONS = [
  {
    id: "hero",
    component: HeroSection,
    isActive: true,
  },
  {
    id: "services",
    component: ServicesSection,
    isActive: true,
  },
  {
    id: "portfolio",
    component: PortfolioSection,
    isActive: true,
  },
  {
    id: "about",
    component: AboutSection,
    isActive: true,
  },
  {
    id: "testimonials",
    component: TestimonialsSection,
    isActive: true,
  },
  {
    id: "join",
    component: JoinCrewSection,
    isActive: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      <main className="flex flex-col w-full relative">
        {LANDING_PAGE_SECTIONS.map(({ id, component: Component, isActive }) => {
          if (!isActive) return null;
          return (
            <div key={id} className="w-full block">
              <Component />
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
