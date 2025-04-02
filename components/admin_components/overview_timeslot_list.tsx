import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { findPetById, getAppointmentColors } from "@/lib/utils";
import { businessHours } from "@/constants";
import { Appointment, AppointmentForm } from "@/types/type";
import { Image } from "expo-image";
import { Image as ReactImage } from "react-native";
import { petCardsIcon, profileIcons } from "@/constants/icons";

interface TimeSlotProps {
  time: string;
  appointment: Appointment | undefined;
}
interface TimeSlotListProps {
  appointmentList: Appointment[];
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
        <ScrollView contentContainerClassName="pb-[100px]  pr-8 gap-1">
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

  const thisUser = appointment?.userID;
  const thisPet = appointment?.petID;

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
          <View className="h-full">
            {thisUser?.profilePicture ? (
              <Image
                source={thisUser.profilePicture}
                style={{
                  borderColor: colors?.colors.base,
                  width: 70,
                  height: 70,
                  borderRadius: 9999,
                }}
              />
            ) : (
              <View className="size-[70px] bg-slate-50 rounded-full items-center justify-center">
                <Text className="font-rubik-semibold text-black-200 text-3xl">
                  {thisUser?.firstName?.at(0)}
                  {thisUser?.lastName?.at(0)}
                </Text>
              </View>
            )}

            {thisPet?.petImage ? (
              <Image
                source={thisPet.petImage}
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
            ) : (
              <Image
                source={petCardsIcon.dog_male}
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
            )}
          </View>

          <View className="w-full h-full">
            <View className="mb-1">
              <Text className="font-rubik-medium text-black-100 text-lg">
                {thisUser?.firstName}
              </Text>
              <Text className="font-rubik-medium text-black-100 text-lg">
                {thisUser?.lastName}
              </Text>
            </View>

            <View>
              <View className="flex-row gap-2 items-center">
                <ReactImage
                  source={profileIcons.profile_phone}
                  className="size-4"
                />

                <Text className="font-rubik-medium text-sm text-black-200">
                  {appointment.userID.phone}
                </Text>
              </View>
            </View>
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
