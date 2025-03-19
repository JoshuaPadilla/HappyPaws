import {
  View,
  Text,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppointmentForm, Pet } from "@/types/type";
import icons from "@/constants/icons";
import CustomButton from "./custom_button";
import { Calendar, DateData } from "react-native-calendars";
import { useAppointmentsStore } from "@/store/useAppointments";
import { usePetStore } from "@/store/usePets";
import { useUserStore } from "@/store/useUser";
import ModalPetCard from "./modal_petcard";
import NewAppointmentTimeSlot from "./new_appointment_time_slot";
import Dropdown from "./dropdown";
import { appointmentTypes } from "@/constants";
import AppointmentDetailsCard from "./appointment_details_card";

interface newAppointmentModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  action: "add" | "edit";
}

const steps = [
  "Select a pet",
  "Select Date",
  "Select Time",
  "Add Notes",
  "Confirm Appointment",
];

const NewAppointmentModal = ({
  modalVisible,
  setModalVisible,
  action,
}: newAppointmentModalProps) => {
  const {
    getTimeSlots,
    bookedSlots,
    isLoading,
    isAdding,
    isUpdating,
    addAppointment,
    updateAppointment,
    selectedAppointment,
  } = useAppointmentsStore();
  const { pets } = usePetStore();
  const { user } = useUserStore();

  const [step, setStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [typeOfService, setTypeOfService] = useState<string>("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleselectPetNext = () => {
    if (!selectedPet) {
      Alert.alert("Please select a pet");
      return;
    }
    setStep(step + 1);
  };

  const handleselectDateNext = () => {
    if (!selectedDate) {
      Alert.alert("Please select a date");
      return;
    }
    getTimeSlots(selectedDate);
    setStep(step + 1);
  };

  const handleSelectTimeNext = () => {
    if (!selectedTime) {
      Alert.alert("Please select a time");
      return;
    }
    setStep(step + 1);
  };

  const handleSelectNoteAndTypeNext = () => {
    if (!typeOfService) {
      Alert.alert("Please select a type of service");
      return;
    }
    setStep(step + 1);
  };

  const handleConfirmAppointment = () => {
    if (!user) {
      Alert.alert("User not found");
      return;
    }
    if (!selectedPet) {
      Alert.alert("Please select a pet");
      return;
    }

    action === "add"
      ? addAppointment({
          userID: user._id,
          petID: selectedPet._id,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          typeOfService: typeOfService,
          appointmentNotes: notes,
        })
      : updateAppointment({
          _id: selectedAppointment?._id,
          userID: user._id,
          petID: selectedPet._id,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          typeOfService: typeOfService,
          appointmentNotes: notes,
        });

    resetForm();

    !isAdding && setModalVisible(false);
  };

  const resetForm = () => {
    setStep(0);
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
    setSelectedPet(null);
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
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        {(isAdding || isUpdating) && (
          <ActivityIndicator size="large" color="#73C7C7" />
        )}

        <View className="bg-accent-100 w-full rounded-lg p-4 max-h-[70%] overflow-hidden">
          <Text className="font-rubik-bold text-3xl text-black-100 mb-6 self-center">
            {steps[step]}
          </Text>

          {/* step 1 */}
          {step === 0 && (
            <ScrollView
              contentContainerClassName={`flex-row flex-wrap gap-4 pb-[70px] w-full ${
                pets.length % 3 === 0 ? "justify-between" : ""
              }`}
            >
              {pets.map((pet) => (
                <ModalPetCard
                  key={pet._id}
                  pet={pet}
                  isSelected={selectedPet?._id === pet._id}
                  setSelectedPet={setSelectedPet}
                />
              ))}
            </ScrollView>
          )}

          {/* step 2 */}
          {step === 1 && (
            <View>
              <Calendar
                onDayPress={(day: DateData) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "#73C7C7",
                  },
                }}
                minDate={today}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#000000",
                  selectedDayBackgroundColor: "#73C7C7",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#73C7C7",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#73C7C7",
                  selectedDotColor: "#ffffff",
                  arrowColor: "#73C7C7",
                  monthTextColor: "#000000",
                  textDayFontFamily: "Rubik-Regular",
                  textMonthFontFamily: "Rubik-Bold",
                  textDayHeaderFontFamily: "Rubik-Medium",
                }}
              />
            </View>
          )}

          {/* step 3 */}
          {step === 2 && (
            <View className="h-[80%]">
              {isLoading ? (
                <ActivityIndicator size="large" color="#73C7C7" />
              ) : (
                <NewAppointmentTimeSlot
                  bookedSlots={bookedSlots}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              )}
            </View>
          )}

          {/* step 4 */}
          {step === 3 && (
            <View className="p-4 gap-2">
              <Text className="font-rubik-medium text-lg">Type of Service</Text>
              <Dropdown
                data={appointmentTypes}
                onSelect={(selectedItem) => setTypeOfService(selectedItem)}
                title="Type of Service"
                iconLeft={icons.dropdown}
                height={250}
              />

              <Text className="font-rubik-medium text-lg">Notes</Text>
              <TextInput
                placeholder="Add Notes"
                value={notes}
                onChangeText={setNotes}
                className="border border-black-400 rounded-lg p-2 font-rubik-medium text-lg"
                maxLength={20}
              />
            </View>
          )}

          {step === 4 && (
            <AppointmentDetailsCard
              pet={selectedPet}
              date={selectedDate}
              time={selectedTime}
              notes={notes}
              type={typeOfService}
            />
          )}

          <View className="flex-row justify-between items-center w-full mt-4">
            <CustomButton
              title={step === 0 ? "Cancel" : "Back"}
              onPress={() => {
                step === 0 ? setModalVisible(false) : setStep(step - 1);
              }}
              btnClassname="bg-white rounded-lg p-4 w-[100px] items-center justify-center"
              textClassname="text-danger font-rubik-bold text-lg"
            />

            <CustomButton
              title={step === 4 ? "Confirm" : "Next"}
              onPress={() => {
                if (step === 0) {
                  handleselectPetNext();
                }
                if (step === 1) {
                  handleselectDateNext();
                }
                if (step === 2) {
                  handleSelectTimeNext();
                }
                if (step === 3) {
                  handleSelectNoteAndTypeNext();
                }
                if (step === 4) {
                  handleConfirmAppointment();
                }
              }}
              btnClassname="bg-white rounded-lg p-4 w-[100px] items-center justify-center"
              textClassname="text-primary-100 font-rubik-bold text-lg"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewAppointmentModal;
