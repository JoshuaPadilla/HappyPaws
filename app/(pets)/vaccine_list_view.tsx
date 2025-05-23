import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePetStore } from "@/store/usePets";
import { useAdminPets } from "@/store/useAdminPets";
import CustomButton from "@/components/custom_button";
import icons, { petDetailsIcons } from "@/constants/icons";
import { goBack, goToAddVaccine } from "@/lib/routerFunctions";
import { useVaccineStore } from "@/store/useVaccineStore";
import VaccineCard from "@/components/vaccineCard";
import { useAuthStore } from "@/store/useAuth";

const VaccineList = () => {
  const { isAdmin } = useAuthStore();
  const { vaccines, isLoading, fetchVaccineHistory, isAdding, setAction } =
    useVaccineStore();

  const { selectedPet } = usePetStore();
  const { selectedPet: adminSelectedPet } = useAdminPets();

  const thisPet = selectedPet || adminSelectedPet;

  const handleAddVaccine = () => {
    setAction("add");
    goToAddVaccine();
  };

  useEffect(() => {
    fetchVaccineHistory(thisPet?._id || "");
  }, [isAdding]);

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* headings */}
      <View className="flex-row justify-between mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        {isAdmin && (
          <CustomButton
            iconLeft={icons.plus_icon}
            iconSize="size-6"
            tintColor="#73C7C7"
            onPress={handleAddVaccine}
          />
        )}
      </View>

      {/* pet profile */}
      <View className="flex-row gap-4 p-4 bg-white rounded-lg">
        <Image
          source={{ uri: thisPet?.petImage }}
          className="size-32 rounded-lg"
        />

        <View className="gap-2 justify-over rounded-lg">
          <Text className="font-rubik-semibold text-3xl text-primary-100">
            {thisPet?.petName}
          </Text>
          <Text className="font-rubik-semibold text-xl text-black-200">
            {thisPet?.petBreed}
          </Text>

          <View className="flex-row justify-between gap-4">
            <View className="flex-row items-center gap-2">
              <Image source={petDetailsIcons.pet_age} className="size-6" />
              <Text className="font-rubik-medium text-lg text-black-200">
                {thisPet?.petAge}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Image source={petDetailsIcons.pet_gender} className="size-6" />
              <Text className="font-rubik-medium text-lg text-black-200">
                {thisPet?.petGender}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* aftercare list */}
      <View className="p-4 gap-4 pb-[100px]">
        <View className="flex-row justify-between">
          <Text className="font-rubik-semibold text-xl">
            Vaccination Records:
          </Text>

          <CustomButton iconLeft={icons.filter} />
        </View>

        <ScrollView
          contentContainerClassName="pb-[200px]"
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <ActivityIndicator color={"#73C7C7"} className="p-16" />
          )}

          {vaccines &&
            !isLoading &&
            vaccines.map((record, index) => (
              <VaccineCard key={index} vaccine={record} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VaccineList;
