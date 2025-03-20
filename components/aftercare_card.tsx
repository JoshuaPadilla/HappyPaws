import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Aftercare } from "@/types/type";
import { findPetById, getAftercareBg } from "@/lib/utils";

interface AfterCareCardProps {
  aftercare: Aftercare;
  onPress: () => void;
}

const AfterCareCard = ({ aftercare, onPress }: AfterCareCardProps) => {
  const aftercareBg = getAftercareBg(aftercare.type);

  return (
    <Pressable className="rounded-lg p-2" onPress={onPress}>
      <View
        className={`flex-row justify-between p-4 items-center bg-white rounded-t-lg`}
        style={{ backgroundColor: aftercareBg }}
      >
        <Text className="font-rubik-semibold text-lg">{aftercare.type}</Text>
        <Text className="font-rubik-semibold text-m text-black-200">
          {aftercare.endDate}
        </Text>
      </View>

      <View className="p-4 bg-white rounded-b-lg">
        <Text className="font-rubik-regular text-m">
          {aftercare.careInstructions || ""}
        </Text>
      </View>
    </Pressable>
  );
};

export default AfterCareCard;
