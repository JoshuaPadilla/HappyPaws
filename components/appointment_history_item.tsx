import { View, Text, ImageSourcePropType, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import icons, { petCardsIcon } from "@/constants/icons";
import { getAppointmentColors, getStatusColor } from "@/lib/utils";

interface AppointmentHistoryItemProps {
  petImage?: string;
  petName?: string;
  date?: string;
  type?: string;
  status?: string;
  onPress?: () => void;
}

const AppointmentHistoryItem = ({
  petImage,
  petName,
  date,
  type,
  status,
  onPress,
}: AppointmentHistoryItemProps) => {
  const colors = getAppointmentColors(type);

  
  return (
    <Pressable
      className="flex-row bg-white p-4 rounded-2xl justify-between"
      onPress={onPress}
    >
      <View>
        <View className="flex-row gap-4 justify-between items-center">
          <Image
            source={petImage ? { uri: petImage } : petCardsIcon.dog_male}
            className="size-16 rounded-full"
          />

          <View className="gap-1">
            <Text className="font-rubik-bold text-lg text-black-100">
              {petName}
            </Text>
            <Text className="font-rubik-regular text-sm text-black-200">
              {date}
            </Text>

            <View className="flex-row gap-2 items-center">
              <Image source={icons.appointment_type} className="size-3" />

              <Text
                className="font-rubik-medium text-black-100 text-sm"
                style={{ color: colors.colors.dark }}
              >
                {type}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row gap-2 items-start">
        <Text
          className="font-rubik-regular text-sm text-white px-2 py-1 rounded-lg"
          style={{ backgroundColor: getStatusColor(status || "") }}
        >
          {status}
        </Text>
      </View>
    </Pressable>
  );
};

export default AppointmentHistoryItem;
