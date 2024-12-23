import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Music, Clock, Heart, Gift } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum personalisierte Lieder?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Entdecke die Magie personalisierter Musik für dein Kind</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Music, title: "Individuell", desc: "Maßgeschneidert für jedes Kind und jeden Anlass" },
            { icon: Clock, title: "Schnell", desc: "In nur 3 Minuten bestellt, in 24 Stunden geliefert" },
            { icon: Heart, title: "Liebevoll", desc: "Mit Herz und KI komponiert" },
            { icon: Gift, title: "Besonders", desc: "Das perfekte Geschenk für jedes Kind" }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};