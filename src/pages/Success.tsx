import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const triggerBlinkWebhook = async () => {
      try {
        const response = await fetch("http://tunnel.ritzelmut.de:5000/blink", {
          method: "GET",
        });
        if (response.ok) {
          console.log("Webhook triggered successfully.");
        } else {
          console.error("Failed to trigger webhook:", response.statusText);
        }
      } catch (error) {
        console.error("Error triggering webhook:", error);
      }
    };

    triggerBlinkWebhook();
  }, []);

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
          <div id="tracking-pixel-container"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
