import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClient } from "@/store/useClient";
import TabbedFilter from "@/components/tabbed_filter";
import CustomButton from "@/components/custom_button";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import icons from "@/constants/icons";
import { SERVICE_TYPES_CATEGORY } from "@/constants";
import AppointmentCard from "@/components/appointment_card";
import { Appointment } from "@/types/type";
import { goBack } from "@/lib/routerFunctions";

const ClientActiveAppointments = () => {
  const { fetchActiveAppointment, activeAppointments, isLoading } =
    useAdminAppointmentsStore();

  const { selectedClient } = useClient();
  const [currFilter, setCurrFilter] = useState("All");

  const filteredAppointments =
    currFilter === "All"
      ? activeAppointments.filter(
          (appointment) => appointment.status !== "Cancelled"
        )
      : activeAppointments.filter(
          (appointment) =>
            appointment.typeOfService === currFilter &&
            appointment.status !== "Cancelled"
        );

  useEffect(() => {
    fetchActiveAppointment(selectedClient?._id || "");
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col  bg-accent-100 px-6 py-8">
      {/* All (All appointments) */}

      {/* Headings */}
      <View className="flex-row gap-4 items-center mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          {selectedClient?.firstName}'s active appointments
        </Text>
      </View>

      {/* // Headding */}
      <View>
        {/* Filter */}
        <TabbedFilter
          filterCategory={SERVICE_TYPES_CATEGORY}
          value={currFilter}
          setValue={setCurrFilter}
        />

        <View className="flex-row justify-between items-end mb-6 bg-accent-100">
          <Text className="font-poppins-semibold text-lg">{`Total: ${filteredAppointments.length}`}</Text>
        </View>

        {/* Appointment List */}
        <ScrollView
          contentContainerClassName="gap-2 pb-[250px]"
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator color={"#73C7C7"} className="p-16" />
          ) : (
            filteredAppointments.reverse().map(
              (appointment: Appointment) =>
                appointment.status !== "Cancelled" && (
                  <AppointmentCard
                    appointment={appointment}
                    key={appointment._id}
                    onPress={() => {}}
                    // onPress={() => handleViewAppointment(appointment)}
                  />
                )
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ClientActiveAppointments;
