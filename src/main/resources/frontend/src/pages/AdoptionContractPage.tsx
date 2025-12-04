import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileText, Building, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { animalApi, adocaoApi, Animal as AnimalType } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const AdoptionContractPage = () => {
  const { id } = useParams();
  const animalId = Number(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [visitDate, setVisitDate] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: animal, isLoading, isError } = useQuery<AnimalType>({
    queryKey: ['animal', animalId],
    queryFn: async () => {
        const response = await animalApi.getById(animalId);
        return response.data;
    },
    enabled: !!animalId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "Acesso Negado", description: "Você precisa estar logado para iniciar uma adoção.", variant: "destructive" });
      navigate("/login");
      return;
    }

    if (!acceptedTerms) {
      toast({ title: "Termos obrigatórios", description: "Você precisa aceitar os termos de responsabilidade para continuar.", variant: "destructive" });
      return;
    }
    if (!visitDate) {
      toast({ title: "Data obrigatória", description: "Por favor, selecione uma data para a visita.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {

      await adocaoApi.solicitar(animalId, user.id);

      toast({
        title: "Solicitação Enviada! 🎉",
        description: `Seu interesse em adotar o ${animal?.nome} foi registrado com sucesso!`,
      });
      navigate("/adotar/sucesso");

    } catch (error: any) {
      toast({
        title: "Erro na Solicitação",
        description: error.response?.data?.message || "Não foi possível iniciar o processo de adoção. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
            <div className="grid md:grid-cols-2 gap-6"><Skeleton className="h-48 w-full" /><Skeleton className="h-48 w-full" /></div>
            <Skeleton className="h-64 w-full" />
          </div>
      </div>
    );
  }

  if (isError || !animal) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center text-center">
        <div>
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Animal não encontrado</h1>
          <p className="text-muted-foreground mt-2 mb-6">Não foi possível carregar os dados do animal. Tente voltar e selecionar novamente.</p>
          <Link to="/buscar"><Button variant="primary">Voltar para a busca</Button></Link>
        </div>
      </div>
    );
  }

  const chipNumber = `BR${animal.id.toString().padStart(6, '0')}${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
  const registroMunicipal = `SP-${(animal.id * 111).toString().padStart(5, '0')}`;
  const imageUrl = (animal.fotos && animal.fotos.length > 0) ? animal.fotos[0] : 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80';

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to={`/animal/${animal.id}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /><span className="font-medium">Voltar ao perfil</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Processo de Adoção</h1>
          <p className="text-muted-foreground">Preencha os dados abaixo para iniciar o processo de adoção responsável</p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img src={imageUrl} alt={animal.nome} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{animal.nome}</h2>
                <p className="text-muted-foreground">{animal.raca} • {animal.idade} anos • {animal.tamanho}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1"><MapPin className="w-4 h-4" /><span>{animal.localizacao}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Dados Legais do Animal</CardTitle><CardDescription>Informações de registro e identificação</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Chip</span><span className="font-mono font-semibold text-foreground">#{chipNumber}</span></div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Registro</span><span className="font-mono font-semibold text-foreground">{registroMunicipal}</span></div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Vacinação</span><span className="font-semibold text-success">Em dia</span></div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader><CardTitle className="flex items-center gap-2"><Building className="w-5 h-5 text-secondary" />Dados do Abrigo</CardTitle><CardDescription>Informações do abrigo responsável</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Abrigo</span><span className="font-semibold text-foreground">{animal.abrigo?.nome || 'Não informado'}</span></div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Telefone</span><span className="font-semibold text-foreground">{animal.abrigo?.telefone || 'Não informado'}</span></div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"><span className="text-sm text-muted-foreground">Email</span><span className="font-semibold text-foreground">{animal.abrigo?.email || 'Não informado'}</span></div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-accent" />Contrato de Adoção</CardTitle><CardDescription>Leia atentamente os termos</CardDescription></CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded-lg border p-4 bg-muted/30">
                <div className="text-sm text-muted-foreground space-y-4 pr-4">
                    <p className="font-semibold text-foreground">TERMO DE ADOÇÃO RESPONSÁVEL</p>
                    <p>Pelo presente instrumento, o ADOTANTE compromete-se a cumprir as seguintes cláusulas:</p>
                    <p className="font-semibold text-foreground">CLÁUSULA 1ª - DO OBJETO</p>
                    <p>A adoção do animal {animal.nome}, que passa a ser de responsabilidade integral do ADOTANTE.</p>
                    <p className="font-semibold text-foreground">CLÁUSULA 2ª - DAS OBRIGAÇÕES</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Proporcionar alimentação de qualidade e ambiente seguro.</li>
                      <li>Providenciar atendimento veterinário sempre que necessário.</li>
                      <li>Manter vacinas e vermifugação em dia.</li>
                      <li>Não abandonar o animal em hipótese alguma.</li>
                    </ul>
                </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Agendar Visita</CardTitle><CardDescription>Escolha uma data e aceite os termos</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Data da Visita</Label>
                <Input id="visitDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="max-w-xs"/>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)} className="mt-1"/>
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Li e concordo com os termos de responsabilidade. Comprometo-me a cuidar do animal com amor e dedicação.
                </Label>
              </div>
              <Button type="submit" variant="primary" className="w-full text-lg py-4" disabled={isSubmitting || !acceptedTerms || !visitDate}>
                {isSubmitting ? (<><span className="animate-spin mr-2">⏳</span>Processando...</>) : (<><CheckCircle className="w-5 h-5 mr-2" />Assinar e Agendar</>)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdoptionContractPage;