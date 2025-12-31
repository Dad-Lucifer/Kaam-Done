import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { ArrowDown, CheckCircle, Users, Calendar, Video, BarChart, FileText, Sparkles, Rocket as RocketIcon, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Configuration & Data Types ---
type WorkflowStep = {
    id: number;
    title: string;
    icon: LucideIcon;
    textColor: string;
    iconBg: string;
    borderColor: string;
    shadowColor: string; // Custom shadow color for glow effects
    dotColor: string;    // Explicit bg color for dots/lines
    items: string[];
};

type PageConfig = {
    headerTag: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
};

// --- Customizable Data ---

const PAGE_CONFIG: PageConfig = {
    headerTag: "The Blueprint",
    titleLine1: "Detailed Content &",
    titleLine2: "Marketing Flow",
    description: "A precision-engineered workflow designed to take your brand from concept to market domination.",
    ctaTitle: "Ready to start Phase 1?",
    ctaDescription: "Your roadmap is ready. The only thing missing is the \"Go\" signal.",
    ctaButtonText: "Initiate Launch Now"
};

const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        id: 1,
        title: "Client Discovery & In-Person Meeting",
        icon: Users,
        textColor: "text-blue-400",
        iconBg: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
        shadowColor: "rgba(96,165,250,0.3)",
        dotColor: "bg-blue-400",
        items: [
            "Content discussion",
            "Present progress",
            "Expectation alignment",
            "Budget planning",
            "Perfect package suggestions"
        ]
    },
    {
        id: 2,
        title: "Post-Payment & Onboarding",
        icon: CheckCircle,
        textColor: "text-emerald-400",
        iconBg: "bg-emerald-400/10",
        borderColor: "border-emerald-400/20",
        shadowColor: "rgba(52,211,153,0.3)",
        dotColor: "bg-emerald-400",
        items: [
            "Payment confirmation",
            "Client onboarding details",
            "Communication channel setup"
        ]
    },
    {
        id: 3,
        title: "Content Planning",
        icon: Calendar,
        textColor: "text-purple-400",
        iconBg: "bg-purple-400/10",
        borderColor: "border-purple-400/20",
        shadowColor: "rgba(192,132,252,0.3)",
        dotColor: "bg-purple-400",
        items: [
            "Monthly content calendar creation",
            "Analytics & competitor research",
            "Client approval"
        ]
    },
    {
        id: 4,
        title: "Content Production",
        icon: Video,
        textColor: "text-pink-400",
        iconBg: "bg-pink-400/10",
        borderColor: "border-pink-400/20",
        shadowColor: "rgba(244,114,182,0.3)",
        dotColor: "bg-pink-400",
        items: [
            "Content creation",
            "Best-time posting strategy",
            "Client verification (24–48 hrs prior)",
            "Custom post policy"
        ]
    },
    {
        id: 5,
        title: "Execution & Posting",
        icon: RocketIcon,
        textColor: "text-orange-400",
        iconBg: "bg-orange-400/10",
        borderColor: "border-orange-400/20",
        shadowColor: "rgba(251,146,60,0.3)",
        dotColor: "bg-orange-400",
        items: [
            "Scheduling & publishing",
            "Engagement monitoring"
        ]
    },
    {
        id: 6,
        title: "Performance Tracking",
        icon: BarChart,
        textColor: "text-cyan-400",
        iconBg: "bg-cyan-400/10",
        borderColor: "border-cyan-400/20",
        shadowColor: "rgba(34,211,238,0.3)",
        dotColor: "bg-cyan-400",
        items: [
            "Analytics monitoring",
            "Optimization & strategy tweaks"
        ]
    },
    {
        id: 7,
        title: "Review & Reporting",
        icon: FileText,
        textColor: "text-yellow-400",
        iconBg: "bg-yellow-400/10",
        borderColor: "border-yellow-400/20",
        shadowColor: "rgba(250,204,21,0.3)",
        dotColor: "bg-yellow-400",
        items: [
            "Final performance report",
            "Mistakes & improvement areas",
            "Strategic future suggestions"
        ]
    }
];

