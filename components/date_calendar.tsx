import { View, Text } from "react-native";
import React from "react";

const getWeek = () => {
  const week: { dayMonth: number; dayWeek: string; currDate: boolean }[] = [];

  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get current day of the month

  const daysBefore = 3; // Number of days to show before the current date
  const daysAfter = 3; // Number of days to show after the current date

  const datesArray = Array.from(
    { length: daysBefore + daysAfter + 1 },
    (_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDay + (index - daysBefore)); // Adjust date calculation

      const dayMonth = date.getDate();
      const dayWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      const currDate = dayMonth === currentDay;

      week.push({ dayMonth, dayWeek, currDate });
    }
  );

  return week;
};

const DateCalendar = () => {
  const thisWeek = getWeek();

  return (
    <View className="flex-row justify-between items-center">
      {thisWeek.map((day) => (
        <Dates
          dayMonth={day.dayMonth}
          dayWeek={day.dayWeek}
          currDate={day.currDate}
          key={day.dayMonth}
        />
      ))}
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

export default DateCalendar;
