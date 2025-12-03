import { useState, useMemo } from "react";
import { mockAnimals } from "@/data/mockAnimals";
import AnimalCard from "@/components/AnimalCard";
import { Search } from "lucide-react";

const BuscarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRace, setSelectedRace] = useState("todas");
  const [selectedSize, setSelectedSize] = useState("todos");
  const [selectedLocation, setSelectedLocation] = useState("todas");

  // Extract unique values for filters
  const races = useMemo(() => {
    const uniqueRaces = Array.from(new Set(mockAnimals.map(animal => animal.raça)));
    return ["todas", ...uniqueRaces];
  }, []);

  const sizes = ["todos", "Pequeno", "Médio", "Grande"];
  
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(mockAnimals.map(animal => animal.localizacao)));
    return ["todas", ...uniqueLocations];
  }, []);

  // Filter animals based on search and filters
  const filteredAnimals = useMemo(() => {
    return mockAnimals.filter(animal => {
      const matchesSearch = animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           animal.raça.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRace = selectedRace === "todas" || animal.raça === selectedRace;
      const matchesSize = selectedSize === "todos" || animal.porte === selectedSize;
      const matchesLocation = selectedLocation === "todas" || animal.localizacao === selectedLocation;
      
      return matchesSearch && matchesRace && matchesSize && matchesLocation;
    });
  }, [searchTerm, selectedRace, selectedSize, selectedLocation]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            Encontre seu Companheiro
          </h1>
          <p className="text-lg text-gray-text">
            Use os filtros abaixo para encontrar o animal ideal para você
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
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

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Raça
              </label>
              <select
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {races.map(race => (
                  <option key={race} value={race}>
                    {race === "todas" ? "Todas as raças" : race}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Porte
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size === "todos" ? "Todos os portes" : size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Localização
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === "todas" ? "Todas as localizações" : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-text">
            {filteredAnimals.length} {filteredAnimals.length === 1 ? "animal encontrado" : "animais encontrados"}
          </p>
        </div>

        {/* Animals Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-text mb-4">
              Nenhum animal encontrado com esses filtros
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedRace("todas");
                setSelectedSize("todos");
                setSelectedLocation("todas");
              }}
              className="text-primary hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarPage;
