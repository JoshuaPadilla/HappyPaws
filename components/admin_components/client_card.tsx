import { View, Text, Pressable } from "react-native";
import React from "react";
import { User } from "@/types/type";
import { Image as ExpoImage } from "expo-image";
import { Image } from "react-native";
import icons, { profileIcons } from "@/constants/icons";
import { gender } from "@/constants";
import CustomButton from "../custom_button";

interface ClientCardProps {
  client: User;
}

const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <Pressable className="flex-row w-full h-[120px] bg-white rounded-lg px-4 py-4 shadow gap-4 items-start justify-between">
      <View className="flex-row gap-4 max-w-[50%]">
        <ExpoImage
          source={
            client.profilePicture
              ? client.profilePicture
              : icons.pet_image_holder
          }
          style={{ width: 70, height: 70, borderRadius: 9999 }}
        />

        <View className="flex-col justify-around h-full">
          <Text className="font-rubik-medium text-xl text-black-100">
            {client.firstName}
          </Text>
          <Text className="font-rubik-medium text-xl text-black-100">
            {client.lastName}
          </Text>
          <View className="flex-row gap-2 items-center">
            <Image
              source={profileIcons.profile_address}
              className="size-4"
              tintColor="#4D4D4D"
            />

            <Text className="font-rubik-regular text-m text-black-200">
              {client.address}
            </Text>
          </View>

          <View className="flex-row gap-2 items-center">
            <Image
              source={profileIcons.profile_phone}
              className="size-4"
              tintColor="#4D4D4D"
            />

            <Text className="font-rubik-regular text-m text-black-200">
              {client.phone}
            </Text>
          </View>
        </View>
      </View>

      <CustomButton
        iconLeft={icons.options_icon}
        iconSize="size-10"
        btnClassname=""
      />
    </Pressable>
  );
};

export default ClientCard;
