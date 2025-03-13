import { Pressable, ScrollView, Text, View } from "react-native";
import { businessHours } from "@/constants";
import { useState } from "react";

interface TimeSlotItemProps {
  time: string;
  booked: boolean;
  selected: boolean;
  setSelected: (time: string) => void;
}

interface NewAppointmentTimeSlotProps {
  bookedSlots: { time: string }[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function NewAppointmentTimeSlot({
  bookedSlots,
  selectedTime,
  setSelectedTime,
}: NewAppointmentTimeSlotProps) {
  return (
    <ScrollView contentContainerClassName="pb-[100px] gap-6 overflow-hidden">
      {businessHours.map((time) => {
        const booked = bookedSlots.find((booked) => booked.time === time);

        return (
          <TimeSlotItem
            time={time}
            booked={booked ? true : false}
            selected={selectedTime === time}
            setSelected={setSelectedTime}
            key={time}
          />
        );
      })}
    </ScrollView>
  );
}

const TimeSlotItem = ({
  time,
  booked,
  selected,
  setSelected,
}: TimeSlotItemProps) => {
  const isAM = time.split(" ")[1] === "AM";

  const isBookedColor = booked && "bg-gray-100 border border-black-400";

  return (
    <View className="flex-row justify-end h-[50px] gap-6 items-center">
      <View className="flex-row gap-2">
        <Text className="font-rubik-medium text-m ">{time.split(" ")[0]}</Text>
        <Text
          className={`${
            isAM ? "text-yellow-500" : "text-orange-500"
          } font-rubik-medium text-m`}
        >
          {time.split(" ")[1]}
        </Text>
      </View>

      <Pressable
        className={`${isBookedColor} ${
          selected ? "bg-primary-100" : "bg-white"
        } w-[60%] h-full justify-center items-center rounded-xl`}
        onPress={() => {
          booked ? null : setSelected(time);
        }}
      >
        <Text
          className={`${
            booked
              ? "text-black-100"
              : selected
              ? "text-white"
              : "text-primary-100"
          } font-rubik-semibold text-m`}
        >
          {booked ? "Booked" : selected ? "Selected" : "Available"}
        </Text>
      </Pressable>
    </View>
  );
};
