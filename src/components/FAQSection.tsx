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
        
        <Accordion type="single" collapsible className="mb-12 text-left">
          <AccordionItem value="item-1">
            <AccordionTrigger>Wie personalisiere ich ein Lied?</AccordionTrigger>
            <AccordionContent>
              Gib einfach den Namen, Alter und Vorlieben des Kindes sowie den Anlass (z. B. Geburtstag, Ferienanfang, Zahnputzsongs) an. Wir erstellen daraus einen liebevoll gestalteten und einzigartigen Song.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Wie lange dauert es, bis ich meinen Song erhalte?</AccordionTrigger>
            <AccordionContent>
              Dein personalisierter Song wird in der Regel innerhalb von 24 Stunden geliefert.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Welche Formate sind verfügbar?</AccordionTrigger>
            <AccordionContent>
              Der Song wird als hochqualitative MP3-Datei bereitgestellt, zusammen mit dem vollständigen Songtext.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Kann ich mehrere Kinder in einem Lied erwähnen?</AccordionTrigger>
            <AccordionContent>
              Derzeit können wir pro Lied nur einen Namen verwenden. Wir arbeiten jedoch daran, diese Funktion bald anzubieten, damit mehrere Kinder berücksichtigt werden können.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Kann ich den Song verschenken?</AccordionTrigger>
            <AccordionContent>
              Ja, der Song eignet sich perfekt als Geschenk! Nach dem Download kannst du ihn beliebig weitergeben.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Für welche Anlässe eignen sich die Lieder?</AccordionTrigger>
            <AccordionContent>
              Unsere personalisierten Lieder sind ideal für Anlässe wie Geburtstage, den Ferienanfang, zum Aufräumen oder Zähneputzen – oder einfach, um Freude im Alltag zu bringen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Kann ich den Song vor der Bestellung anhören?</AccordionTrigger>
            <AccordionContent>
              Leider ist eine Vorschau nicht möglich, da jedes Lied individuell erstellt wird. Du kannst dir jedoch sicher sein, dass es einzigartig und mit viel Liebe gestaltet wird.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Was passiert, wenn ich mit dem Song nicht zufrieden bin?</AccordionTrigger>
            <AccordionContent>
              Sollte der Song nicht deinen Erwartungen entsprechen, kontaktiere uns bitte. Wir finden gemeinsam eine Lösung, um dich glücklich zu machen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>Welche Zahlungsmethoden werden akzeptiert?</AccordionTrigger>
            <AccordionContent>
              Wir akzeptieren alle gängigen Zahlungsmethoden, darunter Kreditkarte, PayPal und Sofortüberweisung.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Kann ich den Song nachträglich ändern lassen?</AccordionTrigger>
            <AccordionContent>
              Kleinere Änderungen sind möglich. Bitte kontaktiere uns direkt, und wir prüfen, ob dein Wunsch umgesetzt werden kann.
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
