import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { getAppointmentColors } from "@/lib/utils";
import { businessHours } from "@/constants";
import { AppointmentForm } from "@/types/type";

interface TimeSlotProps {
  time: string;
  appointment: AppointmentForm | undefined;
}
interface TimeSlotListProps {
  appointmentList: AppointmentForm[];
}

const TimeSlotList = ({ appointmentList }: TimeSlotListProps) => {
  return (
    <ScrollView contentContainerClassName="pb-[300px] pt-[50px] pr-8 gap-1">
      {businessHours.map((time) => {
        const appointment = appointmentList.find(
          (appointment) => appointment.appointmentTime === time
        );
        return <TimeSlot time={time} appointment={appointment} key={time} />;
      })}
    </ScrollView>
  );
};

const TimeSlot = ({ time, appointment }: TimeSlotProps) => {
  const colors = appointment
    ? getAppointmentColors(appointment.typeOfService)
    : null;

  return (
    <View className="flex-row justify-between h-[100px]">
      <View className="flex-row justify-end items-center w-[30%] mr-6">
        <Text className="font-rubik-regular text-black-100 text-sm">
          {time}
        </Text>
      </View>

      {appointment ? (
        <Pressable
          style={{ backgroundColor: colors?.colors.base }}
          className="w-[70%] rounded-lg p-4 gap-2"
        >
          <Text className="font-rubik-semibold text-xl">
            {appointment.typeOfService}
          </Text>
          <Text>{appointment.petName}</Text>
        </Pressable>
      ) : (
        <Pressable className="w-[70%] items-center justify-center">
          <View className="border-t w-full border-black-300"></View>
        </Pressable>
      )}
    </View>
  );
};

export default TimeSlotList;
