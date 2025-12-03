import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Heart, Home, Check, Syringe, AlertTriangle, CheckCircle } from "lucide-react";
import { mockAnimals } from "@/data/mockAnimals";
import Button from "@/components/Button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Extended animal type with vaccine fields (matching backend)
interface AnimalExtended {
  id: number;
  nome: string;
  idade: string;
  raça: string;
  porte: string;
  localizacao: string;
  historia: string;
  temperamento: string[];
  larIdeal: string;
  imagemUrl: string;
  disponivel: boolean;
  fotos?: string[];
  vacinasTomadas?: string[];
  vacinasPendentes?: string[];
}

// Generate Unsplash URLs based on breed
const generateUnsplashPhotos = (breed: string, count: number = 4): string[] => {
  const encodedBreed = encodeURIComponent(breed.toLowerCase().replace(/\s+/g, ','));
  return Array.from({ length: count }, (_, i) => 
    `https://source.unsplash.com/800x600/?${encodedBreed},dog&sig=${i}`
  );
};

const AnimalProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // For now using mock data - in production would fetch from API
  const baseAnimal = mockAnimals.find((a) => a.id === Number(id));
  
  // Add mock vaccine data and generate photos
  const animal: AnimalExtended | undefined = baseAnimal ? {
    ...baseAnimal,
    fotos: baseAnimal.imagemUrl ? [baseAnimal.imagemUrl, ...generateUnsplashPhotos(baseAnimal.raça, 3)] : generateUnsplashPhotos(baseAnimal.raça, 4),
    vacinasTomadas: ["Raiva", "V10 (Polivalente)", "Giárdia", "Gripe Canina"],
    vacinasPendentes: ["Leishmaniose", "Reforço V10"],
  } : undefined;

  if (!animal) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Animal não encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
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
  const photos = animal.fotos && animal.fotos.length > 0 
    ? animal.fotos 
    : generateUnsplashPhotos(animal.raça);

  const handleAdoptClick = () => {
    navigate(`/adotar/contrato/${animal.id}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/animais"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={photo}
                        alt={`${animal.nome} - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-card/80 backdrop-blur-sm hover:bg-card" />
              <CarouselNext className="right-4 bg-card/80 backdrop-blur-sm hover:bg-card" />
            </Carousel>

            {/* Status Tag */}
            <div className="absolute top-4 left-4 z-10">
              {animal.disponivel ? (
                <div className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Check className="w-4 h-4" />
                  <span>Disponível para Adoção</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Home className="w-4 h-4" />
                  <span>Já encontrou um lar!</span>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            {animal.disponivel && (
              <button
                onClick={() => toggleFavorite(animal.id)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorite ? "fill-accent text-accent" : "text-accent"
                  }`}
                />
              </button>
            )}

            {/* Photo indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {animal.nome}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{animal.localizacao}</span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Raça</div>
                <div className="font-semibold text-foreground">{animal.raça}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Idade</div>
                <div className="font-semibold text-foreground">{animal.idade}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Porte</div>
                <div className="font-semibold text-foreground">{animal.porte}</div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="historia" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="historia">História</TabsTrigger>
                <TabsTrigger value="temperamento">Temperamento</TabsTrigger>
                <TabsTrigger value="saude">
                  <Syringe className="w-4 h-4 mr-1" />
                  Saúde & Vacinas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="historia" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>História</CardTitle>
                    <CardDescription>Conheça a história de {animal.nome}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{animal.historia}</p>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-2">Lar Ideal</h4>
                      <p className="text-muted-foreground">{animal.larIdeal}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="temperamento" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Temperamento</CardTitle>
                    <CardDescription>Características de personalidade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {animal.temperamento.map((trait, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saude" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Syringe className="w-5 h-5 text-primary" />
                      Saúde & Vacinas
                    </CardTitle>
                    <CardDescription>
                      Histórico de vacinação de {animal.nome}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Vacinas Tomadas */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        Vacinas em Dia
                      </h4>
                      {animal.vacinasTomadas && animal.vacinasTomadas.length > 0 ? (
                        <div className="space-y-2">
                          {animal.vacinasTomadas.map((vacina, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20"
                            >
                              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                              <span className="text-foreground font-medium">{vacina}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Nenhuma vacina registrada</p>
                      )}
                    </div>

                    {/* Vacinas Pendentes */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        Vacinas Pendentes
                      </h4>
                      {animal.vacinasPendentes && animal.vacinasPendentes.length > 0 ? (
                        <div className="space-y-2">
                          {animal.vacinasPendentes.map((vacina, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20"
                            >
                              <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" />
                              <span className="text-foreground font-medium">{vacina}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Nenhuma vacina pendente</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                variant="primary"
                disabled={!animal.disponivel}
                className="w-full text-lg py-4"
                onClick={handleAdoptClick}
              >
                {animal.disponivel ? "Quero Adotar!" : "Já encontrou um lar!"}
              </Button>

              {animal.disponivel && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Clique para iniciar o processo de adoção
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfilePage;
