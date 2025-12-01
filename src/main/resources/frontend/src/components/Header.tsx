import { Link } from "react-router-dom";
import { Heart, PawPrint } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

const Header = () => {
  const { favorites } = useFavorites();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            <PawPrint className="w-8 h-8" />
            <span>AdoteAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Início
            </Link>
            <Link to="/buscar" className="text-foreground hover:text-primary transition-colors font-medium">
              Animais
            </Link>
            <Link to="/favoritos" className="text-foreground hover:text-primary transition-colors font-medium">
              Favoritos
            </Link>
          </nav>

          <Link
            to="/favoritos"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Heart className="w-6 h-6 text-accent" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
