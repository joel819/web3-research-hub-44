import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import ToolDetail from "./pages/ToolDetail";
import ResearchDetail from "./pages/ResearchDetail";
import NotFound from "./pages/NotFound";
import ToolsPage from "./pages/ToolsPage";
import { PortfolioProvider } from "./contexts/PortfolioContext";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/tool/:id" element={<PageTransition><ToolDetail /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
        <Route path="/research/:index" element={<PageTransition><ResearchDetail /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <PortfolioProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
          <Analytics />
        </PortfolioProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
export default App;
