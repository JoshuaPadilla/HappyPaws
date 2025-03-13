import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

interface TabSelectProps {
  data: string[];
  onSelect: (item: string) => void;
}

const TabSelect = ({ data, onSelect }: TabSelectProps) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (item: string) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <View className="flex-row justify-between gap-4 h-[50px]">
      <Pressable
        className={`w-[48%] border-primary-100 border rounded-xl p-2 items-center ${
          data[0] === selected ? "bg-primary-100" : ""
        }`}
        onPress={() => handleSelect(data[0])}
      >
        <Text className="font-poppins-medium text-lg">{data[0]}</Text>
      </Pressable>
      <Pressable
        className={`w-[48%] border-primary-100 border rounded-xl p-2 items-center ${
          data[1] === selected ? "bg-primary-100" : ""
        }`}
        onPress={() => handleSelect(data[1])}
      >
        <Text className="font-poppins-medium text-lg">{data[1]}</Text>
      </Pressable>
    </View>
  );
};

export default TabSelect;
