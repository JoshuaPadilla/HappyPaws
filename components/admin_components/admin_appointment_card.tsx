import { View, Text, Pressable } from "react-native";
import React from "react";
import { AppointmentForm } from "@/types/type";
import { Image } from "expo-image";
import { getAppointmentColors } from "@/lib/utils";
import { Image as ReactImage } from "react-native";
import icons, { petCardsIcon, profileIcons } from "@/constants/icons";

interface AdminAppointmentCardProps {
  appointment: AppointmentForm;
}

const AdminAppointmentCard = ({ appointment }: AdminAppointmentCardProps) => {
  const colors = appointment
    ? getAppointmentColors(appointment.typeOfService)
    : null;

  const thisPet = appointment.petID || null;
  const thisUser = appointment.userID || null;

  return (
    <Pressable
      style={{ backgroundColor: colors?.colors.base }}
      className="flex-row w-full rounded-lg p-4 gap-2 justify-between"
    >
      <View className="flex-row gap-4">
        <View className="h-full">
          {thisUser ? (
            thisUser.profilePicture ? (
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
                  {typeof thisUser === "object"
                    ? thisUser.firstName?.at(0)
                    : ""}
                  {typeof thisUser === "object" && thisUser.lastName?.at(0)}
                </Text>
              </View>
            )
          ) : (
            <ReactImage
              source={icons.pet_image_holder}
              className="size-[70px] rounded-full border-primary-100"
            />
          )}

          {thisPet && thisPet.petImage !== null ? (
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

        <View className="h-full">
          <View className="mb-1">
            <Text className="font-rubik-medium text-black-100 text-lg">
              {thisUser ? thisUser.firstName : ""}
            </Text>
            <Text className="font-rubik-medium text-black-100 text-lg">
              {thisUser ? thisUser.lastName : ""}
            </Text>
          </View>

          <View>
            <View className="flex-row gap-2 items-center">
              <ReactImage
                source={profileIcons.profile_phone}
                className="size-4"
              />

              <Text className="font-rubik-medium text-sm text-black-200">
                {thisUser ? thisUser.phone : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="items-center">
        <Text
          className="font-rubik-medium text-accent-100 px-4 py-2 rounded-xl w-[100px] text-center"
          style={{ backgroundColor: colors?.colors.dark }}
        >
          {appointment.typeOfService}
        </Text>
      </View>
    </Pressable>
  );
};

export default AdminAppointmentCard;
