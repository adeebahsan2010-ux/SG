import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Instagram */}
      <motion.a
        href="https://instagram.com/shreeganesh1317"
        target="_blank"
        rel="noreferrer"
        aria-label="Follow on Instagram"
        data-testid="button-floating-instagram"
        className="flex items-center justify-center w-13 h-13 w-[52px] h-[52px] rounded-full shadow-[0_4px_14px_rgba(225,48,108,0.4)] hover:scale-110 transition-transform duration-300 text-white"
        style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        whileHover={{ y: -4 }}
      >
        <SiInstagram className="w-5 h-5 relative z-10" />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919465091977"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        data-testid="button-floating-whatsapp"
        className="flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ y: -4 }}
      >
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-60"></span>
        <MessageCircle className="w-6 h-6 relative z-10" />
      </motion.a>
    </div>
  );
}
