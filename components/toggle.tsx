import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

interface ToggleProps {
  trueValue: string;
  falseValue: string;

  onPress: () => void;
}

const Toggle = ({ trueValue, falseValue, onPress }: ToggleProps) => {
  const [value, setValue] = useState(true);

  const toggle = () => {
    setValue((val) => !val);
    onPress();
  };

  return (
    <Pressable
      className="flex-row px-2 py-2 bg-primary-100 rounded-[20px]"
      onPress={() => toggle()}
    >
      <Text
        className={`px-4 py-2 text-center ${
          value
            ? "font-poppins-bold text-sm text-black-100 bg-accent-100 rounded-[20px]"
            : ""
        }`}
      >
        {trueValue}
      </Text>

      <Text
        className={`px-4 py-2 text-center ${
          !value
            ? "font-poppins-bold text-sm text-black-100 bg-accent-100 rounded-[20px]"
            : ""
        }`}
      >
        {falseValue}
      </Text>
    </Pressable>
  );
};

export default Toggle;
