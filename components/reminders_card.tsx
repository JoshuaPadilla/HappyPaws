import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { cards_bg } from "@/constants/images";
import { Reminders } from "@/types/type";
import { getRemindersCardBg } from "@/lib/utils";

const RemindersCard = ({ type, title, time }: Reminders) => {
  const cardBgKey: keyof typeof cards_bg = getRemindersCardBg(type);
  // console.log(cardBgKey);

  return (
    <View className="shadow p-2">
      <ImageBackground
        source={cards_bg[cardBgKey]}
        className="w-[200px] h-[160px] rounded-xl overflow-hidden px-4 py-6"
        resizeMode="cover"
      >
        <Text className="font-poppins-bold text-xl mb-6 text-black-100 max-w-32">
          {type}
        </Text>

        <View className="flex gap-2 max-w-[150px]">
          <Text className="font-rubik-medium text-m text-black-200">
            {title}
          </Text>

          <Text className="font-rubik-medium text-sm text-black-300">
            {time}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RemindersCard;
