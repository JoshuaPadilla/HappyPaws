import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import CustomButton from "@/components/custom_button";
import Toggle from "@/components/toggle";
import { isActive } from "@/lib/utils";
import { useAftercareStore } from "@/store/useAftercare";
import AfterCareCard from "@/components/aftercare_card";
import FastSample from "@/components/fast_sample";

const Aftercare = () => {
  const [active, setActive] = useState(true);

  const { allAftercares, isLoading } = useAftercareStore();

  const activeAftercares = allAftercares.filter((aftercare) =>
    isActive(aftercare.endDate)
  );

  const completedAftercares = allAftercares.filter(
    (aftercare) => !isActive(aftercare.endDate)
  );

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row w-full justify-between items-center mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          onPress={router.back}
          iconSize="size-8"
        />
        <Toggle
          trueValue="Active"
          falseValue="Completed"
          onPress={() => setActive((active) => !active)}
        />
      </View>

      <View>
        <Text className="text-2xl font-bold mb-8">Aftercares</Text>

        {isLoading ? (
          <ActivityIndicator color={"#73C7C7"} className="p-16" />
        ) : (
          <ScrollView contentContainerClassName="pb-[150px]">
            {active ? ( // if active is true, show active aftercares
              activeAftercares.length > 0 ? ( //check if there are any active aftercares
                activeAftercares.map((aftercare) => (
                  <AfterCareCard aftercare={aftercare} key={aftercare._id} />
                ))
              ) : (
                <Text>No active aftercares</Text>
              )
            ) : completedAftercares.length > 0 ? (
              completedAftercares.map((aftercare) => (
                <AfterCareCard aftercare={aftercare} key={aftercare._id} />
              ))
            ) : (
              <Text>No completed aftercares</Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Aftercare;
