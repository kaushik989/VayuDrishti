import React, { useState } from 'react';
import { requestAiAdvisory } from '../services/awsService';
import { Sparkles, X, Send, Bot, User, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function BedrockAgentModal({ isOpen, onClose, lang, selectedStation }) {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'hi'
        ? `नमस्ते! मैं VayuAI हूँ, AWS Bedrock (Claude 3.5 Sonnet) द्वारा संचालित आपका पर्यावरण स्वास्थ्य एवं नागरिक आपातकालीन सलाहकार। आप मुझसे स्कूल सुरक्षा, अस्थमा देखभाल, सुरक्षित आवागमन या नगरपालिका एक्शन के बारे में पूछ सकते हैं।`
        : `Greetings! I am VayuAI, your environmental health and emergency action copilot powered by AWS Bedrock (Claude 3.5 Sonnet). How can I assist you with AQI mitigations, school safety, or citizen protection today?`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    { title: "School Morning Assembly", query: "Should schools in Rohini/DTU cancel morning assembly today under current AQI?" },
    { title: "Asthma Emergency Care", query: "Emergency protocol for asthmatic patients during severe PM2.5 haze." },
    { title: "Anti-Smog Artillery Order", query: "Generate a municipal dispatch directive for Bawana industrial belt." },
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const newMsgs = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await requestAiAdvisory({
        topic: textToSend,
        userProfile: "Citizen / School Admin",
        language: lang,
        stationId: selectedStation?.id
      });

      setMessages([...newMsgs, {
        role: 'assistant',
        content: res.content,
        source: res.source,
        model: res.modelId
      }]);
    } catch (err) {
      setMessages([...newMsgs, { role: 'assistant', content: "Failed to connect to AI agent. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <span>VayuAI Agent</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50">
                  AWS Bedrock Claude 3.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Context: {selectedStation ? selectedStation.name : "Delhi NCR Grid"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-slate-500 whitespace-nowrap">Suggested:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs whitespace-nowrap border border-slate-700 transition-colors"
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700 whitespace-pre-wrap'
              }`}>
                {m.content}
                {m.source && (
                  <div className="mt-2 pt-2 border-t border-slate-700/60 text-[10px] text-amber-400/80 font-mono">
                    ⚡ {m.source}
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
              <span>AWS Bedrock reasoning in progress...</span>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'hi' ? 'वायु गुणवत्ता, स्वास्थ्य या स्कूल नीति के बारे में पूछें...' : 'Ask about air quality, health precautions, or school policy...'}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
