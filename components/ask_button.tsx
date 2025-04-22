import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import { goToAskAiScreen } from "@/lib/routerFunctions";

const AskButton = () => {
  return (
    <TouchableOpacity
      className="absolute size-16 bottom-[90px] right-[20px] rounded-full z-10 bg-primary-100/80"
      onPress={goToAskAiScreen}
    >
      <Image
        source={icons.ask_icon}
        contentFit="fill"
        style={{ width: "100%", height: "100%" }}
      />
    </TouchableOpacity>
  );
};

export default AskButton;
