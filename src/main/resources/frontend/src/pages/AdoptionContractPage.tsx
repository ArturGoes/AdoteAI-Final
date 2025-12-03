import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText, Building, MapPin, Calendar, CheckCircle } from "lucide-react";
import { mockAnimals } from "@/data/mockAnimals";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";

const AdoptionContractPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [visitDate, setVisitDate] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const animal = mockAnimals.find((a) => a.id === Number(id));

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: "Termos obrigatórios",
        description: "Você precisa aceitar os termos de responsabilidade para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (!visitDate) {
      toast({
        title: "Data obrigatória",
        description: "Por favor, selecione uma data para a visita.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Agendamento Confirmado! 🎉",
      description: `Sua visita para conhecer ${animal.nome} foi agendada para ${new Date(visitDate).toLocaleDateString('pt-BR')}. Entraremos em contato em breve!`,
    });

    setIsSubmitting(false);
    navigate("/");
  };

  // Generate fake registration data based on animal id
  const chipNumber = `BR${animal.id.toString().padStart(6, '0')}${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
  const registroMunicipal = `SP-${(animal.id * 111).toString().padStart(5, '0')}`;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to={`/animal/${animal.id}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar ao perfil</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Processo de Adoção
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para iniciar o processo de adoção responsável
          </p>
        </div>

        {/* Animal Summary */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img
                src={animal.imagemUrl}
                alt={animal.nome}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{animal.nome}</h2>
                <p className="text-muted-foreground">{animal.raça} • {animal.idade} • {animal.porte}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{animal.localizacao}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Animal Legal Data */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Dados Legais do Animal
              </CardTitle>
              <CardDescription>Informações de registro e identificação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Chip de Rastreamento</span>
                <span className="font-mono font-semibold text-foreground">#{chipNumber}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Registro Municipal</span>
                <span className="font-mono font-semibold text-foreground">{registroMunicipal}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Status de Vacinação</span>
                <span className="font-semibold text-success">Em dia</span>
              </div>
            </CardContent>
          </Card>

          {/* Shelter Data */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-secondary" />
                Dados do Abrigo
              </CardTitle>
              <CardDescription>Informações do abrigo responsável</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Abrigo</span>
                <span className="font-semibold text-foreground">Patinhas Seguras</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">CNPJ</span>
                <span className="font-mono font-semibold text-foreground">00.000.000/0001-00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Responsável Técnico</span>
                <span className="font-semibold text-foreground">Dr. Silva</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contract */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Contrato de Adoção Responsável
            </CardTitle>
            <CardDescription>Leia atentamente os termos abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 w-full rounded-lg border border-border p-4 bg-muted/30">
              <div className="text-sm text-muted-foreground space-y-4 pr-4">
                <p className="font-semibold text-foreground">TERMO DE ADOÇÃO RESPONSÁVEL</p>
                
                <p>
                  Pelo presente instrumento particular de adoção de animal doméstico, o ADOTANTE, 
                  qualificado no formulário de adoção, compromete-se a cumprir integralmente as 
                  cláusulas e condições a seguir estabelecidas:
                </p>

                <p className="font-semibold text-foreground">CLÁUSULA 1ª - DO OBJETO</p>
                <p>
                  O presente termo tem por objeto a adoção do animal identificado neste documento, 
                  que passa a ser de responsabilidade integral do ADOTANTE a partir da assinatura 
                  deste termo.
                </p>

                <p className="font-semibold text-foreground">CLÁUSULA 2ª - DAS OBRIGAÇÕES DO ADOTANTE</p>
                <p>O ADOTANTE se compromete a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proporcionar alimentação adequada e de qualidade ao animal;</li>
                  <li>Manter o animal em ambiente seguro e higienizado;</li>
                  <li>Providenciar atendimento veterinário sempre que necessário;</li>
                  <li>Manter a vacinação e vermifugação em dia;</li>
                  <li>Não abandonar o animal em hipótese alguma;</li>
                  <li>Comunicar ao abrigo em caso de impossibilidade de manter o animal;</li>
                  <li>Permitir visitas de acompanhamento pós-adoção;</li>
                  <li>Tratar o animal com respeito, carinho e dignidade.</li>
                </ul>

                <p className="font-semibold text-foreground">CLÁUSULA 3ª - DA CASTRAÇÃO</p>
                <p>
                  Caso o animal não esteja castrado no momento da adoção, o ADOTANTE compromete-se 
                  a realizar o procedimento em até 6 (seis) meses, conforme orientação veterinária.
                </p>

                <p className="font-semibold text-foreground">CLÁUSULA 4ª - DAS PROIBIÇÕES</p>
                <p>É expressamente proibido ao ADOTANTE:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Vender, doar ou transferir o animal a terceiros sem autorização prévia;</li>
                  <li>Manter o animal acorrentado ou em espaços inadequados;</li>
                  <li>Submeter o animal a maus-tratos de qualquer natureza;</li>
                  <li>Utilizar o animal para fins de reprodução comercial.</li>
                </ul>

                <p className="font-semibold text-foreground">CLÁUSULA 5ª - DO DESCUMPRIMENTO</p>
                <p>
                  O descumprimento de qualquer cláusula deste termo ensejará a retomada do animal 
                  pelo abrigo, sem prejuízo das sanções legais cabíveis, nos termos da Lei Federal 
                  nº 9.605/98 (Lei de Crimes Ambientais).
                </p>

                <p className="font-semibold text-foreground">CLÁUSULA 6ª - DAS DISPOSIÇÕES FINAIS</p>
                <p>
                  O ADOTANTE declara estar ciente de todas as responsabilidades assumidas neste 
                  termo e se compromete a zelar pelo bem-estar do animal adotado.
                </p>

                <p className="text-xs text-muted-foreground mt-6">
                  Este documento tem validade legal conforme as disposições do Código Civil Brasileiro 
                  e legislação específica de proteção animal.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Agendar Visita
            </CardTitle>
            <CardDescription>Escolha uma data e aceite os termos para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Data da Visita/Adoção</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="max-w-xs"
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Li e concordo com os termos de responsabilidade descritos no contrato de adoção acima. 
                  Comprometo-me a cuidar do animal com amor, respeito e dedicação, proporcionando 
                  um lar seguro e adequado às suas necessidades.
                </Label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full text-lg py-4"
                disabled={isSubmitting || !acceptedTerms || !visitDate}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Assinar e Agendar Visita
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdoptionContractPage;
