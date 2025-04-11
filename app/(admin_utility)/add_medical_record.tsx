import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import Dropdown from "@/components/dropdown";
import { AFTERCARE_TYPES } from "@/constants";
import MedicationItem from "@/components/admin_components/medication_item";
import { AftercareForm, MedicalRecordForm, Medication } from "@/types/type";
import DatePickerModal from "@/components/date_picker_modal";
import { formatDate, isValidAftercare } from "@/lib/utils";
import NewMedicationModal from "@/components/admin_components/new_medication_modal";
import NewRestrictionModal from "@/components/admin_components/new_restriction_modal";
import { useClient } from "@/store/useClient";
import { useAdminPets } from "@/store/useAdminPets";
import { useAftercareStore } from "@/store/useAftercare";
import moment from "moment";
import { useMedicalRecordStore } from "@/store/useMedicalRecord";

const AddMedicalRecord = () => {
  const { selectedPet } = useAdminPets();
  const {
    addMedicalRecord,
    selectedMedicalRecord,
    action,
    updateMedicalRecord,
  } = useMedicalRecordStore();

  const [newMedicationModalVisible, setNewMedicationModalVisible] =
    useState(false);

  const date = selectedMedicalRecord?.date || moment().format("YYYY-MM-DD");
  const [diagnosis, setDiagnosis] = useState<string>(
    selectedMedicalRecord?.diagnosis || ""
  );
  const [treatment, setTreatment] = useState<string>(
    selectedMedicalRecord?.treatment || ""
  );
  const [notes, setNote] = useState<string>(selectedMedicalRecord?.notes || "");
  const [prescribedMedications, setPrescribedMedication] = useState<
    Medication[]
  >(selectedMedicalRecord?.prescribedMedications || []);

  const handleSubmitMedicalRecord = () => {
    const newMedicalRecord: MedicalRecordForm = {
      date,
      diagnosis,
      notes,
      prescribedMedications,
      treatment,
    };

    if (!isValidAftercare) return;

    action === "edit"
      ? updateMedicalRecord(
          newMedicalRecord,
          selectedPet?._id || "",
          selectedMedicalRecord?._id || ""
        )
      : addMedicalRecord(newMedicalRecord, selectedPet?._id || "");

    goBack();
  };

  const handleDeleteMedication = (id: string) => {
    setPrescribedMedication((prev) =>
      prev.filter(
        (medication) => medication.indexID !== id && medication._id !== id
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      <NewMedicationModal
        modalVisible={newMedicationModalVisible}
        setModalVisible={setNewMedicationModalVisible}
        setMedications={(medication) =>
          setPrescribedMedication((prev) => [...prev, medication])
        }
      />

      {/* headings */}
      <View className="flex-row justify-between gap-4 mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          New Medical Record
        </Text>

        <CustomButton
          iconLeft={icons.edit_check}
          iconSize="size-8"
          onPress={handleSubmitMedicalRecord}
        />
      </View>

      <ScrollView
        contentContainerClassName="p-4 gap-6 pb-[400px]"
        showsVerticalScrollIndicator={false}
      >
        {/* Prescribed Medication */}
        <View className="gap-2">
          <View className="flex-row justify-between py-4 items-center">
            <Text className="font-rubik-medium text-md text-black-200">
              Prescribed Medication
            </Text>

            <CustomButton
              iconLeft={icons.plus_icon}
              tintColor="#73C7C7"
              iconSize="size-6"
              onPress={() => setNewMedicationModalVisible(true)}
            />
          </View>

          <View className="w-full gap-2">
            {prescribedMedications.map((medication, index) => (
              <View className="flex-row gap-2 items-center" key={index}>
                <MedicationItem medication={medication} />
                <CustomButton
                  iconLeft={icons.trash}
                  tintColor="#F75555"
                  iconSize="size-6"
                  onPress={() => {
                    handleDeleteMedication(
                      medication?.indexID || medication._id || ""
                    );
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Diagnosis */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">
            Diagnosis
          </Text>

          <View className="">
            <TextInput
              className="border border-primary-100 rounded-lg p-4"
              value={diagnosis}
              multiline
              onChangeText={setDiagnosis}
            />
          </View>
        </View>

        {/* Diagnosis */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">
            Treatment
          </Text>

          <View className="">
            <TextInput
              className="border border-primary-100 rounded-lg p-4"
              value={treatment}
              multiline
              onChangeText={setTreatment}
            />
          </View>
        </View>

        {/* Notes */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">Note</Text>

          <View className="">
            <TextInput
              className="border border-primary-100 rounded-lg p-4"
              multiline
              value={notes}
              onChangeText={setNote}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMedicalRecord;
