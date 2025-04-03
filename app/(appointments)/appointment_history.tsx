import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import { useRouter } from "expo-router";
import AppointmentHistoryItem from "@/components/appointment_history_item";
import { appointments } from "@/dev-data/appointment_data";
import { goBack, goToViewAppointment } from "@/lib/routerFunctions";
import { useAppointmentsStore } from "@/store/useAppointments";
import { Appointment, AppointmentForm, Pet } from "@/types/type";
import { usePetStore } from "@/store/usePets";
import { formatDate } from "@/lib/utils";
import moment from "moment";
import FilterModal from "@/components/filter_modal";
const AppointmentHistory = () => {
  const {
    appointmentHistory,
    setSelectedAppointment,
    isLoading,
    fetchAppointmentHistory,
  } = useAppointmentsStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    goToViewAppointment();
  };

  useEffect(() => {
    fetchAppointmentHistory();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 py-8 bg-accent-100">
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
      />

      {/* Headings Button*/}
      <View className="flex-row justify-between items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <CustomButton
          iconLeft={icons.filter}
          iconSize="size-6"
          onPress={() => setFilterModalVisible(true)}
        />
      </View>

      {/* Main */}

      <View className="flex gap-2">
        <Text className="font-rubik-bold text-xl text-black-100">
          Appointment History
        </Text>

        <ScrollView contentContainerClassName="flex pb-[80px] gap-2">
          {appointmentHistory &&
            appointmentHistory.reverse().map((appointment, index) => {
              return (
                <AppointmentHistoryItem
                  key={index}
                  date={formatDate(appointment.appointmentDate)}
                  petName={appointment.petID?.petName}
                  type={appointment.typeOfService}
                  petImage={appointment.petID?.petImage}
                  status={appointment.status}
                  onPress={() => handleViewAppointment(appointment)}
                />
              );
            })}
          {isLoading && (
            <ActivityIndicator color={"#73C7C7"} className="p-16" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentHistory;
