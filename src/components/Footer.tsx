import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import logo from "@/assets/kaamdone-logo.png";
import { useLocation } from "react-router-dom";
import ProjectFormDialog from "@/components/ProjectFormDialog";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isWorkflowPage = location.pathname === "/workflow";

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600 hover:border-pink-600 hover:text-white" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-400 hover:border-blue-400 hover:text-white" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700 hover:border-blue-700 hover:text-white" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600 hover:border-red-600 hover:text-white" },
  ];

  const quickLinks = ["Services", "About", "Portfolio", "Join Crew", "Contact"];

  return (
    <footer id="contact" className="relative bg-[#050505] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Massive CTA */}
        {!isWorkflowPage && (
          <div className="flex flex-col items-center text-center mb-12 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-yellow-500">Dominate?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-10 font-light px-4">
              Let's turn your vision into a digital legacy. The future belongs to the bold.
            </p>

            <ProjectFormDialog>
              <Button className="group relative px-8 py-6 rounded-full bg-white text-black hover:bg-gray-100 text-lg font-bold">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-30 group-hover:opacity-60 transition-opacity" />
              </Button>
            </ProjectFormDialog>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 border-t border-white/5 pt-12 md:pt-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
            <a href="#" className="inline-block">
              <img src={logo} alt="KAAM DONE" className="h-16 md:h-24 w-auto brightness-0 invert hover:brightness-100 transition-all duration-300 mx-auto md:mx-0" />
            </a>
            <p className="text-muted-foreground/60 leading-relaxed max-w-sm mx-auto md:mx-0">
              We're a collective of rebels and creators, crafting digital experiences that refuse to be ignored. Based in Creative City, operating globally.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 text-center md:text-left">
            <h4 className="text-white font-bold mb-6 text-lg">Menu</h4>
            <ul className="space-y-4 inline-block md:block">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="group flex items-center justify-center md:justify-start text-muted-foreground hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 text-center md:text-left">
            <h4 className="text-white font-bold mb-6 text-lg">Get in Touch</h4>
            <ul className="space-y-6 inline-block md:block">
              <li className="group flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-xs uppercase text-muted-foreground tracking-wider mb-1">Email Us</span>
                  <span className="text-white font-medium hover:text-primary transition-colors cursor-pointer">hello@kamdone.com</span>
                </div>
              </li>
              <li className="group flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-xs uppercase text-muted-foreground tracking-wider mb-1">Call Us</span>
                  <span className="text-white font-medium hover:text-primary transition-colors cursor-pointer">+1 (555) 123-4567</span>
                </div>
              </li>
              <li className="group flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-xs uppercase text-muted-foreground tracking-wider mb-1">Visit Us</span>
                  <span className="text-white font-medium">123 Creative Street, Digital City, DC</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-muted-foreground/40 text-sm flex items-center gap-1 justify-center md:justify-start">
            © {currentYear} KAAM DONE. Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> by The Crew.
          </p>
          <div className="flex gap-8 text-sm justify-center md:justify-end">
            <a href="#" className="text-muted-foreground/40 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground/40 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground/40 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
