import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/77cc710b-6b57-4c3d-9ae3-c9e5f499eb0d.png')",
          filter: "brightness(0.7)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/90 to-white/90 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span 
          className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm"
          {...fadeIn}
        >
          Personalisierte Kinderlieder
        </motion.span>
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          Magische Momente durch personalisierte Kinderlieder
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl mx-auto"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          Erschaffe einzigartige Lieder für besondere Anlässe, die dein Kind zum Strahlen bringen
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          {...fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Link to="/create">
            <Button size="lg" className="group w-full sm:w-auto">
              Lied erstellen
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <ScrollLink to="examples" smooth={true} duration={500}>
            <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm w-full sm:w-auto">
              Beispiele anhören
            </Button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};