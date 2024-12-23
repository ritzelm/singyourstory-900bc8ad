import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, FileText, Clock, Download } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, icon, description }: { title: string; icon: React.ReactNode; description: string }) => {
  return (
    <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Card>
  );
};

export const PricingSection = () => {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#FFF0F9" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#E535AB" }}>
            Dein personalisiertes Kinderlied – Einfach und einzigartig!
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FeatureCard
            title="Individuell"
            icon={<Music className="w-8 h-8 text-primary" />}
            description="Jedes Lied ist einzigartig und auf dein Kind personalisiert."
          />
          <FeatureCard
            title="Songtext inklusive"
            icon={<FileText className="w-8 h-8 text-primary" />}
            description="Der Text wird mitgeliefert – perfekt zum Mitsingen!"
          />
          <FeatureCard
            title="Schnell"
            icon={<Clock className="w-8 h-8 text-primary" />}
            description="Dein Lied ist innerhalb von 24 Stunden fertig."
          />
          <FeatureCard
            title="Flexibel"
            icon={<Download className="w-8 h-8 text-primary" />}
            description="Direkt als MP3-Download verfügbar."
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/create">
            <Button 
              size="lg"
              className="text-lg px-8 py-6"
              style={{ backgroundColor: "#E535AB" }}
            >
              Jetzt deinen Song erstellen – für nur 19,90 €!
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};