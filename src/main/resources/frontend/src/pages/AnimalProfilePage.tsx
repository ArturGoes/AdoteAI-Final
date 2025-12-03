import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Heart, Home, Check, Loader2 } from "lucide-react";
import { animalApi, Animal } from "@/services/api";
import Button from "@/components/Button";
import { useFavorites } from "@/contexts/FavoritesContext";

const AnimalProfilePage = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await animalApi.getById(Number(id));
        setAnimal(response.data);
      } catch (err) {
        setError("Erro ao carregar animal");
        console.error("Erro ao buscar animal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-primary">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-2xl font-bold text-dark-text">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            {error || "Animal não encontrado"}
          </h1>
          <p className="text-gray-text mb-8">
            Desculpe, não conseguimos encontrar este animal.
          </p>
          <Link to="/">
            <Button variant="primary">Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(animal.id);
  // LÓGICA: Verifica o status baseado no Enum do Java (String)
  const isDisponivel = animal.status === "DISPONIVEL";

  // LÓGICA: Pega a primeira foto do array ou usa um placeholder
  const imageUrl = animal.fotos && animal.fotos.length > 0 
    ? animal.fotos[0] 
    : "https://via.placeholder.com/600x600?text=Sem+Foto";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={imageUrl}
                alt={`${animal.raca} - ${animal.idade} anos`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status Tag */}
            <div className="absolute top-4 left-4">
              {isDisponivel ? (
                <div className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Check className="w-4 h-4" />
                  <span>Disponível para Adoção</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Home className="w-4 h-4" />
                  <span>Já encontrou um lar!</span>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            {isDisponivel && (
              <button
                onClick={() => toggleFavorite(animal.id)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorite ? "fill-accent text-accent" : "text-accent"
                  }`}
                />
              </button>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-5xl font-bold text-dark-text mb-4">
              {animal.raca} - {animal.idade} anos
            </h1>

            <div className="flex items-center gap-2 text-gray-text mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{animal.cor} • {animal.sexo}</span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Nome</div>
                <div className="font-semibold text-dark-text">{animal.nome}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Raça</div>
                <div className="font-semibold text-dark-text">{animal.raca}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Idade</div>
                <div className="font-semibold text-dark-text">{animal.idade} anos</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Porte</div>
                <div className="font-semibold text-dark-text">{animal.tamanho}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Sexo</div>
                <div className="font-semibold text-dark-text">{animal.sexo}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-gray-text mb-1">Localização</div>
                <div className="font-semibold text-dark-text">{animal.localizacao}</div>
              </div>
            </div>

            {/* Temperament */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-text mb-3">
                Temperamento
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                  {animal.temperamento}
                </span>
              </div>
            </div>

            {/* Vacinas */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-text mb-3">
                Vacinas Tomadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {animal.vacinasTomadas && animal.vacinasTomadas.length > 0 ? (
                  animal.vacinasTomadas.map((vacina, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium"
                    >
                      {vacina}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-text">Nenhuma vacina registrada</span>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              disabled={!isDisponivel}
              className="w-full text-lg py-4"
              onClick={() => alert('Funcionalidade de adoção em breve!')}
            >
              {isDisponivel ? "Quero Adotar!" : "Já encontrou um lar!"}
            </Button>

            {isDisponivel && (
              <p className="text-sm text-gray-text text-center mt-4">
                Clique para iniciar o processo de adoção
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfilePage;