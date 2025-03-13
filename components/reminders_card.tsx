import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface Props {
  title: string;
  desc: string;
  type: string;
  time: string;
}

const RemindersCard = ({ title, desc, type, time }: Props) => {
  const icon =
    title === "appointment" ? icons.reminders_appointment : icons.aftercare;

  return (
    <View className="w-[200px] max-h-[200px] rounded-xl mr-2 bg-primary-100 py-4 px-4 gap-2">
      {/* headings */}
      <View className="flex-row w-full justify-between items-center">
        <Text className="font-rubik-semibold text-l text-accent-100">
          {capitalize(title)}
        </Text>
        <Image source={icon} className="size-5" tintColor="#F6F4F0" />
      </View>

      {/* Info */}
      <View className="flex-col gap-1 border-l-2 border-accent-100 w-full px-2 py-2">
        <Text className="font-rubik-semibold text-sm text-accent-100">
          {desc}
        </Text>
        <Text className="font-rubik-bold text-l text-accent-200">{type}</Text>
        <Text className="font-rubik-regular text-sm text-accent-100">
          {time}
        </Text>
      </View>
    </View>
  );
};

function capitalize(str: string): string {
  if (!str) {
    return ""; // Handle empty input
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default RemindersCard;
