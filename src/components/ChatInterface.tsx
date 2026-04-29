import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, Language, Scenario } from '../types';
import { chatWithAI } from '../services/geminiService';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, AlertCircle, CheckCircle2, ChevronRight, User, Bot, Loader2, Languages } from 'lucide-react';

interface ChatInterfaceProps {
  language: Language;
  scenario: Scenario;
  initialMessages: Message[];
  key?: string;
}

export default function ChatInterface({ language, scenario, initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isTtsActive, setIsTtsActive] = useState(true);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  // STT Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language.voiceCode;

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        handleSendMessage(text);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech Recognition Error', event.error);
        setIsRecording(false);
        setError(`Microphone error: ${event.error}`);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setError(null);
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const speak = (text: string) => {
    if (!isTtsActive) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language.voiceCode;
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language.voiceCode.split('-')[0])) || voices[0];
    if (voice) utterance.voice = voice;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);
    setError(null);

    try {
      const response = await chatWithAI([...messages, userMessage], language, scenario);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        correction: response.correction,
        explanation: response.explanation,
        translation: response.translation
      };

      setMessages(prev => [...prev, assistantMessage]);
      speak(response.text);
    } catch (err) {
      setError("Failed to reach Leo. Please check your connection.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full px-4 md:px-8 pb-8">
      {/* Header Info */}
      <div className="flex items-center justify-between py-4 border-b border-white/5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
            <span className="text-xl">{language.flag}</span>
          </div>
          <div>
            <h3 className="font-bold text-white leading-tight">{scenario.title}</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Practicing {language.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsTtsActive(!isTtsActive)}
            className={`p-2 rounded-lg transition-colors ${isTtsActive ? 'text-gold-400 bg-gold-400/10' : 'text-slate-500 bg-white/5'}`}
            title="Toggle Voice"
          >
            {isTtsActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600' : 'gold-gradient'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className="space-y-2">
                  <div className={`p-4 rounded-2xl relative group/msg ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600/10 border border-indigo-600/20 text-indigo-100 rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    
                    {msg.role === 'assistant' && msg.translation && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <button 
                          onClick={() => setShowTranslations(prev => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-gold-400 transition-colors uppercase tracking-wider"
                        >
                          <Languages size={12} />
                          {showTranslations[msg.id] ? 'Hide Translation' : 'View Translation'}
                        </button>
                        <AnimatePresence>
                          {showTranslations[msg.id] && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-slate-400 font-light mt-2 italic"
                            >
                              {msg.translation}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {msg.correction && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex gap-3 items-start"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Leo's Correction</p>
                        <p className="text-xs text-emerald-100 italic">"{msg.correction}"</p>
                        {msg.explanation && (
                          <p className="text-[10px] text-emerald-400/70 mt-2 leading-tight">{msg.explanation}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
               <div className="flex gap-3 items-center text-slate-500 text-xs font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Loader2 className="w-3 h-3 animate-spin text-gold-500" />
                Leo is reflecting...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="mt-6">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-0 bg-gold-500/20 blur-2xl opacity-0 group-focus-within:opacity-30 transition-opacity" />
          <div className="relative flex items-center gap-2 p-2 bg-royal-dark border border-white/10 rounded-full focus-within:border-gold-500/50 shadow-2xl transition-all">
            <button
              onClick={toggleRecording}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white/5 text-slate-400 hover:bg-gold-500/20 hover:text-gold-400'
              }`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder={`Respond to Leo in ${language.name}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-600 px-2"
            />

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isThinking}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() && !isThinking
                  ? 'gold-gradient text-white shadow-lg shadow-gold-500/20 scale-100'
                  : 'bg-white/5 text-slate-600 scale-90 opacity-50'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-center items-center gap-6 opacity-40">
           <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
            <Sparkles size={10} className="text-gold-500" />
            Adaptive Intelligence
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
            <ChevronRight size={10} />
            Natural Immersion
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 40, 0.2);
        }
      `}</style>
    </div>
  );
}