const Workflow = () => {
    const [visiblePhases, setVisiblePhases] = useState<number[]>([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll for timeline filler
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Adjust calculations for smoother fill
            // Start filling when the top of the container hits the middle of the screen
            // End filling when the bottom of the container hits the middle

            // Current visual position relative to start point
            const startOffset = windowHeight * 0.5;
            // The top position gets smaller as we scroll down (becomes negative)
            // effectiveTop is how far the top of container is from our trigger point (middle of screen)

            const scrolledDistance = startOffset - top;

            // Progress logic: 0 when top is at middle, 1 when bottom is at middle
            // Height is the total distance to cover

            let progress = scrolledDistance / height;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.getAttribute("data-id"));
                        setVisiblePhases((prev) => (prev.includes(id) ? prev : [...prev, id]));
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px" }
        );

        const elements = document.querySelectorAll(".phase-card");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <main className="pt-32 pb-20 relative overflow-hidden">
                {/* Ambient Moving Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[20%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[20%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-4 relative z-10">

                    {/* Header Section */}
                    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-32 relative">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 md:mb-8 animate-fade-in shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                            <Sparkles className="w-4 h-4 text-primary fill-primary animate-pulse" />
                            <span className="text-xs font-bold text-primary tracking-widest uppercase">{PAGE_CONFIG.headerTag}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-none animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                            {PAGE_CONFIG.titleLine1} <br />
                            <span className="bg-gradient-to-r from-primary via-[#FFD700] to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,165,0,0.3)]">
                                {PAGE_CONFIG.titleLine2}
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-muted-foreground/80 leading-relaxed max-w-3xl mx-auto font-light animate-slide-up opacity-0 px-4 md:px-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                            {PAGE_CONFIG.description}
                        </p>

                        <div className="absolute left-1/2 -bottom-12 md:-bottom-24 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">Scroll to Explore</span>
                            <ArrowDown className="text-primary w-4 h-4 md:w-6 md:h-6" />
                        </div>
                    </div>

                    {/* Workflow Timeline */}
                    <div ref={containerRef} className="max-w-7xl mx-auto relative px-0 sm:px-4 md:px-0">
                        {/* 
                           Vertical Line Logic:
                           - Mobile/Small Screens: Left aligned
                           - Large Screens (+md): Center aligned
                        */}

                        {/* Mobile Left Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10 md:hidden rounded-full overflow-hidden z-0">
                            <div
                                className="w-full bg-gradient-to-b from-primary via-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(255,215,0,0.8)] transition-all duration-100 ease-out"
                                style={{ height: `${scrollProgress * 100}%` }}
                            />
                        </div>

                        {/* Desktop Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 hidden md:block rounded-full overflow-hidden -translate-x-1/2 z-0">
                            <div
                                className="w-full bg-gradient-to-b from-primary via-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(255,215,0,0.8)] transition-all duration-100 ease-out"
                                style={{ height: `${scrollProgress * 100}%` }}
                            />
                        </div>

                        <div className="space-y-12 md:space-y-32 relative pb-20">
                            {WORKFLOW_STEPS.map((step, index) => {
                                const isEven = index % 2 === 0;
                                const isVisible = visiblePhases.includes(step.id);
                                const itemsBg = step.dotColor;

                                return (
                                    <div
                                        key={step.id}
                                        data-id={step.id}
                                        className={`phase-card flex flex-col md:flex-row gap-6 md:gap-0 items-center relative transition-all duration-1000 transform ${isEven ? "md:flex-row-reverse" : "md:flex-row"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                                    >
                                        {/* Content Side */}
                                        <div className="w-full md:w-1/2 pl-16 pr-4 sm:pl-24 md:pl-0 md:px-12 lg:px-20">
                                            <div
                                                className={`relative p-6 sm:p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all duration-500 group hover:border-white/20 hover:-translate-y-2`}
                                            >
                                                {/* Hover Glow via Shadow from config */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" style={{
                                                    boxShadow: `inset 0 0 80px ${step.shadowColor}`
                                                }} />

                                                {/* Interactive Shine Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                                                {/* Card Content */}
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-between mb-6 md:mb-8">
                                                        <div className={`flex items-center gap-4 ${step.textColor}`}>
                                                            <div className={`p-3 md:p-4 rounded-2xl ${step.iconBg} border ${step.borderColor} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300`}>
                                                                <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                                                            </div>
                                                        </div>
                                                        <span className="text-4xl md:text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                                            {step.id < 10 ? `0${step.id}` : step.id}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white group-hover:text-primary transition-colors duration-300">
                                                        {step.title}
                                                    </h3>

                                                    <ul className="space-y-3 md:space-y-4">
                                                        {step.items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 md:gap-4 text-muted-foreground group-hover:text-gray-200 transition-colors duration-300">
                                                                <div className={`mt-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${itemsBg} shrink-0 shadow-[0_0_8px_currentColor]`} />
                                                                <span className="text-sm sm:text-base md:text-lg leading-relaxed">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline Node (Center) */}
                                        {/* Timeline Node (Center) */}
                                        <div className={`absolute z-10 flex flex-col items-center justify-center transition-all duration-500
                                            left-6 top-0 -translate-x-1/2
                                            md:left-1/2 md:top-1/2 md:-translate-y-1/2
                                        `}>
                                            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#050505] border-4 border-[#1a1a1a] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,1)] transition-all duration-500 ${isVisible ? "scale-100 border-white/20" : "scale-0"} group-hover:border-primary group-hover:scale-125`}>
                                                <div className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${itemsBg} shadow-[0_0_10px_currentColor] ${isVisible ? "animate-pulse" : ""}`} />
                                            </div>
                                        </div>

                                        {/* Empty Side (Balancer for Desktop) */}
                                        <div className="w-full md:w-1/2 hidden md:block" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-20 md:mt-40 mb-20 relative px-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="pt-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                            <h2 className="text-3xl md:text-5xl font-black mb-6">{PAGE_CONFIG.ctaTitle}</h2>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                                {PAGE_CONFIG.ctaDescription}
                            </p>

                            <div className="transform hover:scale-105 transition-transform duration-300 inline-block w-full sm:w-auto">
                                <ProjectFormDialog>
                                    <Button className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-lg font-bold bg-primary text-black hover:bg-primary/90 shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] rounded-full">
                                        <RocketIcon className="mr-3 w-6 h-6" />
                                        {PAGE_CONFIG.ctaButtonText}
                                    </Button>
                                </ProjectFormDialog>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Workflow;
