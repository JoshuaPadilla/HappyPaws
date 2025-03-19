import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { petDetailsIcons } from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { useAftercareStore } from "@/store/useAftercare";
import { usePetStore } from "@/store/usePets";
import AfterCareCard from "@/components/aftercare_card";

const ViewAftercare = () => {
  const { petAftercares, isLoading } = useAftercareStore();
  const { selectedPet } = usePetStore();

  const selectedAftercare = petAftercares[0];

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* headings */}
      <View className="flex-row justify-between mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />
      </View>

      {/* pet profile */}
      <View className="flex-row gap-4 p-4 bg-white rounded-lg">
        <Image
          source={{ uri: selectedPet?.petImage }}
          className="size-32 rounded-lg"
        />

        <View className="gap-2 justify-over rounded-lg">
          <Text className="font-rubik-semibold text-3xl text-primary-100">
            {selectedPet?.petName}
          </Text>
          <Text className="font-rubik-semibold text-xl text-black-200">
            {selectedPet?.petBreed}
          </Text>

          <View className="flex-row justify-between gap-4">
            <View className="flex-row items-center gap-2">
              <Image source={petDetailsIcons.pet_age} className="size-6" />
              <Text className="font-rubik-medium text-lg text-black-200">
                {selectedPet?.petAge}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Image source={petDetailsIcons.pet_gender} className="size-6" />
              <Text className="font-rubik-medium text-lg text-black-200">
                {selectedPet?.petGender}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* aftercare list */}
      <View className="p-4 gap-4">
        <View className="flex-row justify-between">
          <Text className="font-rubik-semibold text-xl">Aftercares:</Text>

          <CustomButton iconLeft={icons.filter} />
        </View>

        {isLoading ? (
          <ActivityIndicator color={"#73C7C7"} className="p-16" />
        ) : (
          <ScrollView contentContainerClassName="pb-[200px]">
            {petAftercares.map((aftercare) => (
              <AfterCareCard aftercare={aftercare} key={aftercare._id} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewAftercare;
