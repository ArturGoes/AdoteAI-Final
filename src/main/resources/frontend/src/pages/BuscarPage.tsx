import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AnimalCard from "@/components/AnimalCard";
import { Search, AlertCircle } from "lucide-react";
import { animalApi, Animal as AnimalType } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import Button from "@/components/Button";

const BuscarPage = () => {

  const { data: allAnimals = [], isLoading, isError } = useQuery<AnimalType[]>({
    queryKey: ['animais'],
    queryFn: async () => {
      const response = await animalApi.getAll();
      return response.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRace, setSelectedRace] = useState("todas");
  const [selectedSize, setSelectedSize] = useState("todos");
  const [selectedLocation, setSelectedLocation] = useState("todas");

  const races = useMemo(() => {
    if (!allAnimals) return ["todas"];
    const uniqueRaces = Array.from(new Set(allAnimals.map(animal => animal.raca)));
    return ["todas", ...uniqueRaces.sort()];
  }, [allAnimals]);

  const sizes = ["todos", "Pequeno", "Médio", "Grande"];
  
  const locations = useMemo(() => {
    if (!allAnimals) return ["todas"];
    const uniqueLocations = Array.from(new Set(allAnimals.map(animal => animal.localizacao)));
    return ["todas", ...uniqueLocations.sort()];
  }, [allAnimals]);

  const filteredAnimals = useMemo(() => {
    if (!allAnimals) return [];
    return allAnimals.filter(animal => {
      const matchesSearch = animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           animal.raca.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRace = selectedRace === "todas" || animal.raca === selectedRace;
      const matchesSize = selectedSize === "todos" || animal.tamanho === selectedSize;
      const matchesLocation = selectedLocation === "todas" || animal.localizacao === selectedLocation;
      
      return matchesSearch && matchesRace && matchesSize && matchesLocation;
    });
  }, [searchTerm, selectedRace, selectedSize, selectedLocation, allAnimals]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRace("todas");
    setSelectedSize("todos");
    setSelectedLocation("todas");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            Encontre seu Companheiro
          </h1>
          <p className="text-lg text-gray-text">
            Use os filtros abaixo para encontrar o animal ideal para você
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-20 z-40">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-text w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome ou raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Raça</label>
              <select value={selectedRace} onChange={(e) => setSelectedRace(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                {races.map(race => (<option key={race} value={race}>{race === "todas" ? "Todas as raças" : race}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Porte</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                {sizes.map(size => (<option key={size} value={size}>{size === "todos" ? "Todos os portes" : size}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Localização</label>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                {locations.map(location => (<option key={location} value={location}>{location === "todas" ? "Todas as localizações" : location}</option>))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-text">
            {!isLoading && `${filteredAnimals.length} ${filteredAnimals.length === 1 ? "animal encontrado" : "animais encontrados"}`}
          </p>
        </div>

        {/* MELHORIA: Renderização condicional com isLoading, isError e dados */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-destructive bg-destructive/10 rounded-lg">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">Oops! Algo deu errado.</p>
            <p className="text-destructive/80">Não foi possível carregar os animais. Tente novamente mais tarde.</p>
          </div>
        ) : filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-text mb-4">Nenhum animal encontrado com esses filtros.</p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarPage;