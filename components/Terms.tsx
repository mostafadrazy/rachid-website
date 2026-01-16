
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, FileSignature, AlertCircle, Gavel, ArrowLeft } from 'lucide-react';

interface TermsProps {
  onNavigate: (path: string) => void;
}

const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  const terms = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing this website, you confirm that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
      icon: <FileSignature size={20} />
    },
    {
      title: "2. Intellectual Property",
      content: "All content, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of Rachid Labrik or its content suppliers and is protected by international copyright laws. Unauthorized use of this material is strictly prohibited.",
      icon: <Scale size={20} />
    },
    {
      title: "3. User Conduct",
      content: "You agree not to use the website for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You are strictly prohibited from attempting to compromise the security of the website or its underlying systems.",
      icon: <AlertCircle size={20} />
    },
    {
      title: "4. Limitation of Liability",
      content: "In no event shall Rachid Labrik or its partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.",
      icon: <Gavel size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

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
          <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Legal Framework</span>
          <h1 className="text-6xl md:text-8xl font-bold uppercase font-['Oswald'] leading-[0.9] mb-8">
            Terms of <br/> <span className="text-transparent text-stroke-blue">Engagement</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">
            These terms govern your access to and use of this portfolio and its associated services. Please read them carefully.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-600">Effective Date: January 2025</p>
        </motion.div>

        <div className="space-y-8">
          {terms.map((term, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 hover:bg-white/5 transition-colors duration-300 rounded-sm group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-16 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <span className="text-blue-600 group-hover:text-white transition-colors">{term.icon}</span>
                   <h3 className="text-xl md:text-2xl font-bold font-['Oswald'] uppercase text-white">{term.title}</h3>
                </div>
                <div className="h-[1px] w-12 bg-blue-600/30 mb-6 group-hover:w-full transition-all duration-700"></div>
                <p className="text-gray-400 font-light leading-relaxed">
                  {term.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-gray-500 text-sm">
             These terms constitute the entire agreement between you and Rachid Labrik regarding the use of the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
