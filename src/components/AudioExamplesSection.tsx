import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const AudioCard = ({ 
  title, 
  audioUrl,
  activeAudioId,
  setActiveAudioId,
  id
}: { 
  title: string; 
  audioUrl?: string;
  activeAudioId: string | null;
  setActiveAudioId: (id: string | null) => void;
  id: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setActiveAudioId(null);
      } else {
        // Pause any currently playing audio
        if (activeAudioId && activeAudioId !== id) {
          const activeAudio = document.querySelector(`audio[data-id="${activeAudioId}"]`) as HTMLAudioElement;
          if (activeAudio) {
            activeAudio.pause();
          }
        }
        audioRef.current.play();
        setActiveAudioId(id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update playing state if another audio starts playing
  if (isPlaying && activeAudioId !== id) {
    setIsPlaying(false);
  }

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
        {audioUrl && <audio ref={audioRef} src={audioUrl} data-id={id} />}
      </div>
    </Card>
  );
};

export const AudioExamplesSection = () => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const songs = [
    {
      id: "song1",
      title: "Anna räumt auf",
      url: "https://ritzelmut.de/meinkinderlied-songs/annar%C3%A4umtauf.mp3"
    },
    {
      id: "song2",
      title: "Lukas putzt seine Zähne",
      url: "https://ritzelmut.de/meinkinderlied-songs/lukaszähne.mp3"
    },
    {
      id: "song3",
      title: "Happy Birthday für Mina",
      url: "https://ritzelmut.de/meinkinderlied-songs/minageburtstag.mp3"
    }
  ];

  return (
    <section id="examples" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#E535AB" }}>
            Hör dir unsere beliebtesten Lieder an!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entdecke, wie personalisierte Lieder klingen können
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {songs.map((song, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <AudioCard 
                      title={song.title} 
                      audioUrl={song.url} 
                      activeAudioId={activeAudioId}
                      setActiveAudioId={setActiveAudioId}
                      id={song.id}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};
