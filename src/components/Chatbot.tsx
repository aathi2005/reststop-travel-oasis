
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, X, Mic, MicOff } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatbotProps {
  onFindNearbyRestrooms: (query: string) => void;
}

export function Chatbot({ onFindNearbyRestrooms }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm your RestStop assistant. How can I help you find restrooms today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse: string;
      
      if (message.toLowerCase().includes("restroom") || 
          message.toLowerCase().includes("bathroom") || 
          message.toLowerCase().includes("toilet")) {
        botResponse = "I found several restrooms near your location. Would you like me to show them on the map?";
        onFindNearbyRestrooms(message);
      } else if (message.toLowerCase().includes("help")) {
        botResponse = "You can ask me to find restrooms near you, get information about amenities, or check cleanliness ratings. How can I assist you today?";
      } else if (message.toLowerCase().includes("clean")) {
        botResponse = "I can help you find the cleanest restrooms in your area. Would you like me to show those on the map?";
      } else {
        botResponse = "I'm here to help you find and locate restrooms. Can you provide more details about what you're looking for?";
      }
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, we would implement voice recognition here
  };

  return (
    <>
      {!isOpen && (
        <Button 
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </Button>
      )}
      
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-96 shadow-xl flex flex-col animate-fade-in">
          <div className="flex items-center justify-between bg-primary text-white p-3 rounded-t-lg">
            <div className="font-semibold">RestStop Assistant</div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-primary/80">
              <X size={18} />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user" 
                        ? "bg-primary text-white" 
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <CardContent className="border-t p-3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                onClick={toggleListening}
              >
                {isListening ? (
                  <MicOff size={18} className="text-red-500" />
                ) : (
                  <Mic size={18} />
                )}
              </Button>
              <Button type="submit" size="icon">
                <Send size={18} />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
