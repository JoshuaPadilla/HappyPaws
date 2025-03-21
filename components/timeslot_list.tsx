import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useMemo } from "react";
import {
  findPetById,
  getAppointmentBg,
  getAppointmentColors,
} from "@/lib/utils";
import { businessHours } from "@/constants";
import { AppointmentForm } from "@/types/type";
import icons from "@/constants/icons";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface TimeSlotProps {
  time: string;
  appointment: AppointmentForm | undefined;
}
interface TimeSlotListProps {
  appointmentList: AppointmentForm[];
}

const TimeSlotList = ({ appointmentList }: TimeSlotListProps) => {
  return (
    <>
      {appointmentList.length === 0 ? (
        <View className="w-full h-[300px] border-black-300 items-center justify-center">
          <Text className="font-rubik-semibold text-2xl">
            You have no appointments today
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerClassName="pb-[300px] pt-[50px] pr-8 gap-1">
          {businessHours.map((time) => {
            const appointment = appointmentList.find(
              (appointment) => appointment.appointmentTime === time
            );
            return (
              <TimeSlot time={time} appointment={appointment} key={time} />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const TimeSlot = ({ time, appointment }: TimeSlotProps) => {
  const bgColor = getAppointmentBg(appointment?.typeOfService || "");
  const appointedPet = appointment
    ? findPetById(appointment.petID._id || "")
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
          style={{ backgroundColor: bgColor }}
          className="w-[70%] rounded-lg p-4 gap-2"
        >
          <Text className="font-rubik-semibold text-xl">
            {appointment.typeOfService}
          </Text>
          <Text>{appointedPet?.petName}</Text>
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
