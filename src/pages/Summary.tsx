import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FormData {
  email: string;
  occasion: string;
  genre: string;
  childName: string;
  childAge: string;
  hobbies: string;
  favorites: string;
  familyMembers: string;
}

const occasionLabels: Record<string, string> = {
  weihnachten: "Weihnachten",
  kreativ: "Kreativer Freiraum",
  zahneputzen: "Zähneputzen",
  aufraumen: "Aufräumen",
  geburtstag: "Geburtstag",
};

const genreLabels: Record<string, string> = {
  pop: "Pop",
  schlager: "Schlager",
  hiphop: "HipHop",
  rnb: "R&B/Soul",
};

const Summary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [widerrufsrechtAccepted, setWiderrufsrechtAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = sessionStorage.getItem('songFormData');
    if (!savedData) {
      navigate('/create');
      return;
    }
    setFormData(JSON.parse(savedData));
  }, [navigate]);

  const handleChange = () => {
    navigate('/create', { state: { fromSummary: true } });
  };

  const handlePayment = async () => {
    if (!formData) {
      toast.error('Keine Formulardaten gefunden');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Sending order data:', formData);
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: formData
      });

      console.log('Response:', data, error);

      if (error) {
        console.error('Error from edge function:', error);
        throw error;
      }

      if (!data?.url) {
        console.error('No checkout URL received');
        throw new Error('Keine Checkout-URL erhalten');
      }

      console.log('Redirecting to:', data.url);
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error(
        error.message || 'Es gab einen Fehler bei der Bestellverarbeitung. Bitte versuchen Sie es später erneut.'
      );
      setIsLoading(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#333333]">Zusammenfassung deiner Bestellung</h1>
            <Button
              onClick={handleChange}
              variant="outline"
              className="border-[#E535AB] text-[#E535AB] hover:bg-[#FFF0F9]"
            >
              Ändern
            </Button>
          </div>
          
          <div className="bg-[#FFF0F9] p-6 rounded-lg mb-8 space-y-4">
            <h2 className="text-xl font-semibold text-[#333333] mb-4">Deine Angaben:</h2>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Name des Kindes:</strong> {formData.childName}</p>
            <p><strong>Alter:</strong> {formData.childAge}</p>
            <p><strong>Anlass:</strong> {occasionLabels[formData.occasion]}</p>
            <p><strong>Genre:</strong> {genreLabels[formData.genre]}</p>
            <p><strong>Hobbys:</strong> {formData.hobbies}</p>
            <p><strong>Lieblingsdinge:</strong> {formData.favorites}</p>
            <p><strong>Familienmitglieder:</strong> {formData.familyMembers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-[#333333] mb-4">Preis</h2>
            <p className="text-3xl font-bold text-[#E535AB]">19,90€</p>
            <p className="text-sm text-gray-600">inkl. MwSt.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="agb" 
                checked={agbAccepted}
                onCheckedChange={(checked) => setAgbAccepted(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="agb" className="text-sm">
                Ich akzeptiere die <Link to="/agb" className="text-[#E535AB] hover:underline">AGB</Link> und nehme die <Link to="/datenschutz" className="text-[#E535AB] hover:underline">Datenschutzerklärung</Link> zur Kenntnis
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="widerrufsrecht" 
                checked={widerrufsrechtAccepted}
                onCheckedChange={(checked) => setWiderrufsrechtAccepted(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="widerrufsrecht" className="text-sm">
                Ich bin damit einverstanden, dass der Anbieter vor Ablauf der Widerrufsfrist mit der Erbringung der Leistung beginnt und mein Widerrufsrecht mit vollständiger Vertragserfüllung (Übermittlung des Liedes per E-Mail innerhalb von 24 Std.) erlischt.
              </label>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={!agbAccepted || !widerrufsrechtAccepted || isLoading}
            className="w-full bg-[#E535AB] hover:bg-[#E535AB]/90 text-white py-4 rounded-full text-lg font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Wird verarbeitet...' : 'Weiter zur Zahlung'}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Summary;
