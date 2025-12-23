import { useState } from "react";
import { ArrowRight, Send, User, Mail, Phone, Rocket, Globe, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ProjectFormDialog = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "Client"), {
        ...formData,
        timestamp: new Date()
      });

      toast({
        title: "Signal Received 📡",
        description: "Our strategists are analyzing your request. Expect a briefing within 24 hours.",
      });

      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        projectType: "",
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

  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      // Allow only numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto group relative overflow-hidden bg-white text-black hover:bg-white/90 border-0 shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:shadow-[0_0_40px_rgba(255,165,0,0.6)] text-base font-bold px-8 h-11"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-300 to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:w-full sm:max-w-[600px] bg-[#0a0a0a] border border-white/10 p-0 overflow-hidden shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(43_72%_55%_/_0.05),transparent_40%)] pointer-events-none" />

        {/* Header Visual */}
        <div className="relative h-24 sm:h-32 bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-float">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Initiate Growth Sequence</h2>
          </div>

          {/* Glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />
        </div>

        <div className="px-4 sm:px-6 pb-6 sm:pb-8">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="sr-only">Start Project</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Provide your mission parameters. We'll handle the trajectory.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 group">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                  Identity
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    minLength={2}
                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11 transition-all focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                  Communication
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11 transition-all focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 group">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                  Direct Line
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    minLength={10}
                    maxLength={10}
                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11 transition-all focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                  Brand HQ
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    type="url"
                    placeholder="https://yourbrand.com"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11 transition-all focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                  />
                </div>
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2 group">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                Growth Strategy
              </Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 z-10 pointer-events-none" />
                <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)} required>
                  <SelectTrigger className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white h-11">
                    <SelectValue placeholder="Select Primary Objective" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectItem value="social-growth">Social Media Growth</SelectItem>
                    <SelectItem value="paid-ads">Paid Advertising (fb/insta/google)</SelectItem>
                    <SelectItem value="content-creation">Content Engine</SelectItem>
                    <SelectItem value="branding">Brand Identity Overhaul</SelectItem>
                    <SelectItem value="web-dev">High-Conversion Website</SelectItem>
                    <SelectItem value="consulting">Strategic Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 group">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide group-focus-within:text-primary transition-colors">
                Growth Goals
              </Label>
              <Textarea
                placeholder="What metrics matter to you? What is your biggest bottleneck right now?"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                minLength={10}
                rows={4}
                className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 resize-none focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Calibrating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Launch Growth Sequence
                  <Rocket className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
