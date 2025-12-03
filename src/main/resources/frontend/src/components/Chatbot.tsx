import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          "fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-2xl transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center justify-between">
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
        <div className="h-96 p-4 overflow-y-auto bg-muted/30">
          <div className="flex flex-col gap-3">
            <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">
                Olá! 👋 Bem-vindo ao AdoteAI! Como posso te ajudar hoje?
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">
                Estou aqui para responder suas dúvidas sobre adoção, cuidados com pets e muito mais!
              </p>
            </div>
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>Chatbot em desenvolvimento</p>
              <p className="mt-1">Em breve você poderá conversar conosco!</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              disabled
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              disabled
              className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
