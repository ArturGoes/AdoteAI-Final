import { Link } from "react-router-dom";
import { Heart, MapPin, Check, Home } from "lucide-react";
import { Animal } from "@/services/api";
import { useFavorites } from "@/contexts/FavoritesContext";
import { cn } from "@/lib/utils";

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(animal.id);

  const isDisponivel = animal.status === "DISPONIVEL";

  const imageUrl = animal.fotos && animal.fotos.length > 0 
    ? animal.fotos[0] 
    : "https://via.placeholder.com/400x400?text=Sem+Foto";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisponivel) {
      toggleFavorite(animal.id);
    }
  };

  const CardContent = (
    <div
      className={cn(
        "relative bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group",
        !isDisponivel && "grayscale opacity-70"
      )}
    >
      {/* Status Tag */}
      <div className="absolute top-3 left-3 z-10">
        {isDisponivel ? (
          <div className="flex items-center gap-1 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            <Check className="w-3 h-3" />
            <span>Disponível</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            <Home className="w-3 h-3" />
            <span>Adotado</span>
          </div>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        disabled={!isDisponivel}
        className={cn(
          "absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
          isDisponivel
            ? "bg-white hover:scale-110"
            : "bg-gray-300 cursor-not-allowed",
          favorite && isDisponivel && "bg-accent"
        )}
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            favorite && isDisponivel ? "fill-white text-white" : "text-accent"
          )}
        />
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={animal.nome}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isDisponivel && "group-hover:scale-110"
          )}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-card-foreground mb-1">
          {animal.nome}
        </h3>
        {/* CORREÇÃO: 'raca' sem cedilha conforme API */}
        <p className="text-muted-foreground text-sm mb-2">{animal.raca}</p>
        <div className="flex items-center gap-1 text-gray-text text-sm">
          <MapPin className="w-4 h-4" />
          <span>{animal.localizacao}</span>
        </div>
      </div>
    </div>
  );

  if (!isDisponivel) {
    return <div className="cursor-not-allowed">{CardContent}</div>;
  }

  return (
    <Link to={`/animal/${animal.id}`} className="block">
      {CardContent}
    </Link>
  );
};

export default AnimalCard;