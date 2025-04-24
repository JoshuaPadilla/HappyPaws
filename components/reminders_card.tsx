import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { cards_bg } from "@/constants/images";
import { Reminder } from "@/types/type";
import { addShadow, formatDate, getRemindersCardBg } from "@/lib/utils";
import { useAftercareStore } from "@/store/useAftercare";
import { useAppointmentsStore } from "@/store/useAppointments";
import { goToViewAftercare, goToViewAppointment } from "@/lib/routerFunctions";

interface RemindersCardProps {
  reminder: Reminder;
}

const RemindersCard = ({ reminder }: RemindersCardProps) => {
  const cardBgKey: keyof typeof cards_bg = getRemindersCardBg(reminder.type);
  const { getAftercare, selectedAftercare } = useAftercareStore();
  const { getOneAppointment } = useAppointmentsStore();

  const handlePressRemindersCard = () => {
    if (reminder.remindersType === "Aftercare") {
      getAftercare(reminder.id);
      goToViewAftercare();
    }

    if (reminder.remindersType === "Appointment") {
      getOneAppointment(reminder.id);

      goToViewAppointment();
    }
  };

  return (
    <TouchableOpacity
      className="p-2"
      style={addShadow()}
      onPress={handlePressRemindersCard}
    >
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
    </TouchableOpacity>
  );
};

export default RemindersCard;
