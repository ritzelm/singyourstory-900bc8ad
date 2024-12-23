import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoSection } from "@/components/create/BasicInfoSection";
import { PersonalInfoSection } from "@/components/create/PersonalInfoSection";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  ageGroup: z.string(),
  occasion: z.string(),
  genre: z.string(),
  childName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  childAge: z.string(),
  hobbies: z.string(),
  favorites: z.string(),
  familyMembers: z.string(),
});

const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageGroup: "",
      occasion: "",
      genre: "",
      childName: "",
      childAge: "",
      hobbies: "",
      favorites: "",
      familyMembers: "",
    },
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem('songFormData');
    // Nur wenn wir von der Summary-Seite kommen (state.fromSummary ist true) und es gespeicherte Daten gibt
    if (location.state?.fromSummary && savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
      });
    } else {
      // Wenn wir nicht von der Summary-Seite kommen, lösche die gespeicherten Daten
      sessionStorage.removeItem('songFormData');
    }
  }, [form, location.state]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sessionStorage.setItem('songFormData', JSON.stringify(values));
    navigate('/summary');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#333333]">
          Lass uns jetzt euren Song generieren!
        </h1>
        <p className="text-center mb-8 text-[#333333]">
          Gebe deine persönlichen und individuellen Details ein, und du erhältst einen Song, der die Alltagsroutinen rockt!
        </p>

        <div className="bg-[#FFF0F9] p-6 rounded-lg mb-8">
          <p className="text-center text-lg text-[#333333]">
            Generiere jetzt deinen Song für <span className="text-[#E535AB]">19,90€</span> und erhalte deinen Song in der Regel innerhalb der nächsten 60 Minuten.
            <br />
            Du erhältst 1 Ki-Song in 2 Varianten inkl. Songtext als mp3 Datei.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
            <BasicInfoSection form={form} />
            <PersonalInfoSection form={form} />

            <Button
              type="submit"
              className="w-full bg-[#E535AB] hover:bg-[#E535AB]/90 text-white py-4 rounded-full text-lg font-semibold"
            >
              Eingaben prüfen
            </Button>
          </form>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Create;