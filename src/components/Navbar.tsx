import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/kaamdone-logo.png";
import ProjectFormDialog from "@/components/ProjectFormDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Stories" },
    { href: "#join", label: "Careers" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled || isOpen
          ? "bg-black/80 backdrop-blur-xl border-white/10 py-2"
          : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-50 transition-transform duration-300 hover:scale-105">
              <img
                src={logo}
                alt="KAAM DONE"
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-10 md:h-16' : 'h-14 md:h-20'} `}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6 bg-white/5 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              <ProjectFormDialog>
                <Button
                  variant="hero"
                  size="sm"
                  className="group relative overflow-hidden bg-primary text-black hover:bg-primary/90 border-0"
                >
                  <span className="relative z-10 flex items-center gap-2 font-bold">
                    Launch Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </Button>
              </ProjectFormDialog>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col justify-center items-center ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Decorative Background */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center gap-8 p-4 w-full max-w-sm text-center">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-bold text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white hover:from-primary hover:to-secondary transition-all">
                {link.label}
              </span>
            </a>
          ))}

          <div className="w-full h-px bg-white/10 my-4" />

          <div onClick={() => setIsOpen(false)}>
            <ProjectFormDialog>
              <Button
                variant="hero"
                className="w-full text-lg py-6 bg-primary text-black hover:bg-primary/90"
              >
                <Sparkles className="w-5 h-5 mr-2" /> Start a Project
              </Button>
            </ProjectFormDialog>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
