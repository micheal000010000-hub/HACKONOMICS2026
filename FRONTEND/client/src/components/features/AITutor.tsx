import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your crypto tutor. Ask me anything about blockchain, cryptography, or how this simulation works!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMsg: Message = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    chatMutation.mutate(
      { message: inputValue, history: messages },
      {
        onSuccess: (data) => {
          setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
        },
        onError: () => {
          setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I had trouble connecting to the network. Please try again." }]);
        }
      }
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[90vw] md:w-[400px] h-[500px] glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl border-primary/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Crypto Tutor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === "user" ? "bg-muted text-foreground" : "bg-primary/20 text-primary"
                  )}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary/20 text-primary-foreground rounded-tr-sm" 
                      : "bg-muted/50 border border-border rounded-tl-sm"
                  )}>
                    <div className="
                    prose prose-sm dark:prose-invert max-w-none
                    prose-code:bg-muted prose-code:px-1 prose-code:rounded
                  ">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-sm p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about crypto..."
                  className="pr-12 bg-background/50 border-primary/20 focus:border-primary/50 transition-colors"
                  disabled={chatMutation.isPending}
                />
                <Button 
                  size="icon"
                  type="submit" 
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="absolute right-1 top-1 h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 md:right-8 z-40 p-4 rounded-full shadow-lg shadow-primary/25 transition-all duration-300",
          isOpen ? "bg-muted text-muted-foreground scale-0 opacity-0" : "bg-primary text-primary-foreground scale-100 opacity-100"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </>
  );
}
