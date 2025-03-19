import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { useAftercareStore } from "@/store/useAftercare";
import { Aftercare } from "@/types/type";
import { getAftercareBg } from "@/lib/utils";
const AfterCareCard = ({ aftercare }: { aftercare: Aftercare }) => {
  const aftercareBg = getAftercareBg(aftercare.type);

  return (
    <Pressable className="rounded-lg p-2">
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
        <Text className="font-rubik-semibold text-xl">
          {aftercare.instructions}
        </Text>
        <Text className="font-rubik-regular text-m">
          {aftercare.notes || ""}
        </Text>
      </View>
    </Pressable>
  );
};

export default AfterCareCard;
