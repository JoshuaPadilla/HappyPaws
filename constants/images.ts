import dog from "@/assets/images/dog.jpg";
import cat from "@/assets/images/cat.jpg";
import splash_screen from "@/assets/images/splash-screen.png";
import med_bg from "@/assets/images/card_med_bg.jpg";
import card_vaccine from "@/assets/images/card_bg/card_vaccine.jpg";
import card_groom from "@/assets/images/card_bg/card_groom.jpg";
import card_dental from "@/assets/images/card_bg/card_dental.jpg";
import card_checkup from "@/assets/images/card_bg/card_checkup.jpg";
import card_medication from "@/assets/images/card_bg/card_medication.jpg";
import card_wound from "@/assets/images/card_bg/card_wound.jpg";
import card_diet from "@/assets/images/card_bg/card_diet.jpg";
import card_followup from "@/assets/images/card_bg/card_followup.jpg";
import app_logo from "@/assets/images/app-logo.png";
import { ImageSourcePropType } from "react-native";

interface CardsBg {
  card_vaccine: ImageSourcePropType;
  card_groom: ImageSourcePropType;
  card_dental: ImageSourcePropType;
  card_checkup: ImageSourcePropType;
  card_medication: ImageSourcePropType;
  card_wound: ImageSourcePropType;
  card_diet: ImageSourcePropType;
  card_followup: ImageSourcePropType;
}

export const cards_bg: CardsBg = {
  card_vaccine: card_vaccine, // Directly use the imported source
  card_groom: card_groom,
  card_dental: card_dental,
  card_checkup: card_checkup,
  card_medication: card_medication,
  card_wound: card_wound,
  card_diet: card_diet,
  card_followup: card_followup,
};

export default { dog, cat, splash_screen, med_bg, app_logo };
