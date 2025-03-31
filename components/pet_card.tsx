import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import icons, { petCardsIcon } from "@/constants/icons";
import { Image } from "expo-image";
import { textShortener } from "@/lib/utils";

interface Props {
  onPress: () => void;
  petName: string;
  petBreed: string;
  petSpecie: string;
  petImage?: any;
  petGender: string;
}

const PetCard = ({
  onPress,
  petImage,
  petName,
  petBreed,
  petGender,
  petSpecie,
}: Props) => {
  const iconName = `${petSpecie.toLowerCase()}_${petGender.toLowerCase()}`;
  const iconKey = iconName as keyof typeof petCardsIcon; // Type assertion to keyof typeof
  const icon = petCardsIcon[iconKey]; // Now TypeScript knows this is safe

  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 w-[48%] h-72 flex-col bg-white rounded-2xl gap-2"
    >
      <Image
        source={petImage ? { uri: petImage } : icons.pet_image_holder}
        className="w-full h-[75%] rounded-m"
        style={{ borderRadius: 10, width: "100%", height: "75%" }}
        contentFit="cover"
      />
      <View className="w-full h-fit flex-row justify-between items-center">
        <View className="flex-col">
          <Text className="font-rubik-bold text-2xl tracking-widest text-black-100">
            {textShortener(petName, 8)}
          </Text>
          <Text className="font-rubik-regular text-m text-primary-100">
            {textShortener(petBreed, 8)}
          </Text>
        </View>

        <Image source={icon} className="size-8" />
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
