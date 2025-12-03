import { Heart, Shield, Users, Sparkles, PawPrint, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/Button";

const steps = [
  {
    number: "01",
    title: "Encontre seu Match",
    description: "Use nossa IA para encontrar o pet perfeito para seu estilo de vida.",
    icon: Sparkles,
    color: "text-primary",
  },
  {
    number: "02",
    title: "Conheça o Animal",
    description: "Visite o abrigo parceiro e conheça seu possível novo companheiro.",
    icon: Heart,
    color: "text-accent",
  },
  {
    number: "03",
    title: "Processo de Adoção",
    description: "Preencha o formulário e passe pela entrevista de adoção responsável.",
    icon: Shield,
    color: "text-secondary",
  },
  {
    number: "04",
    title: "Leve para Casa",
    description: "Após aprovação, leve seu novo amigo para casa e comece essa jornada!",
    icon: Users,
    color: "text-success",
  },
];

const values = [
  {
    title: "Adoção Responsável",
    description: "Acreditamos que cada animal merece um lar amoroso e adequado às suas necessidades.",
    icon: Heart,
  },
  {
    title: "Tecnologia a Serviço do Bem",
    description: "Usamos inteligência artificial para conectar animais e adotantes de forma mais eficiente.",
    icon: Sparkles,
  },
  {
    title: "Transparência",
    description: "Todas as informações sobre os animais são verificadas e atualizadas constantemente.",
    icon: Shield,
  },
  {
    title: "Comunidade",
    description: "Trabalhamos em parceria com abrigos e ONGs para ampliar o alcance das adoções.",
    icon: Users,
  },
];

const SobrePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <PawPrint className="w-5 h-5" />
            <span className="font-medium">Sobre o AdoteAI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto">
            Conectando corações através da tecnologia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O AdoteAI nasceu da vontade de transformar o processo de adoção de animais,
            usando inteligência artificial para criar conexões perfeitas entre pets e famílias.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Acreditamos que todo animal merece um lar amoroso. Nossa missão é facilitar
                o processo de adoção, tornando-o mais acessível, transparente e eficiente
                através da tecnologia.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Com nossa plataforma, queremos reduzir o número de animais abandonados
                e aumentar as taxas de adoção responsável no Brasil.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Adoção Responsável</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">IA Avançada</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80"
                  alt="Cachorro feliz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O processo de adoção é simples e seguro. Veja como você pode encontrar
              seu novo melhor amigo em 4 passos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="text-6xl font-bold text-muted/30 absolute top-2 right-4">
                    {step.number}
                  </div>
                  <step.icon className={`w-12 h-12 ${step.color} mb-4`} />
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam todas as nossas ações e decisões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para encontrar seu novo amigo?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Comece agora mesmo usando nossa IA para encontrar o pet perfeito para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/encontre-seu-match">
              <Button variant="secondary" className="px-8 py-3 text-lg bg-background text-foreground hover:bg-background/90">
                <Sparkles className="w-5 h-5 mr-2" />
                Encontre seu Match
              </Button>
            </Link>
            <Link to="/buscar">
              <Button variant="outline" className="px-8 py-3 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Ver Animais
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobrePage;
