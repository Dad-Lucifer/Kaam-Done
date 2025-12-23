import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Image as ImageIcon, Link as LinkIcon, Type, Layers, Monitor, Trash2, Upload } from "lucide-react";

const AddPortfolioForm = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "Websites",
        image: "", // Will be populated by upload or manual URL
        type: "website",
        size: "regular",
        link: "",
    });

    useEffect(() => {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(fetched);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleDelete = async (id: string, imageUrl?: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await deleteDoc(doc(db, "projects", id));

            // Try to delete image from storage if it exists and looks like a firebase storage url
            if (imageUrl && imageUrl.includes("firebasestorage")) {
                try {
                    // Extract path from URL roughly or store storage path in doc. 
                    // For simplicity, we just delete the doc. Deleting file by URL ref is safer if we stored the ref path.
                    // Assuming we stored the full https url. 
                    const storageRef = ref(storage, imageUrl);
                    await deleteObject(storageRef).catch(err => console.log("Could not delete file, might not be ours or permission issue", err));
                } catch (e) {
                    console.log("Error deleting file", e);
                }
            }

            toast({ title: "Deleted", description: "Project removed successfully." });
        } catch (error) {
            console.error("Delete error:", error);
            toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = formData.image;

            if (imageFile) {
                if (!storage) {
                    throw new Error("Firebase Storage is not initialized. Check your .env file or firebase configuration.");
                }
                setUploading(true);
                const storageRef = ref(storage, `portfolio/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                finalImageUrl = await getDownloadURL(snapshot.ref);
                setUploading(false);
            }

            await addDoc(collection(db, "projects"), {
                ...formData,
                image: finalImageUrl,
                createdAt: new Date(),
            });

            toast({
                title: "Success",
                description: "Project added to portfolio successfully!",
            });

            setFormData({
                title: "",
                category: "Websites",
                image: "",
                type: "website",
                size: "regular",
                link: "",
            });
            setImageFile(null);
        } catch (error: any) {
            console.error("Error adding project: ", error);
            let errorMessage = "Failed to add project. Please try again.";

            if (error.code === 'storage/unauthorized') {
                errorMessage = "Permission denied: Firebase Storage rules might block uploads.";
            } else if (error.code === 'permission-denied') {
                errorMessage = "Permission denied: Firebase Firestore rules might block writes.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="p-6 md:p-8 bg-card border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden h-fit">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Plus className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Add New Project</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Project Title</Label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <Input
                                    placeholder="e.g. Luxury Brand Website"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    required
                                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</Label>
                                <div className="relative">
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 z-10 pointer-events-none" />
                                    <Select value={formData.category} onValueChange={(val) => handleChange("category", val)}>
                                        <SelectTrigger className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white h-11">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-white/10 text-white">
                                            <SelectItem value="Websites">Websites</SelectItem>
                                            <SelectItem value="Video">Video</SelectItem>
                                            <SelectItem value="Photo">Photo</SelectItem>
                                            <SelectItem value="Branding">Branding</SelectItem>
                                            <SelectItem value="Social">Social</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</Label>
                                <div className="relative">
                                    <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 z-10 pointer-events-none" />
                                    <Select value={formData.type} onValueChange={(val) => handleChange("type", val)}>
                                        <SelectTrigger className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white h-11">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-white/10 text-white">
                                            <SelectItem value="website">Website</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="Reel">Reel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Grid Size</Label>
                            <Select value={formData.size} onValueChange={(val) => handleChange("size", val)}>
                                <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-11">
                                    <SelectValue placeholder="Select Grid Size" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/10 text-white">
                                    <SelectItem value="regular">Regular (1x1)</SelectItem>
                                    <SelectItem value="large">Large (2x1)</SelectItem>
                                    <SelectItem value="tall">Tall (1x2)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Image</Label>
                            <div className="grid grid-cols-1 gap-4">
                                {/* Upload Button */}
                                <div className="relative group cursor-pointer border-2 border-dashed border-white/10 rounded-xl hover:border-primary/50 transition-colors p-4 flex flex-col items-center justify-center text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                                    <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                                        {imageFile ? imageFile.name : "Click to Upload Image"}
                                    </span>
                                </div>

                                <div className="relative">
                                    <p className="text-center text-xs text-muted-foreground mb-2">- OR -</p>
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                    <Input
                                        placeholder="Paste Image URL directly"
                                        value={formData.image}
                                        onChange={(e) => handleChange("image", e.target.value)}
                                        className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Project Link</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                                <Input
                                    placeholder="https://..."
                                    value={formData.link}
                                    onChange={(e) => handleChange("link", e.target.value)}
                                    required
                                    className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/30 h-11"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {uploading ? "Uploading Image..." : "Adding Project..."}
                                </>
                            ) : (
                                "Add to Portfolio"
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Active Projects</h2>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{projects.length} Total</span>
                </div>

                <div className="grid gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {projects.map((project) => (
                        <div key={project.id} className="group flex flex-col sm:flex-row items-center gap-4 bg-card/50 border border-white/5 p-4 rounded-2xl hover:bg-card hover:border-white/10 transition-all">
                            <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden shrink-0">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-white font-bold">{project.title}</h3>
                                <p className="text-muted-foreground text-xs mb-1">{project.category} • {project.type}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline truncate block max-w-[200px] mx-auto sm:mx-0">
                                    {project.link}
                                </a>
                            </div>

                            <Button
                                variant="destructive"
                                size="icon"
                                className="shrink-0 h-10 w-10 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDelete(project.id, project.image)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No projects added yet. Use the form to add your first one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPortfolioForm;
