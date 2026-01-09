import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Linkedin, Instagram, Youtube, ArrowUpRight, CheckCircle2, Clock, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqearzap";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-32 relative overflow-hidden">
      
      {/* Immersive Deep Void Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[100vh] bg-gradient-to-b from-blue-900/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Bold Narrative */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div>
                  <h1 className="text-7xl md:text-9xl font-bold uppercase font-['Oswald'] leading-[0.8] tracking-tighter mb-8">
                    Start the <br/>
                    <span className="text-blue-600">Dialogue.</span>
                  </h1>
                  <p className="text-xl text-gray-400 font-light leading-relaxed max-w-sm">
                    Strategic leadership and transformation begin with a single inquiry. Direct, focused, and purposeful.
                  </p>
                </div>

                <div className="pt-12 border-t border-white/10 space-y-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Electronic Correspondence</span>
                    <a href="mailto:contact@rachid.com" className="text-2xl font-['Syne'] font-bold hover:text-blue-500 transition-colors flex items-center gap-2">
                      contact@rachid.com <ArrowUpRight size={20} className="text-blue-900" />
                    </a>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Operational Base</span>
                    <p className="text-2xl font-['Syne'] font-bold flex items-center gap-3">
                      Dubai, MEA <MapPin size={18} className="text-blue-600" />
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                       <Clock size={12} /> Local Time: {time} (GST)
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  {/* FIX: Use component references instead of elements to avoid cloneElement typing issues with Lucide icons */}
                  {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                    <motion.a 
                      key={i} 
                      href="#" 
                      whileHover={{ y: -4 }}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sharp Monolithic Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 w-full"
            >
              <div className="bg-[#080808] border border-white/10 p-10 md:p-16 rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-16 text-center"
                    >
                      <CheckCircle2 size={56} className="text-blue-600 mx-auto mb-8" />
                      <h3 className="text-4xl font-bold font-['Oswald'] uppercase mb-4 tracking-tighter">Engagement Received</h3>
                      <p className="text-gray-400 font-light max-w-xs mx-auto">Your message has been securely logged. I will respond within 48 hours.</p>
                      <button 
                        onClick={() => setSubmitStatus('idle')}
                        className="mt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 hover:text-white transition-colors border-b border-blue-500/30 pb-1"
                      >
                        New Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full bg-[#0a0a0a] border border-white/5 p-5 text-white focus:border-blue-600 outline-none transition-all placeholder:text-gray-800 font-['Syne'] font-bold uppercase text-sm tracking-widest"
                            placeholder="Identity"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Email</label>
                          <input 
                            required
                            type="email" 
                            className="w-full bg-[#0a0a0a] border border-white/5 p-5 text-white focus:border-blue-600 outline-none transition-all placeholder:text-gray-800 font-['Syne'] font-bold uppercase text-sm tracking-widest"
                            placeholder="Contact Point"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Strategic Subject</label>
                        <input 
                          required
                          type="text" 
                          className="w-full bg-[#0a0a0a] border border-white/5 p-5 text-white focus:border-blue-600 outline-none transition-all placeholder:text-gray-800 font-['Syne'] font-bold uppercase text-sm tracking-widest"
                          placeholder="Purpose of Connection"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Detailed Brief</label>
                        <textarea 
                          required
                          rows={6}
                          className="w-full bg-[#0a0a0a] border border-white/5 p-5 text-white focus:border-blue-600 outline-none transition-all placeholder:text-gray-800 resize-none font-['Syne'] font-bold uppercase text-sm tracking-widest leading-relaxed"
                          placeholder="Describe the opportunity or challenge..."
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative py-7 bg-white text-black font-bold uppercase tracking-[0.6em] text-[11px] hover:bg-blue-600 hover:text-white transition-all overflow-hidden flex items-center justify-center gap-4 disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isSubmitting ? "Processing..." : <>Initiate Engagement <Send size={16} /></>}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              {/* Minimal footer inside column */}
              <div className="mt-8 flex justify-between items-center text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em]">
                <span>Secured Transaction</span>
                <span className="text-blue-900">•</span>
                <span>Direct Access</span>
                <span className="text-blue-900">•</span>
                <span>MEA Regional Node</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;