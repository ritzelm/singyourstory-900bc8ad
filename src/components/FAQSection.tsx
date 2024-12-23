import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const FAQSection = () => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:info@meinkinderlied.de";
  };

  return (
    <section id="faqs" className="py-16 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#333333]">
          Häufig gestellte Fragen
        </h2>
        
        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>Wie personalisiere ich ein Lied?</AccordionTrigger>
            <AccordionContent>
              Gib einfach den Namen, Alter und Vorlieben des Kindes sowie den Anlass an. Wir erstellen daraus einen maßgeschneiderten Song.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Wie lange dauert es, bis ich meinen Song erhalte?</AccordionTrigger>
            <AccordionContent>
              In der Regel ist dein Song innerhalb von 60 Minuten fertig – garantiert jedoch innerhalb von 24 Stunden.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Welche Formate sind verfügbar?</AccordionTrigger>
            <AccordionContent>
              Der Song wird als MP3-Datei bereitgestellt, zusammen mit dem Songtext.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Kann ich mehrere Kinder in einem Lied erwähnen?</AccordionTrigger>
            <AccordionContent>
              Derzeit können wir nur einen Namen pro Lied verwenden, aber wir arbeiten daran, diese Funktion bald anzubieten.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Kann ich den Song verschenken?</AccordionTrigger>
            <AccordionContent>
              Ja, du kannst das Lied herunterladen und es an die Beschenkten weitergeben.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center">
          <Button 
            onClick={handleContactClick}
            className="bg-[#E535AB] hover:bg-[#E535AB]/90 text-white px-8 py-3 rounded-lg text-lg"
          >
            Weitere Fragen? Kontaktiere uns!
          </Button>
        </div>
      </div>
    </section>
  );
};
