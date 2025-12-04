import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Home, Clock, Heart, ArrowRight, AlertCircle, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";
import { matchApi, MatchResponse, Animal } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const temperamentoOptions = [
  { value: "1", label: "Calmo", description: "Prefere um pet tranquilo e relaxado" },
  { value: "2", label: "Ativo", description: "Gosta de brincadeiras e atividades" },
  { value: "3", label: "Tímido", description: "Busca um companheiro mais reservado" },
  { value: "4", label: "Sociável", description: "Adora interação e novos amigos" },
];

const MatchPage = () => {
  const { toast } = useToast();
  const [espacoEmCasa, setEspacoEmCasa] = useState<number>(50);
  const [tempoDisponivel, setTempoDisponivel] = useState<number>(2);
  const [preferenciaTemperamento, setPreferenciaTemperamento] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await matchApi.findMatch({
        espacoEmCasa: parseFloat(espacoEmCasa.toString()),
        tempoDisponivel: parseFloat(tempoDisponivel.toString()),
        preferenciaTemperamento: parseInt(preferenciaTemperamento, 10),
      });

      if (response.success && response.animais && response.animais.length > 0) {
        setResult(response);
        toast({
          title: "Match encontrado!",
          description: `A IA encontrou ${response.animais.length} ${response.animais.length > 1 ? 'pets compatíveis' : 'pet compatível'}.`,
        });
      } else {
        const msg = response.message || "Não foi possível encontrar um animal com este perfil.";
        setError(msg);
        setResult(response);
        toast({
            title: "Ops!",
            description: msg,
            variant: "destructive",
        });
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao conectar com o servidor. Verifique se o backend Java está rodando.";
      setError(message);
      toast({
        title: "Erro no Match",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Powered by AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Encontre seu Match Perfeito
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa inteligência artificial vai analisar seu perfil e encontrar o pet ideal para você.
            Responda algumas perguntas e deixe a magia acontecer!
          </p>
        </div>

        {!result ? (
          <Card className="max-w-2xl mx-auto shadow-xl border-2">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-accent" />
                Conte-nos sobre você
              </CardTitle>
              <CardDescription>
                Preencha os campos abaixo para encontrarmos o pet perfeito
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Campos do formulário (sem alteração) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2"><Home className="w-5 h-5 text-primary" /><Label className="text-base font-semibold">Espaço em Casa</Label></div>
                  <p className="text-sm text-muted-foreground">Quantos metros quadrados tem sua casa/apartamento?</p>
                  <div className="pt-2">
                    <Slider value={[espacoEmCasa]} onValueChange={(value) => setEspacoEmCasa(value[0])} min={20} max={300} step={10} className="w-full" />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground"><span>20m²</span><span className="font-semibold text-primary text-lg">{espacoEmCasa}m²</span><span>300m²</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-secondary" /><Label className="text-base font-semibold">Tempo Disponível</Label></div>
                  <p className="text-sm text-muted-foreground">Quantas horas por dia você pode dedicar ao pet?</p>
                  <div className="pt-2">
                    <Slider value={[tempoDisponivel]} onValueChange={(value) => setTempoDisponivel(value[0])} min={1} max={8} step={0.5} className="w-full" />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground"><span>1h</span><span className="font-semibold text-secondary text-lg">{tempoDisponivel}h/dia</span><span>8h</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-accent" /><Label className="text-base font-semibold">Preferência de Temperamento</Label></div>
                  <p className="text-sm text-muted-foreground">Que tipo de personalidade você prefere em um pet?</p>
                  <RadioGroup value={preferenciaTemperamento} onValueChange={setPreferenciaTemperamento} className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {temperamentoOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem value={option.value} id={`temp-${option.value}`} className="peer sr-only" />
                        <Label htmlFor={`temp-${option.value}`} className="flex flex-col items-start p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50">
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-muted-foreground">{option.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {error && (<div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg"><AlertCircle className="w-5 h-5" /><span>{error}</span></div>)}
                <Button type="submit" variant="primary" className="w-full text-lg py-4" disabled={isLoading}>
                  {isLoading ? (<><span className="animate-spin mr-2">⏳</span>Analisando...</>) : (<><Sparkles className="w-5 h-5 mr-2" />Encontrar Meu Match</>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <MatchResult result={result} onReset={resetForm} />
        )}
      </div>
    </div>
  );
};

interface MatchResultProps {
  result: MatchResponse;
  onReset: () => void;
}

const MatchResult = ({ result, onReset }: MatchResultProps) => {
  const { animais, matchScore, iaReasoning } = result;

  if (!animais || animais.length === 0) {
    return (
        <div className="max-w-md mx-auto text-center">
            <Card className="shadow-xl border-2 border-destructive/20">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                      Nenhum Match Encontrado
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground mb-4">
                      {result.message || "Não conseguimos encontrar animais disponíveis com esse perfil no momento."}
                  </p>
                  <Button variant="outline" onClick={onReset}>Tentar Novamente</Button>
              </CardContent>
            </Card>
        </div>
    )
  }

  const displayScore = matchScore !== undefined 
    ? (matchScore <= 1 ? Math.round(matchScore * 100) : Math.round(matchScore)) 
    : 85;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Card className="shadow-xl border-2 border-primary/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Match Encontrado!</h2>
          <p className="opacity-90">A IA encontrou {animais.length} {animais.length > 1 ? 'pets compatíveis' : 'pet compatível'} para você!</p>
        </div>
        <CardContent className="pt-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted/20" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray={`${(displayScore / 100) * 440} 440`} strokeLinecap="round" className="text-primary transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-primary">{displayScore}%</span>
                <span className="text-sm text-muted-foreground">Compatibilidade</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CORREÇÃO: Loop para renderizar cada animal encontrado */}
      {animais.map((animal: Animal) => (
        <Card key={animal.id} className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-square md:aspect-auto relative">
               <img
                src={(animal.fotos && animal.fotos.length > 0) ? animal.fotos[0] : `https://source.unsplash.com/600x600/?${animal.raca || 'dog'},pet`}
                alt={animal.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                  {animal.status === 'DISPONIVEL' ? 'Disponível' : 'Adotado'}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-foreground">{animal.nome}</h3>
              <p className="text-muted-foreground mb-4 font-medium text-lg">{animal.raca}</p>
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>{animal.idade} {animal.idade > 1 ? 'anos' : 'ano'}</span></div>
                  <div className="flex items-center gap-2"><Home className="w-4 h-4" /> <span>Porte {animal.tamanho}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> <span>{animal.localizacao}</span></div>
              </div>
              {animal.temperamento && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                      {animal.temperamento}
                  </span>
                </div>
              )}
              <Link to={`/animal/${animal.id}`}>
                <Button variant="primary" className="w-full">
                  Ver Perfil Completo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}

      <Card className="shadow-xl border-2 border-accent/20">
        <CardHeader className="bg-accent/5">
          <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent" />Análise da IA</CardTitle>
          <CardDescription>Veja por que este perfil de pet é ideal para você</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-foreground leading-relaxed whitespace-pre-line">{iaReasoning || "Com base no seu perfil, estes animais têm as características ideais para se adaptar à sua rotina."}</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" onClick={onReset} className="px-8">
          Fazer Novo Match
        </Button>
      </div>
    </div>
  );
};

export default MatchPage;