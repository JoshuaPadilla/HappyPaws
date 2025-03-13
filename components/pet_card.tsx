import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";

import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
  petImage?: any;
  petName: string;
  petBreed: string;
  petGender: string;
  petAge: Number;
  petSpecie: string;
}

const PetCard = ({
  onPress,
  petImage,
  petName,
  petBreed,
  petGender,
  petAge,
  petSpecie,
}: Props) => {
  const iconName = `${petSpecie}_${petGender}`;
  const iconKey = iconName as keyof typeof icons; // Type assertion to keyof typeof
  const icon = icons[iconKey]; // Now TypeScript knows this is safe

  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-3 w-[48%] h-72 flex-col bg-background-100 rounded-2xl gap-2"
    >
      <Image source={petImage} className="w-full h-[75%] rounded-xl" />
      <View className="w-full h-fit flex-row justify-between items-center">
        <View className="flex-col">
          <Text className="font-rubik-bold text-2xl tracking-widest text-black-100">
            {petName}
          </Text>
          <Text className="font-rubik-light text-m text-primary-100">
            {petBreed}
          </Text>
        </View>

        <Image source={icon} className="size-8" />
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
