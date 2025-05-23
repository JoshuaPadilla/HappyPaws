import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAftercareStore } from "@/store/useAftercare";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import {
  goBack,
  goToAddAftercare,
  goToAddMedicalRecord,
} from "@/lib/routerFunctions";
import { formatDate } from "@/lib/utils";
import { useMedicalRecordStore } from "@/store/useMedicalRecord";
import { useAuthStore } from "@/store/useAuth";

const ViewMedicalRecord = () => {
  const { isAdmin } = useAuthStore();
  const { selectedMedicalRecord, setAction, setSelectedMedicalRecord } =
    useMedicalRecordStore();

  const handleEdit = () => {
    setAction("edit");
    goToAddMedicalRecord();
  };

  const handleBack = () => {
    setSelectedMedicalRecord(null);
    goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row w-full justify-between items-center mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          onPress={handleBack}
          iconSize="size-8"
        />

        <Text className="font-poppins-semibold text-xl">Medical Record</Text>

        {isAdmin ? (
          <CustomButton
            iconLeft={profileIcons.profile_edit}
            onPress={handleEdit}
          />
        ) : (
          <CustomButton />
        )}
      </View>

      {/* main */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px] gap-4"
      >
        {/* Title */}

        <Text className="font-poppins-semibold text-xl text-primary-100 mb-2">
          {`Record Date: ${formatDate(selectedMedicalRecord?.date || "")} `}
        </Text>

        {/* Diagnosis */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Diagnosis:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedMedicalRecord?.diagnosis}
            </Text>
          </View>
        </View>

        {/* Treatment */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Treatment:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedMedicalRecord?.treatment}
            </Text>
          </View>
        </View>

        {/* Medication */}
        <View className="gap-4">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Medications:
          </Text>

          {selectedMedicalRecord?.prescribedMedications.map(
            (medication, index) => (
              <View
                key={index}
                className="px-4 py-4 border-b-2 border-black-400 gap-2"
              >
                <MedicationItem title="Name" value={medication.name} />
                <MedicationItem title="Dosage" value={medication.dosage} />
                <MedicationItem
                  title="frequency"
                  value={medication.frequency}
                />
                <MedicationItem
                  title="start date"
                  value={formatDate(medication.startDate)}
                />
                <MedicationItem
                  title="end date"
                  value={formatDate(medication.endDate)}
                />
              </View>
            )
          )}
        </View>

        {/* notes */}
        <View className="border-b-2 border-black-400">
          <Text className="font-rubik-semibold text-xl text-black-100">
            Notes:
          </Text>

          <View className="flex-row gap-4 items-center p-4">
            <Text className="font-rubik-medium text-3xl">*</Text>
            <Text className="font-rubik-medium text-xl">
              {selectedMedicalRecord?.notes}
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

export default ViewMedicalRecord;
