// src/main/resources/frontend/src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeProvider"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

import HomePage from "./pages/HomePage";
import BuscarPage from "./pages/BuscarPage";
import AnimalProfilePage from "./pages/AnimalProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import MatchPage from "./pages/MatchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SobrePage from "./pages/SobrePage";
import AdoptionContractPage from "./pages/AdoptionContractPage";
import AdoptionSuccessPage from "./pages/AdoptionSuccessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (

  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <FavoritesProvider>
            <HashRouter>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/buscar" element={<BuscarPage />} />
                    <Route path="/animal/:id" element={<AnimalProfilePage />} />
                    <Route path="/favoritos" element={<FavoritesPage />} />
                    <Route path="/encontre-seu-match" element={<MatchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    <Route path="/sobre" element={<SobrePage />} />
                    
                    {/* Rotas de Adoção */}
                    <Route path="/adotar/contrato/:id" element={<AdoptionContractPage />} />
                    <Route path="/adotar/sucesso" element={<AdoptionSuccessPage />} />
                    
                    {/* Rota de erro */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </div>
            </HashRouter>
          </FavoritesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
  // FIM DA CORREÇÃO
);

export default App;