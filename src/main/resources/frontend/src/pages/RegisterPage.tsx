import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PawPrint, User, Mail, Lock, MapPin, Home, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    endereco: "",
    espacoEmCasa: "",
    tempoDisponivel: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.register({
        ...formData,
        espacoEmCasa: Number(formData.espacoEmCasa),
        tempoDisponivel: Number(formData.tempoDisponivel)
      });

      if (response.success) {
        toast({
          title: "Conta criada!",
          description: "Faça login para continuar.",
        });
        navigate("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: response.message || "Erro ao criar conta.",
        });
      }
    } catch (error: any) {

      console.error("Erro detalhado no registro:", error);

      const serverMessage = error.response?.data?.message || "Erro ao conectar com o servidor.";

      toast({
        variant: "destructive",
        title: "Erro",
        description: serverMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-light-bg">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <PawPrint className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-3xl text-primary">Crie sua conta</CardTitle>
            <CardDescription>Junte-se à comunidade AdoteAI</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="nome" className="pl-9" placeholder="Seu nome" value={formData.nome} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="email" type="email" className="pl-9" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="senha" type="password" className="pl-9" placeholder="******" value={formData.senha} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="endereco" className="pl-9" placeholder="Rua, Cidade - Estado" value={formData.endereco} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="espacoEmCasa">Espaço em Casa (m²)</Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="espacoEmCasa" type="number" className="pl-9" placeholder="Ex: 80" value={formData.espacoEmCasa} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempoDisponivel">Tempo Livre (horas/dia)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="tempoDisponivel" type="number" className="pl-9" placeholder="Ex: 4" value={formData.tempoDisponivel} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                Criar Conta
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Faça Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;