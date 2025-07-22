import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import VideoPlayer from "./pages/VideoPlayer";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
            <Route path="/trainings" element={<PlaceholderPage title="Training Sessions" />} />
            <Route path="/townhalls" element={<PlaceholderPage title="Town Halls" />} />
            <Route path="/onboarding" element={<PlaceholderPage title="Onboarding" />} />
            <Route path="/my-videos" element={<PlaceholderPage title="My Videos" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
