import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { findPetById, getAppointmentColors } from "@/lib/utils";
import { businessHours } from "@/constants";
import { AppointmentForm } from "@/types/type";
import { Image } from "expo-image";

interface TimeSlotProps {
  time: string;
  appointment: AppointmentForm | undefined;
}
interface TimeSlotListProps {
  appointmentList: AppointmentForm[];
}

const OverviewTimeslotList = ({ appointmentList }: TimeSlotListProps) => {
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
          className="flex-row w-[70%] rounded-lg p-4 gap-2"
        >
          <View className="w-full h-full">
            <Image
              source={appointment.userID.profilePicture}
              style={{
                borderColor: colors?.colors.base,
                width: 70,
                height: 70,
                borderRadius: 9999,
              }}
            />

            <Image
              source={appointment.petID.petImage}
              style={{
                borderColor: colors?.colors.base,
                width: 40,
                height: 40,
                borderWidth: 2,
                borderRadius: 9999,
                position: "absolute",
                bottom: 0,
              }}
            />
          </View>
        </Pressable>
      ) : (
        <Pressable className="w-[70%] items-center justify-center">
          <View className="border-t w-full border-black-300"></View>
        </Pressable>
      )}
    </View>
  );
};

export default OverviewTimeslotList;
