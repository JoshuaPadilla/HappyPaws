import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./custom_button";
import { Vaccine } from "@/types/type";
import { formatDate } from "@/lib/utils";
import { useVaccineStore } from "@/store/useVaccineStore";
import { goToViewVaccine } from "@/lib/routerFunctions";

interface VaccineCardProps {
  vaccine: Vaccine;
}

const VaccineCard = ({ vaccine }: VaccineCardProps) => {
  const { setSelectedVaccine } = useVaccineStore();

  const handleViewVaccine = () => {
    setSelectedVaccine(vaccine);
    goToViewVaccine();
  };

  return (
    <View className="rounded-lg p-2">
      <View className={`justify-between bg-white rounded-b-lg overflow-hidden`}>
        <View className="flex-row justify-between w-full px-3 py-4 items-center">
          <Text className="font-rubik-semibold">
            {formatDate(vaccine.dateAdministered)}
          </Text>

          <CustomButton
            title="View"
            textClassname="font-rubik-medium text-primary-100"
            onPress={handleViewVaccine}
          />
        </View>
        <View className="p-4 bg-primary-100">
          <Text className="font-rubik-medium text-lg">
            {vaccine.vaccineName}
          </Text>
          <Text className="font-rubik-regular text-black-200">
            {vaccine.notes || "no notes"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VaccineCard;
