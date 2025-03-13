import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { AppointmentForm } from "@/types/type";
import moment from "moment";
import { findPetById, formatDate, getAppointmentColors } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: AppointmentForm;
  onPress: () => void;
}

const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => {
  const colors = getAppointmentColors(appointment.typeOfService);
  const pet = findPetById(appointment.petID);

  return (
    <Pressable
      style={{
        borderLeftWidth: 8,
        borderLeftColor: colors.colors.dark,
        backgroundColor: colors.colors.base,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
      }}
      onPress={onPress}
    >
      <View style={{ gap: 8 }}>
        <Text className="font-rubik-semibold text-[16px] text-black-100">
          {`${pet?.petName}'s ${appointment.typeOfService}`}
        </Text>
        <Text className="font-rubik-medium text-[12px] text-black-200">
          {pet?.petName}
        </Text>

        <View className="flex-row gap-2 items-center">
          <Image
            source={icons.add_appointment}
            className="size-4"
            tintColor="#8C8E98"
          />

          <Text className="font-rubik-medium text-black-300 text-[12px]">
            {formatDate(appointment.appointmentDate)} |{" "}
            {appointment.appointmentTime}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.colors.dark,
          paddingHorizontal: 12,
          paddingVertical: 4,
          height: 25,
          borderRadius: 8,
          justifyContent: "center",
        }}
      >
        <Text className="text-center text-[12px] font-rubik-medium text-accent-100">
          {appointment.typeOfService}
        </Text>
      </View>
    </Pressable>
  );
};

// base: {
//     vaccine: "#A2D5F2",
//     groom: "#B2F2BB",
//     dental: "#E6E6FA",
//     checkup: "#FFDAB9",
//     medication: "#FFC0CB",
//     wound: "#FFFACD",
//     diet: "#F4A460",
//     followup: "#C1E1C1",
//   },
//   dark: {
//     vaccine: "#6FA8C9",
//     groom: "#7FC987",
//     dental: "#B3A8D8",
//     checkup: "#D4A276",
//     medication: "#D88E9B",
//     wound: "#D9D48E",
//     diet: "#C77D3E",
//     followup: "#8FB88F",
//   },

export default AppointmentCard;
