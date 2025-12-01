import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimalCard from "@/components/AnimalCard";
import Button from "@/components/Button";
import { animalApi, Animal } from "@/services/api";
import { Heart, PawPrint } from "lucide-react";

const HomePage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Busca dados reais do Backend
        const response = await animalApi.getAll();
        setAnimals(response.data);
      } catch (err) {
        console.error("Erro ao buscar animais:", err);
        // Não trava a tela, apenas mostra erro no console
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

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
              <Button variant="secondary">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animais Section */}
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
              Conheça os animais disponíveis para adoção.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-text">Carregando amigos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animals.length > 0 ? (
                animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))
              ) : (
                <div className="col-span-full text-center p-10 bg-gray-50 rounded-lg">
                  <p className="text-xl text-gray-500">Nenhum animal cadastrado no banco de dados ainda.</p>
                  <p className="text-sm text-gray-400 mt-2">Use o Postman ou SQL para inserir dados na tabela 'animal'.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;