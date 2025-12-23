import { useState, useEffect } from "react";
import desktopVideo from "@/assets/loading/Create_a_highimpact_1080p_202512202223.mp4";
import mobileVideo from "@/assets/loading/portrait 2.mp4";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleCreateExit = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 800); // Match CSS transition duration
    };

    // Safety fallout: ensure we don't block the user forever if video has issues
    useEffect(() => {
        // 15 seconds max timeout as a safety net
        const timer = setTimeout(handleCreateExit, 15000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black text-white overflow-hidden transition-opacity duration-1000 ease-in-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            {/* Desktop Video Container */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={handleCreateExit}
                    style={{ objectPosition: "center" }}
                >
                    <source src={desktopVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Mobile Video Container */}
            <div className="md:hidden absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={handleCreateExit}
                    style={{ objectPosition: "center" }}
                >
                    <source src={mobileVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Skip Button - UX Enhancement for "Optimized" feel */}
            <button
                onClick={handleCreateExit}
                className="absolute bottom-8 right-8 z-50 text-white/50 hover:text-white text-sm uppercase tracking-widest font-bold border border-white/20 px-6 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300"
            >
                Skip Intro
            </button>

            {/* Mobile-friendly Tap overlay to skip */}
            <div
                className="absolute inset-0 z-40 md:hidden"
                onClick={handleCreateExit}
            />
        </div>
    );
};

export default Preloader;
