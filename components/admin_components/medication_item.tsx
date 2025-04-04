import { View, Text } from "react-native";
import React, { useState } from "react";
import { Medication, MedicationForm } from "@/types/type";
import CustomButton from "../custom_button";
import { formatDate, textShortener } from "@/lib/utils";

interface MedicationItemProps {
  medication?: MedicationForm;
}

const MedicationItem = ({ medication }: MedicationItemProps) => {
  const [showDetails, setShowDetials] = useState(false);

  return (
    <View className="flex-row items-start justify-between">
      <View className="bg-primary-100 rounded-full size-3 mt-2"></View>

      <View className={`border border-primary-100 p-4 rounded-lg w-[92%]`}>
        <View className={`flex-row justify-between ${showDetails && "mb-4"}`}>
          <Text className="font-rubik-medium text-lg text-black-100">
            {textShortener(medication?.name || "Medication name Here", 15)}
          </Text>

          <CustomButton
            title={showDetails ? "hide details" : "see detials"}
            textClassname="font-rubik-regular text-black-300 text-sm"
            onPress={() => setShowDetials((prev) => !prev)}
          />
        </View>

        {showDetails && (
          <View className="p-2 gap-2">
            {/* Dosage */}
            <View className="flex-row items-center">
              <Text className="font-rubik-regular text-md text-black-200 w-24">
                Dosage:
              </Text>

              <Text className="font-rubik-medium text-md text-black-100">
                {medication?.dosage || "Dosage"}
              </Text>
            </View>

            {/* frequency */}
            <View className="flex-row items-center">
              <Text className="font-rubik-regular text-md text-black-200 w-24">
                Frequency:
              </Text>

              <Text className="font-rubik-medium text-md text-black-100">
                {medication?.frequency || "frequency"}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text className="font-rubik-regular text-md text-black-200 w-24">
                Start Date:
              </Text>

              <Text className="font-rubik-medium text-md text-black-100">
                {formatDate(medication?.startDate || "")}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text className="font-rubik-regular text-md text-black-200 w-24">
                End Date:
              </Text>

              <Text className="font-rubik-medium text-md text-black-100">
                {formatDate(medication?.endDate || "")}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MedicationItem;
