import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! 👋 Bem-vindo ao AdoteAI! Como posso te ajudar hoje?", sender: "bot" },
    { text: "Conte-me sobre suas preferências para encontrar o pet ideal!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let botResponse = "Entendi! Estamos buscando o melhor amigo para você.";

      if (currentInput.toLowerCase().includes("cachorro")) {
        botResponse = "Temos muitos cachorros adoráveis! Você prefere porte pequeno, médio ou grande?";
      } else if (currentInput.toLowerCase().includes("gato")) {
        botResponse = "Gatos são ótimos companheiros! Você prefere um mais calmo ou brincalhão?";
      } else if (currentInput.toLowerCase().includes("adotar")) {
        botResponse = "Para adotar, clique no animal que você gostou e veja os detalhes!";
      }

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      setIsLoading(false);
    }, 1500);
  };
  // ---------------------------

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-border",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Assistente AdoteAI</h3>
              <p className="text-xs text-primary-foreground/80">Online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="h-96 p-4 overflow-y-auto bg-muted/30 flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg p-3 max-w-[80%] text-sm",
                message.sender === "bot"
                  ? "bg-white border border-border self-start text-foreground shadow-sm"
                  : "bg-primary text-primary-foreground self-end ml-auto shadow-sm"
              )}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-white border border-border rounded-lg p-3 max-w-[80%] self-start shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">Digitando...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;