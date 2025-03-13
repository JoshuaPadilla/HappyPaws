import { View, Text, ImageSourcePropType, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import icons, { petCardsIcon } from "@/constants/icons";
import { getAppointmentCardColor, getAppointmentColors } from "@/lib/utils";

interface AppointmentHistoryItemProps {
  petImage?: ImageSourcePropType;
  petName?: string;
  date?: string;
  type?: string;
  onPress?: () => void;
}

const AppointmentHistoryItem = ({
  petImage,
  petName,
  date,
  type,
}: AppointmentHistoryItemProps) => {
  const colors = getAppointmentColors(type);

  return (
    <Pressable className="flex-row bg-white p-4 rounded-2xl justify-between">
      <View className="flex-row gap-4 justify-between items-center">
        <Image
          source={petImage || petCardsIcon.dog_male}
          className="size-12 rounded-full"
        />

        <View>
          <Text className="font-rubik-bold text-lg text-black-100">
            {petName}
          </Text>
          <Text className="font-rubik-regular text-sm text-black-200">
            {date}
          </Text>
        </View>
      </View>

      <View
        className={`w-[100px] rounded-lg items-center justify-center`}
        style={{ backgroundColor: colors.colors.base }}
      >
        <Text className="font-rubik-medium text-black-100 text-sm">{type}</Text>
      </View>
    </Pressable>
  );
};

export default AppointmentHistoryItem;
