import { Play, Camera, Video, Aperture, Film, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectFormDialog from "./ProjectFormDialog";

// --- Configuration ---

type HeroConfig = {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string; // The ProjectFormDialog usually handles its own text, but we can't easily override it without props. We'll leave it as is for now or assume ProjectFormDialog is fixed.
  secondaryCtaText: string;
  secondaryCtaLink: string;
};

const HERO_CONFIG: HeroConfig = {
  badgeText: "Social Media Marketing Agency",
  titlePrefix: "We Make Your Brand",
  titleHighlight: "Stand Out",
  description: "From stunning visuals to strategic social media management, we transform your digital presence into something extraordinary.",
  primaryCtaText: "Start a Project", // Note: ProjectFormDialog currently has hardcoded text, usually.
  secondaryCtaText: "Our Process",
  secondaryCtaLink: "/workflow"
};

type FloatingIcon = {
  icon: LucideIcon;
  positionClasses: string;
  sizeClasses: string;
  animationDelay: string;
  colorClasses: string;
  rotate?: string;
};

// Icons configuration for easy adjustment/addition
const FLOATING_ICONS: FloatingIcon[] = [
  {
    icon: Camera,
    positionClasses: "top-24 left-4 lg:left-16",
    sizeClasses: "w-16 lg:w-24 h-16 lg:h-24",
    animationDelay: "0s",
    colorClasses: "text-primary stroke-[1]"
  },
  {
    icon: Aperture,
    positionClasses: "top-28 right-4 lg:right-20",
    sizeClasses: "w-20 lg:w-28 h-20 lg:h-28",
    animationDelay: "1.5s",
    colorClasses: "text-secondary stroke-[1]"
  },
  {
    icon: Video,
    positionClasses: "bottom-32 left-8 lg:left-24",
    sizeClasses: "w-12 lg:w-20 h-12 lg:h-20",
    animationDelay: "3s",
    colorClasses: "text-white stroke-[1]"
  },
  {
    icon: Film,
    positionClasses: "bottom-40 right-8 lg:right-32",
    sizeClasses: "w-10 lg:w-16 h-10 lg:h-16",
    animationDelay: "2s",
    colorClasses: "text-primary stroke-[1]",
    rotate: "rotate-12"
  }
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 md:pt-16 bg-background">
      {/* Background Elements - Enhanced for better contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(43_72%_55%_/_0.15),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,hsl(175_65%_45%_/_0.1),transparent_50%)]" />

      {/* Animated Glow Blobs - Slightly smaller for better fit */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] animate-pulse-glow delay-1000" />

      {/* Floating Icons - Configurable & Optimized */}
      {FLOATING_ICONS.map((item, index) => (
        <div
          key={index}
          className={`hidden md:block absolute opacity-30 animate-float ${item.positionClasses} ${item.rotate || ""}`}
          style={{ animationDelay: item.animationDelay }}
        >
          <item.icon className={`${item.sizeClasses} ${item.colorClasses}`} />
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - High Contrast Cyan */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/50 rounded-full px-3 sm:px-4 py-1.5 mb-6 animate-fade-in shadow-[0_0_20px_rgba(0,206,209,0.2)]">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,206,209,0.8)]" />
            <span className="text-[10px] sm:text-xs font-semibold text-secondary tracking-wide uppercase">
              {HERO_CONFIG.badgeText}
            </span>
          </div>

          {/* Main Heading - Optimized Size */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 animate-slide-up opacity-0 tracking-tight leading-tight" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="text-white drop-shadow-xl">{HERO_CONFIG.titlePrefix}</span>
            <span className="block mt-1 bg-gradient-to-r from-primary via-[#FFD700] to-secondary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,165,0,0.3)] pb-2">
              {HERO_CONFIG.titleHighlight}
            </span>
          </h1>

          {/* Subheading - Optimized */}
          <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 animate-slide-up opacity-0 leading-relaxed font-light px-2" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {HERO_CONFIG.description}
          </p>

          {/* CTA Buttons - Compact Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0 w-full max-w-sm sm:max-w-none mx-auto" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="shadow-[0_0_30px_rgba(255,165,0,0.4)] hover:shadow-[0_0_50px_rgba(255,165,0,0.6)] transition-shadow duration-300 rounded-xl w-full sm:w-auto">
              {/* ProjectFormDialog contains its own button, but acts as Primary CTA */}
              <ProjectFormDialog />
            </div>

            <Link to={HERO_CONFIG.secondaryCtaLink} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto group border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 h-11 px-6 text-sm font-semibold shadow-[0_0_15px_rgba(0,206,209,0.15)] hover:shadow-[0_0_30px_rgba(0,206,209,0.4)]">
                <ArrowRight size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                {HERO_CONFIG.secondaryCtaText}
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
