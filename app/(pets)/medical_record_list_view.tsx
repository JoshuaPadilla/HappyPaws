import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAftercareStore } from "@/store/useAftercare";
import { usePetStore } from "@/store/usePets";
import { useAdminPets } from "@/store/useAdminPets";
import CustomButton from "@/components/custom_button";
import icons, { petDetailsIcons } from "@/constants/icons";
import { isAdmin } from "@/lib/utils";
import { useMedicalRecordStore } from "@/store/useMedicalRecord";
import MedicalRecordCard from "@/components/medical_record_card";
import { goBack } from "@/lib/routerFunctions";

const MedicalRecordListView = () => {
  const { medicalRecords, isLoading } = useMedicalRecordStore();
  const { selectedPet } = usePetStore();
  const { selectedPet: adminSelectedPet } = useAdminPets();

  const thisPet = selectedPet || adminSelectedPet;

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* headings */}
      <View className="flex-row justify-between mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        {isAdmin() && (
          <CustomButton
            iconLeft={icons.plus_icon}
            iconSize="size-6"
            tintColor="#73C7C7"
            onPress={() => {}}
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
      <View className="p-4 gap-4">
        <View className="flex-row justify-between">
          <Text className="font-rubik-semibold text-xl">Medical Records:</Text>

          <CustomButton iconLeft={icons.filter} />
        </View>

        <ScrollView contentContainerClassName="pb-[200px]">
          {isLoading && (
            <ActivityIndicator color={"#73C7C7"} className="p-16" />
          )}

          {medicalRecords &&
            !isLoading &&
            medicalRecords.map((record, index) => (
              <MedicalRecordCard key={index} medicalRecord={record} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MedicalRecordListView;
