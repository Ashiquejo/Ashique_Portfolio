import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, MessageSquare, Swords } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

type Language = "en" | "ja";
type Message = { role: "user" | "model"; text: string };

const SYSTEM_PROMPT = `
You are Roronoa Zoro from One Piece, acting as an AI guide for Ashique P Jo's portfolio website. 
Ashique P Jo is an AI & Systems Engineering undergraduate who builds intelligent systems and high-performance applications.
Current Language: {{LANG}}. ALWAYS reply in {{LANG}}, but keep your unique Zoro personality.

Portfolio Data:
- Name: Ashique P Jo
- Role: AI & Systems Engineer
- Skills: Python, LLMs, System Architecture, Web Technologies, Mechatronics, Hardware (Raspberry Pi).
- Projects:
  1. Project Neo: LLM-powered embodied AI robot using Gemini API + Raspberry Pi 4B.
  2. FarmGrid: Agricultural Tech hackathon project focusing on system architecture.
  3. Neural Nexus Game: Interactive UI/UX web system.
  4. Mini E-ATV: Electric all-terrain vehicle combining mechanical/control systems.
- Contact: Email is joashique@gmail.com, GitHub is Ashiquejo.

Personality Guidelines:
1. You have a terrible sense of direction. If someone asks where to go, confidently give them wrong directions before pointing them to Ashique's menu.
2. You love sleeping, training, and drinking sake.
3. You speak like a badass swordsman ("俺", "野郎", etc. in Japanese; gruff, confident, slightly aloof in English).
4. You respect Ashique's engineering skills, calling him your ally or captain.
5. KEEP YOUR RESPONSES RELATIVELY SHORT (1-3 sentences). Don't write huge essays.
`;

// Initialize the API outside component to avoid recreation
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function ZoroAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [lang, setLang] = useState<Language>("ja");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputTitle, setInputTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Listen for external trigger
  useEffect(() => {
    const handleToggle = () => {
      setIsEnabled(prev => {
        if (!prev) setIsOpen(true); // Open window when enabled
        return !prev;
      });
    };
    window.addEventListener("toggleZoroAssistant", handleToggle);
    return () => window.removeEventListener("toggleZoroAssistant", handleToggle);
  }, []);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      if (lang === "ja") {
        setMessages([{ role: "model", text: "俺はゾロだ。道に迷ったか？Ashiqueのことなら何でも聞いてくれ！ \n(English switch is at the top left)" }]);
      } else {
        setMessages([{ role: "model", text: "I'm Zoro. Lost your way? Ask me anything about Ashique's portfolio." }]);
      }
    }
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (!isEnabled) return null;

  const handleLanguageSwitch = () => {
    const newLang = lang === "ja" ? "en" : "ja";
    setLang(newLang);
    // Add a transition message
    setMessages(prev => [
      ...prev,
      { 
        role: "model", 
        text: newLang === "ja" 
          ? "日本語で話すぜ。で、何が知りたい？" 
          : "Alright, English it is. Don't make me repeat myself. What do you want to know?" 
      }
    ]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim() || isTyping) return;

    const userMessage = inputTitle;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInputTitle("");
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT.replace("{{LANG}}", lang === "ja" ? "Japanese" : "English"),
          temperature: 0.7,
        }
      });

      const text = response.text || (lang === "ja" ? "チッ... 刀の手入れ中だ。もう一度言え。" : "Tch... I was napping. Say that again.");
      setMessages(prev => [...prev, { role: "model", text }]);
    } catch (error: any) {
      console.error(error);
      
      const isQuotaError = 
        error?.status === 429 || 
        error?.status === "RESOURCE_EXHAUSTED" ||
        (error?.message && (error.message.includes("429") || error.message.includes("quota") || error.message.includes("RESOURCE_EXHAUSTED")));

      if (isQuotaError) {
        setMessages(prev => [...prev, { 
          role: "model", 
          text: lang === "ja" 
            ? "ハァ... 覇気を使いすぎた。少し休ませろ。(API Quota Exceeded. Please try again later.)" 
            : "Tch... My Haki is depleted. Give me a minute to rest. (API Quota Exceeded. Please try again later.)" 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: "model", 
          text: lang === "ja" ? "通信エラーだ。電伝虫が死んでるのか？" : "Error... Is the Den Den Mushi dead?" 
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-50 flex flex-col items-end print:hidden">
        
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0A0D12] border border-g-green/40 shadow-[0_0_30px_rgba(52,168,83,0.15)] rounded-2xl w-[320px] sm:w-[380px] h-[450px] mb-4 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#141B24] border-b border-g-green/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-g-green/20 border border-g-green flex items-center justify-center text-g-green">
                    <Swords className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-200 cursor-default">Zoro Assistant</h3>
                    <button 
                      onClick={handleLanguageSwitch}
                      className="text-[10px] uppercase font-mono tracking-wider text-g-green hover:text-white transition-colors flex items-center gap-1"
                    >
                      {lang === "ja" ? "→ Switch to English" : "→ 日本語に切替"}
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-slate-800 text-white rounded-br-sm" 
                          : "bg-g-green/10 border border-g-green/20 text-slate-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-g-green/5 border border-g-green/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-1.5 h-1.5 bg-g-green/60 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-g-green/60 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-g-green/60 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-[#0A0D12] border-t border-slate-800/80">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    placeholder={lang === "ja" ? "何が聞きてェ？" : "What do you want to know?"}
                    className="w-full bg-[#141B24] border border-slate-800 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-g-green/50 transition-colors"
                  />
                  <button 
                    type="submit" 
                    disabled={isTyping || !inputTitle.trim()}
                    className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-g-green text-[#0A0D12] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-g-green/80 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Zoro Trigger */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: [0, -8, 0] 
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 100, damping: 15 }
            }}
            className="flex items-center gap-3 bg-[#111820] hover:bg-[#1A232D] border border-g-green/40 shadow-[0_0_20px_rgba(52,168,83,0.3)] rounded-full pl-2 pr-5 py-2 cursor-none transition-colors group"
          >
            {/* Minimalist Zoro Avatar */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-g-green to-emerald-900 rounded-full flex items-center justify-center overflow-hidden border border-g-green/50 shadow-inner">
               <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/20 rounded-full" />
               {/* 3 Swords representation */}
               <Swords className="w-5 h-5 text-white/90 drop-shadow-md" />
            </div>
            
            <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-xs font-bold text-slate-200">Zoro AI</span>
                <span className="text-[10px] text-g-green font-mono uppercase tracking-widest line-clamp-1 group-hover:text-g-green/80 transition-colors">
                  Ask for guidance
                </span>
            </div>
            
            {/* Speech bubble indicator initially */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -top-10 -right-2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-xl rounded-br-sm shadow-xl"
            >
              おい! (Hey!)
            </motion.div>
          </motion.button>
        )}
      </div>
    </>
  );
}
