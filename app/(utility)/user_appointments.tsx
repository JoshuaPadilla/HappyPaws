import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import { useRouter } from "expo-router";
import AppointmentHistoryItem from "@/components/appointment_history_item";
import { appointments } from "@/dev-data/appointment_data";

const UserAppointments = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 px-4 py-8 bg-accent-100">
      {/* Headings Button*/}
      <View className="flex-row justify-between items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={router.back}
        />

        <CustomButton
          iconLeft={icons.filter}
          iconSize="size-6"
          onPress={router.back}
        />
      </View>

      {/* Main */}

      <View className="flex gap-2">
        <Text className="font-rubik-bold text-xl text-black-100">
          Appointment History
        </Text>

        <ScrollView contentContainerClassName="flex pb-[80px] gap-2">
          {appointments.map((appointment, index) => (
            <AppointmentHistoryItem
              key={index}
              date={appointment.appointmentDate}
              petName={appointment.petName}
              type={appointment.typeOfService}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserAppointments;
