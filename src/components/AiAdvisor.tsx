import React, { useState } from 'react';
import { Sun, Send, Bot, User, X, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { AiChatMessage } from '../types';

interface AiAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      sender: 'assistant',
      text: "Hello! I'm Sunergy's AI Solar Assistant in Port St. Lucie, FL. Ask me anything about solar panel installation, hurricane ratings, $0 down financing, or your FPL bill savings!",
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: AiChatMessage = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/solar-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          city: 'Port St. Lucie, FL'
        })
      });

      const data = await res.json();
      const botMsg: AiChatMessage = {
        sender: 'assistant',
        text: data.response || "For immediate assistance, please call Sunergy directly at +1 727-375-9375!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: "I experienced a minor connection glitch. Please call our Port St. Lucie team at +1 727-375-9375 or schedule a site audit directly!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "Are panels hurricane proof in Port St. Lucie?",
    "How does FPL net metering work?",
    "What is the 30% solar tax credit?",
    "Can I get $0 down financing?"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3D37]/70 backdrop-blur-sm flex items-center justify-end p-0 sm:p-4">
      <div className="bg-[#FCFAF7] border-l sm:border border-[#E8E2D9] w-full sm:max-w-lg h-full sm:h-[680px] sm:rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden relative text-[#3D3D37]">
        
        {/* Drawer Header */}
        <div className="bg-[#3A3A2F] p-4 border-b border-[#5A5A4A] flex justify-between items-center text-[#FCFAF7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A5A40] border border-[#7A7A6B] flex items-center justify-center shadow-sm">
              <Sun className="w-5 h-5 text-[#F2B035]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                <span>Sunergy AI Advisor</span>
                <Sparkles className="w-3.5 h-3.5 text-[#F2B035]" />
              </h3>
              <p className="text-[11px] text-[#C8C2B8]">Powered by Gemini AI · Port St. Lucie, FL</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#C8C2B8] hover:text-white rounded-lg hover:bg-[#5A5A4A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                msg.sender === 'user' ? 'bg-[#5A5A40] text-[#FCFAF7]' : 'bg-[#F7F5F0] text-[#5A5A40] border border-[#E8E2D9]'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-[#5A5A40] text-[#FCFAF7] font-medium rounded-tr-none'
                  : 'bg-white text-[#3D3D37] border border-[#E8E2D9] rounded-tl-none whitespace-pre-wrap leading-relaxed shadow-sm'
              }`}>
                <p>{msg.text}</p>
                <span className="block text-[9px] opacity-60 mt-1 text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#7A7A6B] text-xs italic">
              <Sun className="w-4 h-4 text-[#F2B035] animate-spin" />
              <span>Sunergy AI is calculating solar answers...</span>
            </div>
          )}
        </div>

        {/* Sample Question Chips */}
        <div className="px-4 py-2 bg-[#F7F5F0] border-t border-[#E8E2D9] flex flex-wrap gap-1.5">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(q);
              }}
              className="text-[10px] bg-white hover:bg-[#E8E2D9] text-[#3D3D37] border border-[#E8E2D9] px-2.5 py-1 rounded-full text-left font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input & Direct Quote Action */}
        <div className="p-3 bg-white border-t border-[#E8E2D9] space-y-2">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a solar question..."
              className="flex-1 bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#3D3D37] placeholder-[#7A7A6B] focus:outline-none focus:border-[#5A5A40]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3.5 py-2 bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] rounded-xl font-bold transition-colors disabled:opacity-50 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex justify-between items-center pt-1 text-[11px]">
            <a href="tel:+17273759375" className="text-[#7A7A6B] hover:text-[#5A5A40] flex items-center gap-1 font-medium">
              <Phone className="w-3 h-3 text-[#5A5A40]" />
              <span>+1 727-375-9375</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="text-[#5A5A40] font-bold hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Book Free Site Survey →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

