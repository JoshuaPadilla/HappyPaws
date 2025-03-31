import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { petDetailsIcons, profileIcons } from "@/constants/icons";
import { ImageAvatar } from "@/components/image_avatar";
import { usePetStore } from "@/store/usePets";
import { dismiss, goBack, goToEditPet } from "@/lib/routerFunctions";
import SettingsItem from "@/components/settingsItems";
import Spinner from "react-native-loading-spinner-overlay";
import { textShortener } from "@/lib/utils";

const PetDetails = () => {
  const { selectedPet, isUpdating } = usePetStore();

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      <Spinner
        visible={isUpdating}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      {/* Headings */}
      <View className="flex-row justify-between items-center">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={dismiss}
        />

        <Text className="text-xl font-rubik-bold">Pet Details</Text>

        <CustomButton
          iconLeft={profileIcons.profile_edit}
          iconSize="size-6"
          onPress={goToEditPet}
        />
      </View>

      {/* Image icon */}
      <View className="flex justify-center items-center p-8 border-b border-black-400 gap-4">
        <ImageAvatar imageUrl={selectedPet?.petImage} size="40" />

        <Text className="text-2xl font-rubik-semibold">
          {textShortener(selectedPet?.petName || "", 8)}
        </Text>
      </View>

      {/* Pet Details */}
      <View className="py-8 px-4 gap-6">
        <SettingsItem
          iconLeft={petDetailsIcons.pet_specie}
          titleLeft="Pet Specie"
          titleRight={selectedPet?.petSpecie}
          onPress={() => {}}
        />
        <SettingsItem
          iconLeft={petDetailsIcons.pet_breed}
          titleLeft="Pet Breed"
          titleRight={textShortener(selectedPet?.petBreed || "", 8)}
          onPress={() => {}}
        />
        <SettingsItem
          iconLeft={petDetailsIcons.pet_age}
          titleLeft="Pet Age"
          titleRight={selectedPet?.petAge.toString()}
          onPress={() => {}}
        />
        <SettingsItem
          iconLeft={petDetailsIcons.pet_gender}
          titleLeft="Pet Gender"
          titleRight={selectedPet?.petGender}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default PetDetails;
