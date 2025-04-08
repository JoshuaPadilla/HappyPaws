import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { cards_bg } from "@/constants/images";
import { Reminder } from "@/types/type";
import { formatDate, getRemindersCardBg } from "@/lib/utils";

interface RemindersCardProps {
  reminder: Reminder;
}

const RemindersCard = ({ reminder }: RemindersCardProps) => {
  const cardBgKey: keyof typeof cards_bg = getRemindersCardBg(reminder.type);
  return (
    <View className="shadow p-2">
      <ImageBackground
        source={cards_bg[cardBgKey]}
        className="w-[200px] h-[170px] rounded-xl overflow-hidden px-4 py-6 justify-between"
        resizeMode="cover"
      >
        <Text className="font-poppins-bold text-xl mb-6 text-black-100 max-w-32">
          {reminder.type}
        </Text>

        <View className="flex gap-2 max-w-[150px]">
          <Text className="font-rubik-medium text-m text-black-200">
            {reminder.title}
          </Text>

          <Text className="font-rubik-medium text-sm text-black-300">
            {reminder.remindersType === "Appointment"
              ? reminder.time
              : reminder.note}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RemindersCard;
