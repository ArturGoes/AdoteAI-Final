import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, AlertCircle } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { animalApi, Animal as AnimalType } from "@/services/api";
import AnimalCard from "@/components/AnimalCard";
import Button from "@/components/Button";
import { Skeleton } from "@/components/ui/skeleton";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const { data: allAnimals = [], isLoading, isError } = useQuery<AnimalType[]>({
    queryKey: ['animais'],
    queryFn: async () => {
      const response = await animalApi.getAll();
      return response.data;
    },
  });

  const favoriteAnimals = useMemo(() => {
    if (!allAnimals || favorites.length === 0) return [];

    const favoriteIds = new Set(favorites);
    return allAnimals.filter((animal) => favoriteIds.has(animal.id));
  }, [allAnimals, favorites]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: favorites.length || 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-12 text-destructive bg-destructive/10 rounded-lg">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">Erro ao carregar os dados</p>
          <p className="text-destructive/80">Não foi possível buscar as informações dos animais.</p>
        </div>
      );
    }

    if (favoriteAnimals.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-dark-text mb-4">
          Nenhum favorito ainda
        </h2>
        <p className="text-gray-text mb-8">
          Explore nossa lista de animais e clique no coração para salvar
          seus favoritos. Assim fica mais fácil encontrá-los depois!
        </p>
        <Link to="/buscar">
          <Button variant="primary">Encontrar um amigo</Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Heart className="w-5 h-5 text-accent fill-accent" />
            <span className="text-accent font-semibold">Seus Favoritos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            Animais que você favoritou
          </h1>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            {isLoading
              ? "Carregando seus animais favoritos..."
              : favoriteAnimals.length > 0
              ? `Você tem ${favoriteAnimals.length} ${
                  favoriteAnimals.length === 1 ? "animal favorito" : "animais favoritos"
                }. Que tal conhecer melhor suas histórias?`
              : "Você ainda não favoritou nenhum animal."}
          </p>
        </div>
        
        {renderContent()}
        
      </div>
    </div>
  );
};

export default FavoritesPage;