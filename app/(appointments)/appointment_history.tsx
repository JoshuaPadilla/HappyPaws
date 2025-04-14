import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";

import AppointmentHistoryItem from "@/components/appointment_history_item";
import { goBack, goToViewAppointment } from "@/lib/routerFunctions";
import { useAppointmentsStore } from "@/store/useAppointments";
import { Appointment, AppointmentForm, Pet } from "@/types/type";
import { formatDate } from "@/lib/utils";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import { useAuthStore } from "@/store/useAuth";
import { useClient } from "@/store/useClient";
const AppointmentHistory = () => {
  const { isAdmin } = useAuthStore();

  const { selectedClient } = useClient();
  const {
    appointmentHistory,
    setSelectedAppointment,
    isLoading,
    fetchAppointmentHistory,
  } = useAppointmentsStore();

  const {
    appointmentHistory: adminAppointmentHistory,
    setSelectedAppointment: adminSetSelectedAppointment,
    isLoading: adminIsLoading,
    fetchAppointmentHistory: adminFetchAppointmentHistory,
  } = useAdminAppointmentsStore();

  const thisAppointmentHistory = isAdmin
    ? adminAppointmentHistory
    : appointmentHistory;
  const thisSetSelectedAppointmentHistory = isAdmin
    ? adminSetSelectedAppointment
    : setSelectedAppointment;
  const thisIsLoading = isAdmin ? adminIsLoading : isLoading;
  const thisFetchAppointmentHistory = isAdmin
    ? adminFetchAppointmentHistory
    : fetchAppointmentHistory;

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleViewAppointment = (appointment: Appointment) => {
    thisSetSelectedAppointmentHistory(appointment);
    goToViewAppointment();
  };

  useEffect(() => {
    thisFetchAppointmentHistory(selectedClient?._id || "");
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 py-8 bg-accent-100">
      {/* <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
      /> */}

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
        <Text className="font-rubik-bold text-xl text-black-100 mb-4">
          {isAdmin ? selectedClient?.firstName : "Appointment"} History
        </Text>

        <ScrollView contentContainerClassName="flex pb-[80px] gap-2">
          {thisAppointmentHistory &&
            thisAppointmentHistory.reverse().map((appointment, index) => {
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
          {thisIsLoading && (
            <ActivityIndicator color={"#73C7C7"} className="p-16" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentHistory;
