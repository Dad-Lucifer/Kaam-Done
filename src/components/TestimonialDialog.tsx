import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2, Plus, LogIn } from "lucide-react";
import { db, auth, googleProvider } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";

const gradients = [
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-amber-400 to-orange-500",
    "from-purple-500 to-indigo-500",
    "from-emerald-400 to-green-500",
    "from-red-500 to-pink-600",
    "from-violet-500 to-purple-600",
    "from-fuchsia-500 to-pink-500",
];

const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

export function TestimonialDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        role: "",
        company: "",
        content: "",
        rating: 5,
    });

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            toast({
                title: "Signed in",
                description: `Welcome, ${result.user.displayName}!`,
            });
        } catch (error: any) {
            console.error("Login Error:", error);

            let title = "Login Failed";
            let description = error.message;

            if (error.code === 'auth/unauthorized-domain') {
                title = "Configuration Error";
                description = "This domain is not authorized. Please add it to your Firebase Console > Authentication > Settings > Authorized Domains.";
            } else if (error.code === 'auth/popup-closed-by-user') {
                title = "Cancelled";
                description = "Sign in was cancelled.";
            }

            toast({
                title,
                description,
                variant: "destructive",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please sign in with Google to post a testimonial.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const newTestimonial = {
                name: user.displayName,
                role: formData.company ? `${formData.role}, ${formData.company}` : formData.role,
                content: formData.content,
                rating: formData.rating,
                avatar: user.photoURL,
                gradient: getRandomGradient(),
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "testimonials"), newTestimonial);

            toast({
                title: "Success!",
                description: "Your testimonial has been submitted successfully.",
            });

            setOpen(false);
            setFormData({ role: "", company: "", content: "", rating: 5 });
            // Keep user logged in or not? Usually better to keep them logged in for session, 
            // but for this specific dialog action we might not need to clear user. 
            // Clearing user might be annoying if they want to edit or post another (though logic prevents double posts usually).
            // Let's leave user logged in.
        } catch (error: any) {
            console.error("Error submitting testimonial:", error);

            let errorMessage = "Failed to submit testimonial. Please try again.";

            if (error?.code === "permission-denied") {
                errorMessage = "Permission denied. Please check your Firebase Firestore rules.";
            } else if (error?.message) {
                errorMessage = error.message;
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Share Your Story
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#0a0a0a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Share Your Experience</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        We'd love to hear about your journey with us. Login with Google to verify your identity.
                    </DialogDescription>
                </DialogHeader>

                {!user ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            className="w-full max-w-xs bg-white text-black hover:bg-gray-200 font-bold flex items-center gap-2"
                        >
                            <LogIn className="w-4 h-4" /> Sign in with Google
                        </Button>
                        <p className="text-xs text-gray-500 text-center px-8">
                            We use your Google profile to fetch your name and photo automatically.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="flex flex-col gap-4">

                            {/* User Info Display */}
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="w-12 h-12 rounded-full border border-white/20"
                                />
                                <div>
                                    <p className="font-bold text-white">{user.displayName}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="role" className="text-sm font-medium text-gray-300">Role</Label>
                                    <Input
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="CEO, Founder, etc."
                                        required
                                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50"
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="company" className="text-sm font-medium text-gray-300">Company</Label>
                                    <Input
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Acme Corp"
                                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-300 mb-2 block">Rating</Label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-6 h-6 border-none ${star <= formData.rating
                                                    ? "fill-primary text-primary"
                                                    : "fill-none text-gray-600 hover:text-primary/50"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="content" className="text-sm font-medium text-gray-300">Your Review</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Tell us about your experience..."
                                    required
                                    className="mt-1.5 min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 resize-none"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-bold"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...
                                    </>
                                ) : (
                                    "Post Testimonial"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
