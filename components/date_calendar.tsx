import { View, Text } from "react-native";
import React from "react";

const DateCalendar = () => {
  return (
    <View className="flex-row justify-between items-center">
      <Dates />
      <Dates />
      <Dates />
      <Dates currDate={true} />
      <Dates />
      <Dates />
      <Dates />
    </View>
  );
};

interface DateProps {
  dayMonth?: Number;
  dayWeek?: string;
  currDate?: boolean;
}

const Dates = ({ dayMonth, dayWeek, currDate }: DateProps) => {
  return (
    <View
      className={`${
        currDate ? "bg-primary-100 w-12 h-16" : "w-12 h-14 "
      }  flex-col items-center justify-center`}
      style={{ borderWidth: 2, borderColor: "#73C7C7", borderRadius: 16 }}
    >
      <Text
        className={`${
          currDate ? "text-white" : "text-primary-100"
        } font-rubik-semibold text-lg `}
      >
        12
      </Text>
      <Text
        className={`${
          currDate ? "text-white" : "text-primary-100"
        } font-rubik-regular text-xs text-primary-100`}
      >
        Tue
      </Text>
    </View>
  );
};

export default DateCalendar;
