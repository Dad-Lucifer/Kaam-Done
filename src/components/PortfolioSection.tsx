import { useState, useEffect } from "react";
import { Play, ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import KK from "@/assets/Projects/KK.png";
import TG from "@/assets/Projects/TG.png";
import TH1 from "@/assets/Projects/TH1.png";
import TGW from "@/assets/Projects/TGW.png";
import RS from "@/assets/Projects/RS.png";
import WL from "@/assets/Projects/WL.png";
import FS from "@/assets/Projects/FS.png";
import SS1 from "@/assets/Projects/SS1.png";
const categories = ["All", "Websites", "Video", "Photo", "Branding", "Social"];

const projects = [
  {
    id: 101,
    title: "Luxry Restaurant Website",
    category: "Websites",
    image: KK,
    type: "website",
    size: "large",
    link: "https://thunder-gaming.vercel.app/"
  },
  {
    id: 1,
    title: "Gaming Cafe shoot",
    category: "Video",
    image: TG,
    type: "video",
    size: "regular",
    link: "https://www.instagram.com/reel/DSCHKgnDOQg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 2,
    title: "Thumbnail Design",
    category: "Photo",
    image: TH1,
    type: "image",
    size: "regular",
    link: "https://www.instagram.com/p/DSSPWwriMaK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 102,
    title: "Gaming Cafe Website",
    category: "Websites",
    image: TGW,
    type: "website",
    size: "large",
    link: "https://thunder-cafe.vercel.app/"
  },
  {
    id: 3,
    title: "Tech Startup Identity",
    category: "Branding",
    image: RS,
    type: "Reel",
    size: "regular",
    link: "https://www.instagram.com/reel/DOD1Zp4iD61/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 4,
    title: "Wild Life",
    category: "Photo",
    image: WL,
    type: "image",
    size: "tall",
    link: "https://www.instagram.com/p/DSIP5etDBXW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 5,
    title: "Festival Shoot",
    category: "Video",
    image: FS,
    type: "video",
    size: "regular",
    link: "https://www.instagram.com/reel/DOTgnsPjM8u/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 6,
    title: "Social Growth Strategy",
    category: "Social",
    image: SS1,
    type: "image",
    size: "regular",
    link: "https://www.instagram.com/kala_stra/"
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);

  useEffect(() => {
    // Real-time listener for projects
    const q = collection(db, "projects");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDynamicProjects(fetched);
    });

    return () => unsubscribe();
  }, []);

  const allProjects = [...projects, ...dynamicProjects];

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Our Masterpieces</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6 tracking-tight">
            Featured <span className="bg-gradient-to-r from-primary via-[#FFD700] to-secondary bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A showcase of precision, creativity, and strategic storytelling designed to leave a lasting impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm rounded-full font-bold tracking-wide transition-all duration-300 overflow-hidden group ${activeCategory === cat
                ? "text-primary-foreground shadow-[0_0_20px_rgba(255,165,0,0.4)] scale-105"
                : "bg-card border border-white/5 text-muted-foreground hover:border-white/20 hover:text-white"
                }`}
            >
              {activeCategory === cat && (
                <div className="absolute inset-0 bg-gradient-primary" />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-card border border-white/5 shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 ${project.size === 'large' ? 'md:col-span-2' : ''} ${project.size === 'tall' ? 'md:row-span-2' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`w-full h-full overflow-hidden ${project.size === 'tall' ? 'aspect-[9/16]' : project.size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300`}
              />

              {/* Hover Ring */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-3xl" />


              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className={`transform transition-all duration-500 ${hoveredId === project.id ? 'translate-y-0 opacity-100' : 'translate-y-0 sm:translate-y-4 opacity-100 sm:opacity-90'}`}>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-secondary font-bold tracking-wider text-[10px] sm:text-sm uppercase bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 backdrop-blur-md">
                      {project.category}
                    </span>
                    <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project.type === "video" && (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group/btn">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover/btn:text-black fill-white group-hover/btn:fill-black" />
                        </div>
                      )}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-black" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <div className={`h-0.5 bg-gradient-to-r from-primary to-transparent w-full sm:w-0 sm:group-hover:w-full transition-all duration-700 ease-out`} />

                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-20">
          <button className="group relative px-6 py-3 sm:px-10 sm:py-4 rounded-full bg-transparent border border-white/20 text-white font-bold tracking-wider overflow-hidden hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2 group-hover:gap-3 transition-all text-sm sm:text-base">
              View All Projects
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
