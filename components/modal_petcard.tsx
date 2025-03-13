import icons from "@/constants/icons";
import { Pet } from "@/types/type";
import { Pressable, Image, Text } from "react-native";

export default function ModalPetCard({
  pet,
  isSelected,
  setSelectedPet,
}: {
  pet: Pet;
  isSelected?: boolean;
  setSelectedPet: (pet: Pet) => void;
}) {
  return (
    <Pressable
      onPress={() => setSelectedPet(pet)}
      className={`bg-white rounded-lg p-2 items-center justify-start gap-2 w-[30%] ${
        isSelected ? "border-2 border-primary-100" : ""
      }`}
    >
      <Image
        source={pet.petImage ? { uri: pet.petImage } : icons.pet_image_holder}
        className="h-24 w-full rounded-lg"
      />
      <Text className="font-rubik-medium text-lg text-black-100">
        {pet.petName}
      </Text>
    </Pressable>
  );
}
