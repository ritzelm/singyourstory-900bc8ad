import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Music } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

export const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-[#333333]">
        <Music className="h-6 w-6 text-[#E535AB]" />
        Altersgruppe, Anlass und Genre
      </h2>

      <FormField
        control={form.control}
        name="ageGroup"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#333333]">Für welche Altersgruppe soll der Song generiert werden?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                {["0-2", "3-5", "6-8", "9-10", "10-99"].map((age) => (
                  <div key={age} className="relative">
                    <RadioGroupItem
                      value={age}
                      id={`age-${age}`}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`age-${age}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#FFF0F9] rounded-md cursor-pointer peer-checked:bg-[#E535AB] peer-checked:text-white hover:bg-[#E535AB] hover:text-white transition-colors text-[#333333]"
                    >
                      {age}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="occasion"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#333333]">Für welchen Anlass soll der Song generiert werden?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {[
                  { value: "weihnachten", label: "Weihnachten" },
                  { value: "kreativ", label: "Kreativer Freiraum" },
                  { value: "zahneputzen", label: "Zähneputzen" },
                  { value: "aufraumen", label: "Aufräumen" },
                  { value: "geburtstag", label: "Geburtstag" },
                ].map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem
                      value={option.value}
                      id={`occasion-${option.value}`}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`occasion-${option.value}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#FFF0F9] rounded-md cursor-pointer peer-checked:bg-[#E535AB] peer-checked:text-white hover:bg-[#E535AB] hover:text-white transition-colors text-[#333333]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="genre"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#333333]">In welchem Genre soll dein Song generiert werden?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { value: "pop", label: "Pop" },
                  { value: "schlager", label: "Schlager" },
                  { value: "hiphop", label: "HipHop" },
                  { value: "rnb", label: "R&B/Soul" },
                ].map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem
                      value={option.value}
                      id={`genre-${option.value}`}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`genre-${option.value}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#FFF0F9] rounded-md cursor-pointer peer-checked:bg-[#E535AB] peer-checked:text-white hover:bg-[#E535AB] hover:text-white transition-colors text-[#333333]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};