import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAftercareStore } from "@/store/useAftercare";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import { goBack, goToAddVaccine } from "@/lib/routerFunctions";
import { formatDate } from "@/lib/utils";
import { useMedicalRecordStore } from "@/store/useMedicalRecord";
import { useVaccineStore } from "@/store/useVaccineStore";

const ViewVaccine = () => {
  const { selectedVaccine, setAction, setSelectedVaccine } = useVaccineStore();

  const handleEditVaccine = () => {
    setAction("edit");
    goToAddVaccine();
  };

  const handleBack = () => {
    setSelectedVaccine(null);
    goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row w-full justify-between items-center mb-8">
        <View className="flex-row gap-4">
          <CustomButton
            iconLeft={icons.back_green}
            onPress={handleBack}
            iconSize="size-8"
          />

          <Text className="font-poppins-semibold text-xl">Vaccine Record</Text>
        </View>

        <CustomButton
          iconLeft={profileIcons.profile_edit}
          iconSize="size-6"
          onPress={handleEditVaccine}
        />
      </View>

      {/* main */}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-[100px] gap-4"
      >
        {/* Title */}

        <Text className="font-poppins-semibold text-lg text-primary-100 mb-2">
          {`Date Administered: ${formatDate(
            selectedVaccine?.dateAdministered || ""
          )} `}
        </Text>

        {/* Vaccine Name */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-md text-black-200">
            Vaccine Name:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedVaccine?.vaccineName}
            </Text>
          </View>
        </View>

        {/* administeredBy */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-md text-black-200">
            Administered by:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedVaccine?.administeredBy}
            </Text>
          </View>
        </View>

        {/* new Due */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-md text-black-200">
            Next Due Date:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {formatDate(selectedVaccine?.dueDate || "")}
            </Text>
          </View>
        </View>

        {/* notes */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-md text-black-200">
            Notes:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedVaccine?.notes || "no notes"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewVaccine;
