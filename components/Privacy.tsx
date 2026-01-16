
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (path: string) => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  const sections = [
    {
      title: "1. Information Collection",
      content: "We collect information you provide directly to us when you fill out a contact form, subscribe to our newsletter, or communicate with us via third-party platforms. This may include your name, email address, company name, and any other information you choose to provide.",
      icon: <Database size={20} />
    },
    {
      title: "2. Usage Protocols",
      content: "The data collected is used strictly to facilitate communication, provide requested services (such as supply chain consultations or speaking engagements), and improve the operational performance of this digital platform. We do not sell data to third-party brokers.",
      icon: <Eye size={20} />
    },
    {
      title: "3. Data Security",
      content: "We employ industry-standard encryption and security protocols to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
      icon: <Lock size={20} />
    },
    {
      title: "4. Cookies & Tracking",
      content: "We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      icon: <Shield size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        <motion.button 
          onClick={handleBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors mb-12 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return Home
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Legal & Compliance</span>
          <h1 className="text-6xl md:text-8xl font-bold uppercase font-['Oswald'] leading-[0.9] mb-8">
            Privacy <br/> <span className="text-transparent text-stroke-blue">Protocol</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">
            Transparency is the foundation of trust. Below is a detailed breakdown of how we handle, process, and protect your digital footprint within this ecosystem.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-600">Last Updated: January 2025</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 hover:border-blue-600/30 transition-colors duration-300 group rounded-sm"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-white/5 rounded-sm text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-['Oswald'] uppercase text-white mb-4">{section.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-white/10 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            For specific inquiries regarding your data, please contact <a href="mailto:privacy@rachid.com" className="text-blue-500 hover:text-white transition-colors">privacy@rachid.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
