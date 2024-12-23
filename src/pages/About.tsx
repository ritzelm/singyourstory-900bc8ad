import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Music, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const AudioCard = ({ title, audioUrl }: { title: string; audioUrl?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Music className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 text-center">{title}</h3>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full hover:bg-primary/10"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-primary" />
          ) : (
            <Play className="h-6 w-6 text-primary" />
          )}
        </Button>
        {audioUrl && <audio ref={audioRef} src={audioUrl} />}
      </div>
    </Card>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      {/* About Us Section */}
      <section className="pt-24 pb-16 bg-[#FFF0F9]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/lovable-uploads/e06814bc-2361-4903-9504-1b03e31e9a5b.png"
                alt="Familie tanzt und spielt zusammen"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-4xl font-bold text-[#333333] mb-6">
                Wie eine kleine Idee große Freude brachte
              </h1>
              <div className="space-y-4 text-[#333333] leading-relaxed">
                <p>
                  Wir sind Eltern und kreative Köpfe aus der Werbeindustrie, die vor der alltäglichen Herausforderung standen, Arbeits- und Familienleben zu verbinden. Doch manchmal führen genau diese Herausforderungen zu den besten Ideen.
                </p>
                <p>
                  Eines Tages fragten wir uns: Kann Musik unsere Kinder zum Aufräumen motivieren? Das Ergebnis war unser erster Song: <strong>„Hey Samu, los wir räumen auf."</strong> Die Begeisterung unserer Kinder war überwältigend, und wir wussten sofort, dass wir diese Freude mit anderen Familien teilen wollen.
                </p>
                <p>
                  So entstand unsere Plattform – ein Ort, an dem Eltern, Großeltern, Paten und Freunde personalisierte Lieder für Kinder erstellen können. Ob für Geburtstage, alltägliche Routinen oder einfach als Überraschung – unsere Lieder machen jedes Erlebnis unvergesslich.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/create">
                  <Button
                    className="bg-[#E535AB] hover:bg-[#E535AB]/90 text-white px-6 py-3 rounded-lg text-lg"
                  >
                    Jetzt deinen Song erstellen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Song Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-6">
            Hör dir unseren ersten Song an!
          </h2>
          <div className="text-[#333333] mb-8">
            <p className="text-lg">
              <strong>„Hey Samu, los wir räumen auf."</strong><br />
              Der Song, mit dem alles begann, zeigt, wie Musik den Alltag spielerisch verwandeln kann. Lass dich inspirieren und erstelle deinen eigenen Song!
            </p>
          </div>
          <AudioCard 
            title="Hey Samu, los wir räumen auf" 
            audioUrl="https://ritzelmut.de/meinkinderlied-songs/samuräumtauf.mp3" 
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
