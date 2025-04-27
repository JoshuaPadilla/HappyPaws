import { View, Text } from "react-native";
import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";

const NoConnectionIndicator = () => {
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;

  return (
    <View className="absolute bottom-[120px] bg-white self-center p-4 rounded-xl">
      <Text className="font-rubik-medium text-danger">
        No Internet Connection
      </Text>
    </View>
  );
};

export default NoConnectionIndicator;
