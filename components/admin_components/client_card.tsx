import { View, Text, Pressable } from "react-native";
import React from "react";
import { User } from "@/types/type";
import { Image as ExpoImage } from "expo-image";
import { Image } from "react-native";
import icons, { profileIcons } from "@/constants/icons";
import { gender } from "@/constants";
import CustomButton from "../custom_button";
import { textShortener } from "@/lib/utils";
import { useClient } from "@/store/useClient";
import { goToViewClient } from "@/lib/routerFunctions";

interface ClientCardProps {
  client: User;
}

const ClientCard = ({ client }: ClientCardProps) => {
  const { fetchClient } = useClient();

  const handleSelectClient = () => {
    fetchClient(client._id);
    goToViewClient();
  };

  return (
    <Pressable className="flex-row w-full h-[120px] bg-white rounded-lg px-4 py-4 shadow gap-4 items-start justify-between">
      <View className="flex-row gap-4 max-w-[70%]">
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
            {textShortener(`${client.firstName} ${client.lastName}`, 15)}
          </Text>

          <View className="flex-row gap-2 items-center">
            <Image
              source={profileIcons.profile_address}
              className="size-4"
              tintColor="#4D4D4D"
            />

            <Text className="font-rubik-regular text-m text-black-200">
              {textShortener(client.address, 20)}
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
        title="view"
        iconSize="size-10"
        onPress={handleSelectClient}
        textClassname="font-rubik-medium text-m text-primary-100 p-1"
      />
    </Pressable>
  );
};

export default ClientCard;
