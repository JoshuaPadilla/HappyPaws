import { View, Text } from "react-native";
import React from "react";

const NoConnectionIndicator = () => {
  return (
    <View className="absolute bottom-[120px] bg-white self-center p-4 rounded-xl">
      <Text className="font-rubik-medium text-danger">
        No Internet Connection
      </Text>
    </View>
  );
};

export default NoConnectionIndicator;
