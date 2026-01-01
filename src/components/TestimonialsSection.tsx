import { useState, useEffect } from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TestimonialDialog } from "./TestimonialDialog";

const INITIAL_TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Proprietor, Neon Loft",
    content: "Kamdone didn't just market our brand; they completely reinvented our digital soul. The ROI has been absolutely astronomical.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    name: "Michael Chen",
    role: "Founder, Vertex AI",
    content: "Speed, precision, and pure creativity. They took our complex tech product and made it look effortless and sexy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Luxe Living",
    content: "I've worked with dozens of agencies, but none have the 'X-factor' that this team brings to the table. Simply world-class.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
    gradient: "from-amber-400 to-orange-500"
  },
  {
    name: "David Park",
    role: "CEO, Future Sync",
    content: "Our web traffic doubled in the first month. The visual storytelling is so compelling, people just can't look away.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    name: "Marcus Storm",
    role: "Head of Brand, Echo",
    content: "They capture the vibe perfectly. Every transition, every pixel, every font choice is intentional and impactful.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80",
    gradient: "from-emerald-400 to-green-500"
  },
  {
    name: "Jessica Lee",
    role: "Founder, Zenith",
    content: "A masterclass in modern branding. If you want to stand out in a noisy world, you need Kamdone on your side.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    gradient: "from-red-500 to-pink-600"
  }
];

const HighlightStar = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`
    }}
  />
);

const TestimonialsSection = () => {
  const [allTestimonials, setAllTestimonials] = useState(INITIAL_TESTIMONIALS);

  useEffect(() => {
    // Determine the query to use based on collection availability
    // Since we create the collection on the fly, this query should be fine.
    // However, if the collection doesn't exist yet, it will just return empty, which is fine.
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTestimonials = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.name,
          role: data.role,
          content: data.content,
          rating: data.rating,
          avatar: data.avatar,
          gradient: data.gradient || "from-gray-500 to-slate-500" // Fallback gradient
        };
      });

      // Combine new testimonials with the initial ones
      setAllTestimonials([...newTestimonials, ...INITIAL_TESTIMONIALS]);
    });

    return () => unsubscribe();
  }, []);

  // Triple for smooth loop
  // Note: if user adds many testimonials, this array might get large. 
  // For now it is fine, but in production with 100s of items, 
  // we might want to limit the total number rendered or not triple everything if the list is long enough.
  const displayTestimonials = [...allTestimonials, ...allTestimonials, ...allTestimonials];

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* CSS for infinite scroll */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .pause-hover:hover .animate-scroll-left,
        .pause-hover:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(43_72%_55%_/_0.05),transparent_70%)]" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 mb-12 sm:mb-16">
        <div className="text-center flex flex-col items-center">
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block animate-fade-in">Client Stories</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">Visionaries</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            From startups to industry leaders, see how we've helped shape the digital landscape for over 500+ brands.
          </p>

          <TestimonialDialog />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-8 pause-hover relative -mx-4 md:-mx-0">

        {/* Gradient Masks for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="flex min-w-full animate-scroll-left">
          {displayTestimonials.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[450px] px-3 sm:px-4">
              <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors duration-300 h-full">
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-br ${item.gradient} opacity-50 blur-sm`} />
                        <img src={item.avatar} alt={item.name} className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm sm:text-base">{item.name}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{item.role}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white/5 group-hover:text-primary/20 transition-colors" />
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{item.content}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < item.rating ? "text-primary fill-primary" : "text-gray-700"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white ml-auto flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex min-w-full animate-scroll-right">
          {displayTestimonials.map((item, idx) => (
            <div key={`${item.name}-rev-${idx}`} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[450px] px-3 sm:px-4">
              <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-secondary/30 transition-colors duration-300 h-full">
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-br ${item.gradient} opacity-50 blur-sm`} />
                        <img src={item.avatar} alt={item.name} className="relative w-12 h-12 rounded-full object-cover border border-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{item.name}</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.role}</p>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-white/5 group-hover:text-secondary/20 transition-colors" />
                  </div>

                  <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{item.content}"
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? "text-secondary fill-secondary" : "text-gray-700"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white ml-auto flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-green-500" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default TestimonialsSection;
