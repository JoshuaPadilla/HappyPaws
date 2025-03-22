import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminCalendar from "@/components/admin_components/admin_calendar";
import moment from "moment";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { useAdminAppointmentsStore } from "@/store/useAdminAppointmentsStore";
import AdminAppointmentCard from "@/components/admin_components/admin_appointment_card";

const AppointmentsAdmin = () => {
  const [currDate, setCurrDate] = useState(moment().format("YYYY-MM-DD"));

  const { byDateAppointments, isLoading, fetchAppointmentByDate } =
    useAdminAppointmentsStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAppointmentByDate(currDate, signal);

    return () => {
      controller.abort(); // Cancel the previous fetch on cleanup
    };
  }, [currDate]);

  const handleResetToday = () => {
    setCurrDate(moment().format("YYYY-MM-DD"));
  };

  return (
    <SafeAreaView className="flex-1 flex-col bg-accent-100 px-6 py-8">
      {/* heading */}
      <View className="flex-row justify-between mb-10">
        <CustomButton
          iconLeft={icons.back_green}
          onPress={goBack}
          iconSize="size-8"
        />

        <CustomButton
          title="Today"
          textClassname="font-rubik-bold text-accent-100 text-xl"
          btnClassname="bg-primary-100 px-6 py-2 rounded-xl"
          onPress={handleResetToday}
        />
      </View>

      {/* Calendat */}
      <AdminCalendar date={currDate} setDate={setCurrDate} />

      <View className="flex-row justify-between py-6">
        <Text className="font-rubik-semibold text-black-100 text-xl">
          Total Appointments: {byDateAppointments.length}
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="items-center justify-center gap-2 pb-[100px]"
        showsVerticalScrollIndicator={false}
      >
        {!isLoading ? (
          byDateAppointments.length > 0 ? (
            byDateAppointments.map((appointment) => (
              <AdminAppointmentCard
                key={appointment._id}
                appointment={appointment}
              />
            ))
          ) : (
            <Text className="font-rubik-bold text-black-100 text-2xl">
              No appointments for this day
            </Text>
          )
        ) : (
          <ActivityIndicator color={"#73C7C7"} className="p-16" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentsAdmin;
