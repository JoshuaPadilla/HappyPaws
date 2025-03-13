import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { viewPetIcons } from "@/constants/icons";
import { goBack, goToPetDetails } from "@/lib/routerFunctions";
import { usePetStore } from "@/store/usePets";
import { ImageAvatar } from "@/components/image_avatar";
import SettingsItem from "@/components/settingsItems";
const ViewPet = () => {
  const { selectedPet, deletePet } = usePetStore();

  const handleDeletePet = () => {
    if (selectedPet?._id) {
      deletePet(selectedPet._id);
    }

    goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />
      </View>

      {/* Pet Image and name*/}
      <View className="flex items-center justify-center gap-4 p-8 border-b border-black-400">
        <ImageAvatar
          imageUrl={selectedPet?.petImage}
          placeholder={icons.pet_image_holder}
          size="40"
        />
        <Text className="text-2xl font-bold">{selectedPet?.petName}</Text>
      </View>

      {/* pet Details */}
      <View className="py-8 px-4 gap-6">
        <SettingsItem
          iconLeft={viewPetIcons.view_pet_petdetails}
          titleLeft="Pet Details"
          iconRight={icons.caret_right}
          onPress={() => goToPetDetails()}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_medicalrecords}
          titleLeft="Medical Records"
          iconRight={icons.caret_right}
          onPress={() => {}}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_vaccinehistory}
          titleLeft="Vaccine History"
          iconRight={icons.caret_right}
          onPress={() => {}}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_aftercare}
          titleLeft="Aftercare"
          iconRight={icons.caret_right}
          onPress={() => {}}
        />
      </View>

      <View className="px-8 mt-12">
        <CustomButton
          iconLeft={icons.trash}
          btnClassname="p-2 bg-danger-500 flex-row items-center justify-center gap-4 bg-danger rounded-lg"
          textClassname="font-rubik-medium text-xl text-black-100"
          iconSize="size-6"
          title="Delete Pet"
          onPress={handleDeletePet}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPet;
