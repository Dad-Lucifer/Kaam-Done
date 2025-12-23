import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddPortfolioForm from "@/components/AddPortfolioForm";

const Me = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <Navbar />

            <main className="flex-grow flex items-start justify-center py-32 px-4 relative z-10">
                <div className="w-full max-w-7xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Admin <span className="text-primary">Console</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage your portfolio and showcase your latest work.
                        </p>
                    </div>

                    <AddPortfolioForm />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Me;
