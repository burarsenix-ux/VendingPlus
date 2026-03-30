import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MapPin, Search, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { getVendingConsultantResponse } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  text: string;
  groundingMetadata?: any;
}

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Привет! Я ваш ИИ-консультант по вендингу. Я помогу вам выбрать лучшее место для автомата в вузах Москвы и области. С чего начнем?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await getVendingConsultantResponse(userMessage, history);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text || 'Извините, я не смог обработать ваш запрос.',
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Произошла ошибка при связи с ИИ. Пожалуйста, попробуйте позже.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderGrounding = (metadata: any) => {
    if (!metadata?.groundingChunks) return null;

    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Search size={10} /> Источники данных
        </p>
        <div className="flex flex-wrap gap-2">
          {metadata.groundingChunks.map((chunk: any, idx: number) => {
            const uri = chunk.web?.uri || chunk.maps?.uri;
            const title = chunk.web?.title || chunk.maps?.title || 'Источник';
            if (!uri) return null;
            return (
              <a 
                key={idx} 
                href={uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-blue-100 transition-colors"
              >
                {title.length > 20 ? title.substring(0, 20) + '...' : title}
                <ExternalLink size={10} />
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-lg">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">ИИ Консультант</h2>
          <p className="text-xs text-blue-100">Аналитика и мониторинг</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'model' ? <Bot size={14} className="text-blue-600" /> : <User size={14} />}
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">
                    {msg.role === 'model' ? 'Gemini AI' : 'Вы'}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4">
                  <Markdown>{msg.text}</Markdown>
                </div>
                {msg.groundingMetadata && renderGrounding(msg.groundingMetadata)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-blue-600" />
              <span className="text-sm text-gray-500 font-medium">Анализирую данные трафика...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Спросите о лучшем месте для автомата..."
            className="flex-1 bg-transparent px-3 py-2 outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3">
          Использует Google Search & Maps для актуальной аналитики
        </p>
      </div>
    </div>
  );
};
