import { Link } from "react-router-dom";
import { Heart, PawPrint, Sparkles, User, LogOut } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { favorites } = useFavorites();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            <PawPrint className="w-8 h-8" />
            <span>AdoteAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Início
            </Link>
            <Link to="/buscar" className="text-foreground hover:text-primary transition-colors font-medium">
              Animais
            </Link>
            <Link to="/encontre-seu-match" className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Match IA
            </Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre
            </Link>
            <Link to="/favoritos" className="text-foreground hover:text-primary transition-colors font-medium">
              Favoritos
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/favoritos"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Heart className="w-5 h-5 text-accent" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {user?.nome || user?.email}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
