import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { dismiss, goBack } from "@/lib/routerFunctions";
import { useVaccineStore } from "@/store/useVaccineStore";
import { useAdminPets } from "@/store/useAdminPets";
import DatePickerModal from "@/components/date_picker_modal";
import moment from "moment";
import { formatDate, isValidVaccineForm } from "@/lib/utils";
import Dropdown from "@/components/dropdown";
import { VALIDITY } from "@/constants";
import { VaccineForm } from "@/types/type";

const AddVaccine = () => {
  const { addVaccine } = useVaccineStore();
  const { selectedPet } = useAdminPets();

  const [error, setError] = useState("");

  const [vaccineName, setVaccineName] = useState<string>("");
  const dateAdministered = moment().format("YYYY-MM-DD");
  const [administeredBy, setAdministeredBy] = useState<string>("");
  const [validity, setValidity] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleAddVaccine = () => {
    const newVaccine: VaccineForm = {
      vaccineName,
      administeredBy,
      dateAdministered,
      validity,
    };

    if (!isValidVaccineForm(newVaccine)) {
      setError("*Please fill in all fields");
      return;
    }

    addVaccine(newVaccine, selectedPet?._id || "");

    dismiss();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* headings */}
      <View className="flex-row justify-between gap-4 mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          New Vaccine Record
        </Text>

        <CustomButton
          iconLeft={icons.edit_check}
          iconSize="size-8"
          onPress={handleAddVaccine}
        />
      </View>

      {error && (
        <View className="flex-row gap-4">
          <Text className="text-danger">{error}</Text>
          <CustomButton
            iconLeft={icons.cancel}
            iconSize="size-4"
            onPress={() => setError("")}
          />
        </View>
      )}

      {/* Date administered */}
      <View className="flex-row items-center gap-2">
        <Text className="font-rubik-medium text-md text-black-200">
          Date Administered:
        </Text>

        <Text className="font-rubik-semibold text-xl text-primary-100">
          {formatDate(dateAdministered)}
        </Text>
      </View>

      {/* Validity */}
      <View className="gap-2">
        <Text className="font-rubik-medium text-md text-black-200">
          Validity
        </Text>

        <Dropdown
          data={VALIDITY}
          onSelect={setValidity}
          title="Valid For?"
          iconLeft={icons.dropdown}
          height={250}
        />
      </View>

      {/* Vaccine Name */}
      <View className="gap-2">
        <Text className="font-rubik-medium text-md text-black-200">
          Vaccine Name
        </Text>

        <View className="">
          <TextInput
            className="border border-primary-100 rounded-lg p-4 font-rubik-medium text-black-100"
            value={vaccineName}
            multiline
            onChangeText={setVaccineName}
          />
        </View>
      </View>

      {/* Administered By */}
      <View className="gap-2">
        <Text className="font-rubik-medium text-md text-black-200">
          Administered By
        </Text>

        <View className="">
          <TextInput
            className="border border-primary-100 rounded-lg p-4 font-rubik-medium text-black-100"
            value={administeredBy}
            multiline
            onChangeText={setAdministeredBy}
          />
        </View>
      </View>

      {/*  Notes */}
      <View className="gap-2">
        <Text className="font-rubik-medium text-md text-black-200">Notes</Text>

        <View className="">
          <TextInput
            className="border border-primary-100 rounded-lg p-4 font-rubik-medium text-black-100"
            value={note}
            multiline
            onChangeText={setNote}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVaccine;
