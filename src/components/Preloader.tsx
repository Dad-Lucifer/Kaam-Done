import { useState, useEffect, useRef } from "react";
import desktopVideo from "@/assets/loading/load.mp4";
import mobileVideo from "@/assets/loading/portrait 2.mp4";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const desktopVideoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);

    const handleCreateExit = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 800); // Smooth fade out
    };

    useEffect(() => {
        // Robust playback handler for mobile/safari
        const playVideo = async (videoEl: HTMLVideoElement | null) => {
            if (videoEl) {
                try {
                    videoEl.currentTime = 0;
                    await videoEl.play();
                } catch (err) {
                    console.warn("Auto-play failed:", err);
                }
            }
        };

        // Attempt to play both immediately on mount
        // This helps in some browsers where autoPlay attribute is lazy
        playVideo(desktopVideoRef.current);
        playVideo(mobileVideoRef.current);

        // Safety net: If video metadata never loads or stalls, exit after 15s
        const safetyTimer = setTimeout(handleCreateExit, 15000);
        return () => clearTimeout(safetyTimer);
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
                    ref={desktopVideoRef}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    onEnded={handleCreateExit}
                    onError={(e) => {
                        console.error("Video load error", e);
                        handleCreateExit();
                    }}
                    style={{ objectPosition: "center" }}
                >
                    <source src={desktopVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Mobile Video Container */}
            <div className="md:hidden absolute inset-0 w-full h-full">
                <video
                    ref={mobileVideoRef}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    onEnded={handleCreateExit}
                    onError={(e) => {
                        console.error("Video load error", e);
                        handleCreateExit();
                    }}
                    style={{ objectPosition: "center" }}
                >
                    <source src={mobileVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Skip Button */}
            <button
                onClick={handleCreateExit}
                className="absolute bottom-12 right-8 z-50 text-white/50 hover:text-white text-xs md:text-sm uppercase tracking-widest font-bold border border-white/20 px-6 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300 pointer-events-auto"
            >
                Skip Intro
            </button>

            {/* Mobile tap to skip overlay */}
            <div
                className="absolute inset-0 z-40 md:hidden"
                onClick={handleCreateExit}
            />
        </div>
    );
};

export default Preloader;
