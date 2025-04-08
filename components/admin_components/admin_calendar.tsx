import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import moment, { Moment } from "moment";
import icons from "@/constants/icons";
import CustomButton from "../custom_button";

const getWeek = (dateString: string) => {
  const week: { dayMonth: number; dayWeek: string; currDate: boolean }[] = [];

  const currentDate = moment(dateString);
  const currentDay = currentDate.date(); // Get current day of the month

  const daysBefore = 3;
  const daysAfter = 3;

  for (let i = -daysBefore; i <= daysAfter; i++) {
    const date = currentDate.clone().add(i, "days");

    const dayMonth = date.date();
    const dayWeek = date.format("ddd"); // 'ddd' for short weekday names
    const currDate = dayMonth === currentDay;

    week.push({ dayMonth, dayWeek, currDate });
  }

  return week;
};

const AdminCalendar = ({
  date,
  setDate,
}: {
  date: string;
  setDate: (date: string) => void;
}) => {
  const week = getWeek(date);

  const handleNextDate = () => {
    const curr = moment(date).clone(); // Clone the Moment object!
    setDate(curr.add(1, "day").format("YYYY-MM-DD")); // Format the result
  };

  const handlePreviousDate = () => {
    const curr = moment(date).clone(); // Clone the Moment object!
    setDate(curr.subtract(1, "day").format("YYYY-MM-DD")); // Format the result
  };

  return (
    <View className="px-4 py-6 bg-white rounded-lg">
      {/* Buttons */}
      <View className="flex-row justify-between items-center mb-6 px-4">
        <View className="items-center">
          <CustomButton
            iconLeft={icons.back_green}
            iconSize="size-10"
            onPress={handlePreviousDate}
          />
          <Text className="font-rubik-medium">Prev</Text>
        </View>
        <Text className="font-poppins-bold text-2xl">
          {moment(date).format("MMMM, YYYY")}
        </Text>
        <View className="items-center">
          <CustomButton
            iconLeft={icons.next}
            iconSize="size-10"
            onPress={handleNextDate}
          />
          <Text className="font-rubik-medium">Next</Text>
        </View>
      </View>

      {/* Calendar */}
      <View className="flex-row justify-between items-center">
        {week.map((day) => (
          <Dates
            dayMonth={day.dayMonth}
            dayWeek={day.dayWeek}
            currDate={day.currDate}
            key={day.dayMonth}
          />
        ))}
      </View>
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
        {dayMonth?.toString()}
      </Text>
      <Text
        className={`${
          currDate ? "text-white" : "text-primary-100"
        } font-rubik-regular text-xs text-primary-100`}
      >
        {dayWeek}
      </Text>
    </View>
  );
};

export default AdminCalendar;
