import { View, Text, Modal, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { MedicationForm } from "@/types/type";
import { formatDate, isValidMedication, showToast } from "@/lib/utils";
import CustomButton from "../custom_button";
import icons from "@/constants/icons";
import DatePickerModal from "../date_picker_modal";

interface NewMedicationModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setMedications: (medications: any) => void;
}

const NewMedicationModal = ({
  modalVisible,
  setModalVisible,
  setMedications,
}: NewMedicationModalProps) => {
  const dateFor = useRef("start");
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const [name, setName] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleAddMedication = () => {
    const medication: MedicationForm = {
      name,
      dosage,
      frequency,
      startDate,
      endDate,
    };

    if (!isValidMedication(medication)) return;

    setMedications(medication);
    setModalVisible(false);
    resetForm();
  };

  const handleShowCalendar = (whatDate: String) => {
    if (whatDate === "end") {
      dateFor.current = "end";
    } else {
      dateFor.current = "start";
    }

    setCalendarModalVisible(true);
  };

  const resetForm = () => {
    setName("");
    setDosage("");
    setFrequency("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <DatePickerModal
        modalVisible={calendarModalVisible}
        setModalVisible={setCalendarModalVisible}
        setDate={dateFor.current === "end" ? setEndDate : setStartDate}
        minDate={dateFor.current === "end" ? startDate : undefined}
      />
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        <View className="bg-accent-100 w-full rounded-lg px-6 pt-6 pb-10 max-h-[70%] overflow-hidden">
          <Text className="font-rubik-bold text-xl text-black-100 mb-6 self-start">
            New Medication
          </Text>

          <ScrollView
            contentContainerClassName="pb-[50px] gap-4"
            showsVerticalScrollIndicator={false}
          >
            {/* start date and end date */}
            <View className="flex-row justify-between gap-4">
              {/* Start date */}
              <View className="gap-2 w-[46%]">
                <Text className="font-rubik-medium text-md text-black-200">
                  Start Date
                </Text>

                <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
                  <Text className="font-rubik-medium text-sm text-black-100">
                    {startDate ? formatDate(startDate) : "YYYY/MM/DD"}
                  </Text>

                  <CustomButton
                    iconLeft={icons.appointment_date}
                    onPress={() => handleShowCalendar("start")}
                  />
                </View>
              </View>

              {/* End Date */}
              <View className="gap-2 w-[46%]">
                <Text className="font-rubik-medium text-md text-black-200">
                  End Date
                </Text>

                <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
                  <Text className="font-rubik-medium text-sm text-black-100">
                    {endDate ? formatDate(endDate) : "YYYY/MM/DD"}
                  </Text>

                  <CustomButton
                    iconLeft={icons.appointment_date}
                    onPress={() => handleShowCalendar("end")}
                  />
                </View>
              </View>
            </View>

            {/* name */}
            <View className="gap-2">
              <Text className="font-rubik-medium text-md text-black-200">
                Name
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={name}
                  multiline
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* dosage */}
            <View className="gap-2">
              <Text className="font-rubik-medium text-md text-black-200">
                Dosage
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={dosage}
                  multiline
                  onChangeText={setDosage}
                />
              </View>
            </View>

            {/* frequency */}
            <View className="gap-2">
              <Text className="font-rubik-medium text-md text-black-200">
                Frequency
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={frequency}
                  multiline
                  onChangeText={setFrequency}
                />
              </View>
            </View>

            <CustomButton
              title="Add"
              btnClassname="justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
              textClassname="text-white font-rubik-semibold text-lg"
              onPress={handleAddMedication}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NewMedicationModal;
