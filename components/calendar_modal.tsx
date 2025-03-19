import { View, Text, Modal } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { DateData } from "react-native-calendars";
import CustomButton from "./custom_button";

interface CalendarModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  maxDate?: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function CalendarModal({
  modalVisible,
  setModalVisible,
  minDate,
  maxDate,
  selectedDate,
  setSelectedDate,
}: CalendarModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View className="flex-1 bg-black-100/80 overflow-hidden">
        <View className="w-full h-4/5 bg-accent-100 absolute bottom-0 rounded-t-3xl px-6 py-8">
          <Calendar
            onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
            maxDate={maxDate || undefined}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#000000",
              selectedDayBackgroundColor: "#73C7C7",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#73C7C7",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#73C7C7",
              selectedDotColor: "#ffffff",
              arrowColor: "#73C7C7",
              monthTextColor: "#000000",
              textDayFontFamily: "Rubik-Regular",
              textMonthFontFamily: "Rubik-Bold",
              textDayHeaderFontFamily: "Rubik-Medium",
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#73C7C7",
              },
            }}
          />

          <CustomButton title="Done" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}
