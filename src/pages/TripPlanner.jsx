import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, MapPin, Calendar, Users, Wallet, 
  Sparkles, Hotel, Map, Navigation, Heart, Plus,
  Coffee, Sun, Moon, Camera, Check, ChevronRight, Key
} from 'lucide-react';

const DUMMY_HOTELS = [
  { id: 1, name: "Taj Exotica Resort & Spa", location: "Goa", price: "₹15,000/night", rating: 4.9, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "W Goa", location: "Vagator, Goa", price: "₹12,500/night", rating: 4.8, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "The Leela", location: "Mobor Beach, Goa", price: "₹18,000/night", rating: 4.9, image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?auto=format&fit=crop&q=80&w=600" }
];

const DUMMY_ITINERARY = [
  {
    day: 1,
    title: "Arrival & North Goa Beaches",
    activities: [
      { time: "10:00 AM", desc: "Check-in at Hotel", icon: Hotel },
      { time: "01:00 PM", desc: "Lunch at Curlies, Anjuna", icon: Coffee },
      { time: "04:00 PM", desc: "Sunset at Baga Beach", icon: Sun },
      { time: "08:00 PM", desc: "Dinner at Tito's Lane", icon: Moon }
    ]
  },
  {
    day: 2,
    title: "Heritage & South Goa",
    activities: [
      { time: "09:00 AM", desc: "Visit Basilica of Bom Jesus", icon: Camera },
      { time: "12:00 PM", desc: "Explore Fontainhas (Latin Quarter)", icon: MapPin },
      { time: "03:00 PM", desc: "Relax at Palolem Beach", icon: Sun },
      { time: "07:00 PM", desc: "Sunset Cruise on Mandovi River", icon: Navigation }
    ]
  }
];

const QUICK_PROMPTS = [
  "Plan Goa Trip",
  "Weekend under ₹10k",
  "Family Vacation",
  "Beach Destinations"
];

const TripPlanner = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your Roomify AI Travel Concierge. I can help you plan your perfect trip, generate itineraries, and find the best hotels. Where would you like to go?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSetApiKey = () => {
    const currentKey = localStorage.getItem('gemini_api_key') || '';
    const newKey = window.prompt("Enter your Google Gemini API Key:", currentKey);
    if (newKey !== null) {
      if (newKey.trim()) {
        localStorage.setItem('gemini_api_key', newKey.trim());
        alert("API Key saved successfully!");
      } else {
        localStorage.removeItem('gemini_api_key');
        alert("API Key removed.");
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 1. Get API Key
      let apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
      
      if (!apiKey) {
        // Fallback to Demo Mode
        setTimeout(() => {
          const demoResponse = "I'm currently running in **Demo Mode** because no Gemini API Key was found. \n\nHere is a demo itinerary for Goa based on your request:\n- Day 1: Relax at the beautiful beaches of North Goa.\n- Day 2: Explore the rich heritage and churches of Old Goa.\n- Day 3: Enjoy water sports and a sunset cruise.\n\nTo enable the real AI planner, please click the Settings/Key icon above to add your API Key.";
          
          const newBotMsg = {
            id: Date.now() + 1,
            type: 'bot',
            text: demoResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            showCards: true
          };
          setMessages(prev => [...prev, newBotMsg]);
          setIsTyping(false);
          setShowItinerary(true);
        }, 1500);
        return;
      }

      // 2. Build Prompt Context
      const chatHistory = messages.map(msg => `${msg.type === 'bot' ? 'Assistant' : 'User'}: ${msg.text}`).join('\n');
      const promptText = `You are an expert travel concierge for a luxury booking platform called Roomify. Your name is Roomify AI.
You help users plan trips, suggest destinations, create itineraries, and estimate budgets. 
Be conversational, enthusiastic, and provide well-structured information. Keep responses concise and use plain text with simple bullet points (do not use markdown headers if possible).

Previous Conversation:
${chatHistory}

User: ${text}
Assistant:`;

      // 3. Fetch from Gemini REST API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }]
        })
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 403) {
           localStorage.removeItem('gemini_api_key'); // clear invalid key
           throw new Error("Invalid API Key. The saved key has been cleared. Please update it using the key icon above.");
        }
        throw new Error("Failed to communicate with AI API. Please check your internet connection.");
      }

      const data = await response.json();
      // Remove generic markdown bolding (**) for cleaner display if we don't have a markdown parser
      let botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request right now.";
      botResponseText = botResponseText.replace(/\*\*/g, ''); 

      // 4. Update UI
      const shouldShowCards = /goa|itinerary|budget|plan|hotel|trip/i.test(text) || /goa|itinerary|budget/i.test(botResponseText);

      const newBotMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponseText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCards: shouldShowCards
      };

      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
      
      if (shouldShowCards) {
        setShowItinerary(true);
      }
    } catch (error) {
      console.error('AI Planner Error:', error);
      
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: `Error: ${error.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCards: false
      };

      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] relative overflow-hidden flex page-transition">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-8 relative z-10 h-[calc(100vh-80px)]">
        
        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex-1 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${showItinerary ? 'lg:w-1/2' : 'w-full'}`}
        >
          {/* Chat Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center p-[2px]">
                <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Roomify AI Planner</h2>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Online | Ready to plan
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSetApiKey}
                className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
                title="Set API Key"
              >
                <Key className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-blue-500 to-purple-500'}`}>
                  {msg.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                
                <div className={`max-w-[80%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">{msg.timestamp}</span>

                  {/* AI Generated Content Cards */}
                  {msg.showCards && (
                    <div className="mt-4 w-full space-y-4">
                      {/* Budget Breakdown */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full">
                        <div className="flex items-center gap-2 mb-3">
                          <Wallet className="w-4 h-4 text-green-400" />
                          <h4 className="text-white font-medium text-sm">Estimated Budget</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-black/20 p-2 rounded-lg">
                            <p className="text-gray-400 text-xs">Flights/Travel</p>
                            <p className="text-white font-medium">₹8,000</p>
                          </div>
                          <div className="bg-black/20 p-2 rounded-lg">
                            <p className="text-gray-400 text-xs">Accommodation</p>
                            <p className="text-white font-medium">₹15,000</p>
                          </div>
                          <div className="bg-black/20 p-2 rounded-lg">
                            <p className="text-gray-400 text-xs">Activities</p>
                            <p className="text-white font-medium">₹5,000</p>
                          </div>
                          <div className="bg-black/20 p-2 rounded-lg">
                            <p className="text-gray-400 text-xs">Total (Est.)</p>
                            <p className="text-green-400 font-medium">₹28,000</p>
                          </div>
                        </div>
                      </div>

                      {/* View Details Button (Mobile mostly) */}
                      <button 
                        onClick={() => setShowItinerary(true)}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 lg:hidden"
                      >
                        View Full Plan <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length < 3 && (
            <div className="px-5 pb-2 flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-5 pt-3 border-t border-white/10 bg-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about a destination, budget, or dates..."
                className="w-full bg-black/50 border border-white/10 rounded-full pl-5 pr-14 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Right Panel (Itinerary & Hotels) */}
        <AnimatePresence>
          {showItinerary && (
            <motion.div 
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '100%' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="hidden lg:flex flex-1 flex-col gap-6 overflow-hidden"
            >
              <div className="h-full overflow-y-auto space-y-6 scrollbar-hide pr-2">
                
                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Your Goa Plan</h3>
                    <p className="text-gray-400 text-xs">2 Days • 2 Adults • Premium</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Save
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                      Book Trip
                    </button>
                  </div>
                </div>

                {/* Itinerary Section */}
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Day-wise Itinerary
                  </h4>
                  <div className="space-y-4">
                    {DUMMY_ITINERARY.map((day) => (
                      <div key={day.day} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                          <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                            D{day.day}
                          </span>
                          <h5 className="text-white font-medium">{day.title}</h5>
                        </div>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                          {day.activities.map((act, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-[#121212] group-hover:border-purple-500 text-gray-500 group-hover:text-purple-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                                <act.icon className="w-3 h-3" />
                              </div>
                              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors ml-4 md:ml-0">
                                <div className="flex items-center justify-between mb-1">
                                  <time className="text-xs font-medium text-blue-400">{act.time}</time>
                                </div>
                                <div className="text-sm text-gray-300">{act.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel Recommendations */}
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-blue-400" /> Recommended Stays
                  </h4>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {DUMMY_HOTELS.map((hotel) => (
                      <div key={hotel.id} className="min-w-[240px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
                        <div className="relative h-32 overflow-hidden">
                          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-white flex items-center gap-1">
                            <span className="text-yellow-400">★</span> {hotel.rating}
                          </div>
                        </div>
                        <div className="p-4">
                          <h5 className="text-white font-medium text-sm mb-1 truncate">{hotel.name}</h5>
                          <p className="text-gray-400 text-xs mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" /> {hotel.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-400 font-semibold text-sm">{hotel.price}</span>
                            <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Preview Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 relative overflow-hidden h-48 group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end">
                    <h4 className="text-white font-medium mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-red-400" /> Interactive Map</h4>
                    <p className="text-gray-400 text-xs mb-3">View all locations and routes</p>
                    <button className="self-start px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-md border border-white/10">
                      Open Map View
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TripPlanner;
