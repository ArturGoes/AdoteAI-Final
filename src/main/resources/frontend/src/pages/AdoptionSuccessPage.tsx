import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import Button from "@/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdoptionSuccessPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <Card className="shadow-xl animate-in fade-in-50 zoom-in-95">
          <CardHeader>
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="w-12 h-12 text-success" />
            </div>
            <CardTitle className="text-3xl text-foreground">
              Tudo Certo!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Seu processo de adoção foi iniciado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Recebemos seu interesse! O abrigo entrará em contato em breve pelo seu email ou telefone para confirmar os próximos passos da sua visita.
            </p>
            <p className="font-semibold text-primary">
              Obrigado por escolher adotar e mudar uma vida! 🐾
            </p>
            <div>
              <Link to="/">
                <Button variant="primary" className="w-full sm:w-auto">
                  Voltar para a Página Inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdoptionSuccessPage;