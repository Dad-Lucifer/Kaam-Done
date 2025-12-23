import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Send, Users, Sparkles, Briefcase, Zap, Globe, Heart } from "lucide-react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const JoinCrewSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    "Video Editor",
    "Photo Editor",
    "Photographer",
    "Videographer",
    "Social Media Manager",
    "Graphic Designer",
    "Web Developer",
    "Content Writer",
    "Other",
  ];

  const benefits = [
    { icon: Briefcase, text: "Top-tier Projects", color: "text-blue-400" },
    { icon: Globe, text: "Remote First", color: "text-purple-400" },
    { icon: Zap, text: "Fast Growth", color: "text-yellow-400" },
    { icon: Heart, text: "Supportive Team", color: "text-pink-400" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "Employee"), {
        ...formData,
        timestamp: new Date()
      });

      toast({
        title: "Application Received 🚀",
        description: "Welcome to the queue! We'll review your portfolio and reach out shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        role: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Tech Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#ffd7001a,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 lg:sticky lg:top-24 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">We are Hiring</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Join the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-yellow-500">Revolution.</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              We're building a squad of relentless creators. If you're obsessed with quality and ready to push boundaries, <span className="text-white font-semibold">your seat is waiting.</span>
            </p>

            {/* Visual Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
              {benefits.map((bg, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className={`p-3 rounded-lg bg-black/50 ${bg.color}`}>
                    <bg.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-sm">{bg.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="relative group w-full">
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />

            <div className="relative bg-black/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-5 md:p-10 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Apply Now
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Phone</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1234567890"
                      minLength={10}
                      maxLength={10}
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Portfolio</label>
                    <Input
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Role</label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-xl bg-[#1a1a1a] border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
                    >
                      <option value="" className="text-muted-foreground">Select your expertise</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Why You?</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what makes you unique..."
                    rows={4}
                    required
                    className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-primary to-yellow-600 hover:from-yellow-400 hover:to-yellow-700 text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Application
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCrewSection;
