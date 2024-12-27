import { Star } from "lucide-react";

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Das personalisierte Lied für meine Tochter Emma war einfach magisch! Sie strahlt jedes Mal, wenn sie ihren Namen im Lied hört. Eine wunderbare Geschenkidee!",
      date: "Berlin"
    },
    {
      name: "Michael K.",
      rating: 5,
      text: "Wir haben ein Einschlaflied für unseren Sohn bestellt. Die Qualität ist erstklassig und die persönliche Note macht es zu etwas ganz Besonderem. Schnelle Lieferung und toller Service!",
      date: "München"
    },
    {
      name: "Lisa B.",
      rating: 5,
      text: "Das Zahnputzlied mit dem Namen meines Sohnes hat unsere morgendliche Routine komplett verändert. Jetzt macht das Zähneputzen richtig Spaß! Absolut empfehlenswert.",
      date: "Köln"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#333333]">
          Das sagen unsere Kunden
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#E535AB] text-[#E535AB]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-[#333333]">{review.name}</span>
                <span className="text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};