import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Heart, Home, Check, Syringe, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { animalApi, Animal as AnimalType } from "@/services/api";
import Button from "@/components/Button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const AnimalProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const animalId = Number(id);

  const { data: animal, isLoading, isError } = useQuery<AnimalType>({
    queryKey: ['animal', animalId],
    queryFn: async () => {
      const response = await animalApi.getById(animalId);
      return response.data;
    },
    enabled: !!animalId,
  });

  const isAvailable = useMemo(() => animal?.status === 'DISPONIVEL', [animal]);
  const favorite = useMemo(() => isFavorite(animalId), [isFavorite, animalId]);
  const photos = useMemo(() => animal?.fotos && animal.fotos.length > 0 ? animal.fotos : [], [animal]);

  const temperamentoArray = useMemo(() => animal?.temperamento ? [animal.temperamento] : [], [animal]);

  const handleAdoptClick = () => {

    navigate(`/adotar/contrato/${animalId}`);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !animal) {
    return <NotFoundMessage />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link
          to="/buscar"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {photos.length > 0 ? (
                  photos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                        <img src={photo} alt={`${animal.nome} - Foto ${index + 1}`} className="w-full h-full object-cover"/>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sem fotos</span>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-card/80 backdrop-blur-sm hover:bg-card" />
              <CarouselNext className="right-4 bg-card/80 backdrop-blur-sm hover:bg-card" />
            </Carousel>
            
            <div className="absolute top-4 left-4 z-10">
              {isAvailable ? (
                <div className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Check className="w-4 h-4" /><span>Disponível para Adoção</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  <Home className="w-4 h-4" /><span>Já encontrou um lar!</span>
                </div>
              )}
            </div>

            {isAvailable && (
              <button onClick={() => toggleFavorite(animal.id)} className="absolute top-4 right-4 z-10 w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                <Heart className={`w-6 h-6 transition-colors ${favorite ? "fill-accent text-accent" : "text-accent"}`}/>
              </button>
            )}
          </div>

          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4">{animal.nome}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{animal.localizacao}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <InfoCard label="Raça" value={animal.raca} />
              <InfoCard label="Idade" value={`${animal.idade} ${animal.idade > 1 ? 'anos' : 'ano'}`} />
              <InfoCard label="Porte" value={animal.tamanho} />
            </div>

            <Tabs defaultValue="historia" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="historia">História</TabsTrigger>
                <TabsTrigger value="temperamento">Temperamento</TabsTrigger>
                <TabsTrigger value="saude"><Syringe className="w-4 h-4 mr-1" />Saúde & Vacinas</TabsTrigger>
              </TabsList>

              <TabContentHistoria animal={animal} />
              <TabContentTemperamento temperamentos={temperamentoArray} />
              <TabContentSaude animal={animal} />
            </Tabs>

            <div className="mt-8">
              <Button variant="primary" disabled={!isAvailable} className="w-full text-lg py-4" onClick={handleAdoptClick}>
                {isAvailable ? "Quero Adotar!" : "Já encontrou um lar!"}
              </Button>
              {isAvailable && <p className="text-sm text-muted-foreground text-center mt-4">Clique para iniciar o processo de adoção</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componentes Auxiliares para legibilidade
const LoadingSkeleton = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4">
      <Skeleton className="h-8 w-32 mb-8" />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4"><Skeleton className="aspect-square rounded-2xl w-full" /></div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" /><Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  </div>
);

const NotFoundMessage = () => (
  <div className="min-h-screen pt-24 flex items-center justify-center">
    <div className="text-center p-8 bg-card rounded-lg shadow-md">
      <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-foreground mb-4">Animal não encontrado</h1>
      <p className="text-muted-foreground mb-8">Desculpe, não conseguimos encontrar este animal. Ele pode ter sido removido ou o link está incorreto.</p>
      <Link to="/buscar"><Button variant="primary">Voltar para a busca</Button></Link>
    </div>
  </div>
);

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card p-4 rounded-lg border border-border">
    <div className="text-sm text-muted-foreground mb-1">{label}</div>
    <div className="font-semibold text-foreground">{value}</div>
  </div>
);

const TabContentHistoria = ({ animal }: { animal: AnimalType }) => (
  <TabsContent value="historia" className="mt-6">
    <Card><CardHeader><CardTitle>A história de {animal.nome}</CardTitle></CardHeader>
      <CardContent><p className="text-muted-foreground leading-relaxed">{animal.historia || 'A história deste animal ainda não foi cadastrada.'}</p></CardContent>
    </Card>
  </TabsContent>
);

const TabContentTemperamento = ({ temperamentos }: { temperamentos: string[] }) => (
  <TabsContent value="temperamento" className="mt-6">
    <Card><CardHeader><CardTitle>Temperamento</CardTitle><CardDescription>Características de personalidade</CardDescription></CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {temperamentos.length > 0 ? temperamentos.map((trait, index) => (
            <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">{trait}</span>
          )) : <p className="text-muted-foreground">Temperamento não cadastrado.</p>}
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);

const TabContentSaude = ({ animal }: { animal: AnimalType }) => (
  <TabsContent value="saude" className="mt-6">
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Syringe className="w-5 h-5 text-primary" />Saúde & Vacinas</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" />Vacinas em Dia</h4>
          {animal.vacinasTomadas && animal.vacinasTomadas.length > 0 ? (
            <div className="space-y-2">
              {animal.vacinasTomadas.map((vacina, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" /><span className="text-foreground font-medium">{vacina}</span>
                </div>
              ))}
            </div>
          ) : (<p className="text-muted-foreground">Nenhuma vacina em dia registrada.</p>)}
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-accent" />Vacinas Pendentes</h4>
          {animal.vacinasPendentes && animal.vacinasPendentes.length > 0 ? (
            <div className="space-y-2">
              {animal.vacinasPendentes.map((vacina, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0" /><span className="text-foreground font-medium">{vacina}</span>
                </div>
              ))}
            </div>
          ) : (<p className="text-muted-foreground">Nenhuma vacina pendente.</p>)}
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);

export default AnimalProfilePage;