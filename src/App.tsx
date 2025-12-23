import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workflow from "./pages/Workflow";
import Admin from "./pages/Admin";
import Me from "./pages/Me";
import NotFound from "./pages/NotFound";
import Preloader from "@/components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Preloader Overlay - it will handle its own unmount visually, 
            but we use state to trigger the mounting of the main app content 
            so animations fire at the right moment. */}
        {loading && <Preloader onComplete={() => setLoading(false)} />}

        {!loading && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/workflow" element={<Workflow />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/me" element={<Me />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
