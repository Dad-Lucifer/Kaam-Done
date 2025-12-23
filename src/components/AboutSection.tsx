import { CheckCircle, Zap, Users, Award, TrendingUp, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Execution",
    description: "We turn concepts into reality faster than you can say 'render'.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "group-hover:border-yellow-400/50"
  },
  {
    icon: Users,
    title: "Creative Collective",
    description: "A powerhouse team of designers, editors, and strategists.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/50"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Accept nothing less than pixel-perfect excellence.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "group-hover:border-purple-400/50"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Strategies backed by data that drive real engagement.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "group-hover:border-green-400/50"
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
              We Craft Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FFD700] to-secondary">Experiences.</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Kamdone isn't just an agency; it's a <span className="text-white font-semibold">creative rebellion</span>. We fuse artistic vision with data-driven strategy to build brands that don't just exist—they dominate.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] ${feature.border}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual Composition */}
          <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center mt-12 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl skew-y-0 hover:skew-y-1 transition-transform duration-700 ease-out mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[1.5s]"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Est. 2019</p>
                <h3 className="text-3xl font-bold text-white">Creative<br />Powerhouse</h3>
              </div>
            </div>

            {/* Floating Stats Card 1 */}
            <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-44 sm:w-48 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform translate-y-4 hover:-translate-y-2 transition-transform duration-500 delay-100 z-30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-green-500 font-bold text-sm">+125%</span>
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-muted-foreground mt-1">Projects Completed</div>
            </div>

            {/* Floating Stats Card 2 */}
            <div className="absolute bottom-10 left-4 sm:bottom-20 sm:left-0 w-36 sm:w-40 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500 z-30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white font-bold text-sm">Active Now</span>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 flex items-center justify-center text-[10px] text-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 flex items-center justify-center text-[10px] text-white">
                  +12
                </div>
              </div>
            </div>

            {/* Decorative Ring */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
