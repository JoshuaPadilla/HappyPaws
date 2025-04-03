import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Aftercare, MedicalRecord } from "@/types/type";
import { formatDate, textShortener } from "@/lib/utils";
import CustomButton from "./custom_button";
import { useMedicalRecordStore } from "@/store/useMedicalRecord";
import { goToViewMedicalRecord } from "@/lib/routerFunctions";

interface MedicalRecordCardProps {
  medicalRecord: MedicalRecord;
}

const MedicalRecordCard = ({ medicalRecord }: MedicalRecordCardProps) => {
  const { setSelectedMedicalRecord } = useMedicalRecordStore();

  const handleViewMedicalRecord = () => {
    setSelectedMedicalRecord(medicalRecord);
    goToViewMedicalRecord();
  };

  return (
    <View className="rounded-lg p-2">
      <View className={`justify-between bg-white rounded-b-lg overflow-hidden`}>
        <View className="flex-row justify-between w-full px-3 py-4 items-center">
          <Text className="font-rubik-semibold">
            {formatDate(medicalRecord.date)}
          </Text>

          <CustomButton
            title="View"
            textClassname="font-rubik-medium text-primary-100"
            onPress={handleViewMedicalRecord}
          />
        </View>
        <View className="p-4 bg-primary-100">
          <Text className="font-rubik-medium text-lg">
            {textShortener(medicalRecord.diagnosis, 20)}
          </Text>
          <Text className="font-rubik-regular text-black-200">
            {medicalRecord.notes || "no notes"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MedicalRecordCard;
