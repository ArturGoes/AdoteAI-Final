import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "@/components/AnimalCard";
import Button from "@/components/Button";
import { animalApi, Animal as AnimalType } from "@/services/api";
import { Heart, PawPrint } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true);
      try {
        const response = await animalApi.getAll();
        setAnimals(response.data);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const featuredAnimals = animals.filter(a => a.status === 'DISPONIVEL').slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">
                Transforme vidas através da adoção
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-6 leading-tight">
              Encontre seu novo <br />
              <span className="text-primary">melhor amigo</span>
            </h1>
            <p className="text-xl text-gray-text mb-8 max-w-2xl mx-auto">
              Conectamos animais resgatados a lares amorosos. Cada adoção é uma
              segunda chance para um amigo fiel que está esperando por você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("animais-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Animais Disponíveis
              </Button>
              <Link to="/sobre">
                <Button variant="secondary">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section id="animais-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <PawPrint className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-dark-text mb-4">
              Amigos esperando por você
            </h2>
            <p className="text-lg text-gray-text max-w-2xl mx-auto">
              Conheça os animais disponíveis para adoção. Cada um tem uma
              história única e está pronto para fazer parte da sua família.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-60 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para mudar uma vida?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Adotar é um ato de amor. Dê a um animal a chance de ter um lar e
            ganhe um companheiro fiel para toda a vida.
          </p>
          <Link to="/buscar">
             <Button variant="accent">
                Ver todos os animais
             </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;