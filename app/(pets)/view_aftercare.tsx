import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAftercareStore } from "@/store/useAftercare";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { findPetById, formatDate } from "@/lib/utils";

const ViewAftercare = () => {
  const { selectedAftercare } = useAftercareStore();

  const petName = selectedAftercare?.petID.petName || "";

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row w-full gap-4 items-center mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          onPress={goBack}
          iconSize="size-8"
        />

        <Text className="font-poppins-semibold text-xl">Aftercare</Text>
      </View>

      {/* main */}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-[100px] gap-4"
      >
        {/* Title */}

        <Text className="font-poppins-semibold text-2xl text-primary-100 mb-2">
          {`${petName}'s ${selectedAftercare?.type}`}
        </Text>

        {/* Medication */}
        <View className="gap-4">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Medications:
          </Text>

          {(selectedAftercare?.medications ?? []).map((medication, index) => (
            <View
              key={index}
              className="px-4 py-4 border-b-2 border-black-400 gap-2"
            >
              <MedicationItem title="Name" value={medication.name} />
              <MedicationItem title="Dosage" value={medication.dosage} />
              <MedicationItem title="frequency" value={medication.frequency} />
              <MedicationItem
                title="start date"
                value={formatDate(medication.startDate)}
              />
              <MedicationItem
                title="end date"
                value={formatDate(medication.endDate)}
              />
            </View>
          ))}
        </View>

        {/* Instructions */}

        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Intructions:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedAftercare?.careInstructions}
            </Text>
          </View>
        </View>

        {/* Restriction */}

        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Restriction:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedAftercare?.restrictions}
            </Text>
          </View>
        </View>

        {/* Notes */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Note:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedAftercare?.notes}
            </Text>
          </View>
        </View>

        {/* Next followup */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Next Follow-up:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {formatDate(selectedAftercare?.followUpDate || "")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MedicationItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-row gap-4 items-center">
      <Text className="font-rubik-medium text-black-200 text-lg w-40">
        {title}:{" "}
      </Text>
      <Text className="font-rubik-semibold text-black-100 text-lg">
        {value}
      </Text>
    </View>
  );
};

const InstructionsItem = ({ instruction }: { instruction: string }) => {
  return (
    <View className="flex-row gap-4 items-center">
      <Text className="font-rubik-medium text-black-200 text-lg w-40">
        Instructions:{" "}
      </Text>
      <Text className="font-rubik-semibold text-black-100 text-lg">
        {instruction}
      </Text>
    </View>
  );
};

export default ViewAftercare;
