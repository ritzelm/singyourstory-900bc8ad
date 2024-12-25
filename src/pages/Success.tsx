import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-24 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Card className="border-[#E535AB]/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#333333]">
                Vielen Dank für deine Bestellung!
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Wir haben deine Bestellung erfolgreich erhalten und werden sie schnellstmöglich bearbeiten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#FFF0F9] p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Was passiert als Nächstes?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Du erhältst in Kürze eine Bestellbestätigung per E-Mail</li>
                  <li>Unser Team beginnt sofort mit der Produktion deines personalisierten Kinderliedes</li>
                  <li>Innerhalb von 24 Stunden senden wir dir dein fertiges Lied per E-Mail zu</li>
                </ul>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-[#E535AB] hover:bg-[#E535AB]/90 text-white"
                >
                  Zurück zur Startseite
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platzhalter für Tracking-Pixel */}
          <div id="tracking-pixel-container">
            {/* Hier können Tracking-Pixel eingefügt werden */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
