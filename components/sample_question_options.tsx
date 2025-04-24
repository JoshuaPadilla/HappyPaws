import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";

interface ComponentsProps {
  item: string;
  onSelect: () => void;
}

const SampleQuestionItem = ({ item, onSelect }: ComponentsProps) => {
  return (
    <Pressable
      onPress={onSelect}
      className="px-4 py-2 border border-primary-100 rounded-lg"
    >
      <Text className="font-rubik-regular text-black-100">{item}</Text>
    </Pressable>
  );
};

export default SampleQuestionItem;
