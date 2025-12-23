import {
  Camera,
  Video,
  ImageIcon,
  Film,
  Globe,
  Smartphone,
  Palette,
  Share2
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Social Media Management",
    description: "Strategic content planning, scheduling, and engagement to grow your online presence across all platforms.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Camera,
    title: "Photoshoot",
    description: "Professional photography sessions that capture your brand's essence with stunning visuals.",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Video,
    title: "Videography",
    description: "Cinematic video production that tells your story and captivates your audience.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ImageIcon,
    title: "Photo Editing",
    description: "Expert retouching and color grading to make every image picture-perfect.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Film,
    title: "Video Editing",
    description: "Professional post-production that transforms raw footage into compelling content.",
    color: "from-red-500 to-rose-600"
  },
  {
    icon: Globe,
    title: "Website Building",
    description: "Custom, responsive websites that convert visitors into loyal customers.",
    color: "from-indigo-400 to-blue-600"
  },
  {
    icon: Palette,
    title: "Thumbnail Creation",
    description: "Eye-catching thumbnails designed to maximize clicks and engagement.",
    color: "from-yellow-400 to-amber-600"
  },
  {
    icon: Share2,
    title: "Content Strategy",
    description: "Data-driven strategies that align with your goals and resonate with your audience.",
    color: "from-teal-400 to-cyan-600"
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(175_65%_45%_/_0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(43_72%_55%_/_0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_hsl(175_65%_45%)]" />
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">What We Do</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-6 tracking-tight">
            Our <span className="bg-gradient-to-r from-primary via-[#FFD700] to-secondary bg-clip-text text-transparent drop-shadow-lg">Services</span>
          </h2>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            We fuse creativity with strategy to deliver <span className="text-white font-medium">digital masterpieces</span> that elevate your brand.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Border Glow */}
              <div
                className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-b ${service.color} opacity-20 group-hover:opacity-100 blur transition-opacity duration-500`}
              />

              {/* Card Content */}
              <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                {/* Background Number */}
                <span className="absolute -right-4 -top-6 sm:-top-8 text-[80px] sm:text-[100px] md:text-[120px] font-black text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-500 select-none pointer-events-none">
                  0{index + 1}
                </span>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.color} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-white transition-colors drop-shadow-md" />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Bottom line indicator */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-500 ease-out`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
