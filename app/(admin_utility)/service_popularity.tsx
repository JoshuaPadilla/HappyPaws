import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { useInsightsStore } from "@/store/useInsights";
import PieChartService from "@/components/charts/pie_chart_service";
import Toggle from "@/components/toggle";
import ServiceCard from "@/components/admin_components/service_card";
import { addShadow } from "@/lib/utils";

const ServicePopularity = () => {
  const [weekly, setWeekly] = useState(true);

  const {
    thisWeekInsights,
    thisMonthInsights,
    prevMonthInsights,
    prevWeekInsights,
  } = useInsightsStore();

  const servicePopularity = weekly
    ? thisWeekInsights?.weeklyServicePopularity
    : thisMonthInsights?.monthlyServicePopularity;

  const prevServicePopularity = weekly
    ? prevWeekInsights?.weeklyServicePopularity
    : prevMonthInsights?.monthlyServicePopularity;

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      {/* Headings */}
      <View className="flex-row justify-between items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Toggle
          falseValue="Monthly"
          trueValue={"Weekly"}
          onPress={() => setWeekly((prev) => !prev)}
        />
      </View>

      {/* pie chart service*/}
      <View className="p-4 bg-white rounded-lg" style={addShadow()}>
        <View className="flex-row items-center justify-between">
          <Text className="font-rubik-medium text-xl text-black-200">
            Service Popularity
          </Text>
        </View>

        <View className="flex-row gap-6 items-center p-4 justify-between">
          {/* legends */}
          <View className="gap-1">
            <View className="flex-row items-center gap-2">
              <View className="size-4 bg-base-vaccine rounded-full"></View>
              <Text className="font-rubik-regular text-black-200 text-lg">
                Vaccine
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <View className="size-4 bg-base-groom rounded-full"></View>
              <Text className="font-rubik-regular text-black-200 text-lg">
                Grooming
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <View className="size-4 bg-base-dental rounded-full"></View>
              <Text className="font-rubik-regular text-black-200 text-lg">
                Dental
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <View className="size-4 bg-base-checkup rounded-full"></View>
              <Text className="font-rubik-regular text-black-200 text-lg">
                Checkup
              </Text>
            </View>
          </View>

          {thisMonthInsights && thisWeekInsights && (
            <PieChartService data={servicePopularity} />
          )}
        </View>
      </View>

      <Text className="font-rubik-semibold text-xl pt-8 pb-4">
        Service Details
      </Text>

      <ScrollView
        contentContainerClassName="pb-[100px] flex-row flex-wrap justify-between gap-4"
        showsVerticalScrollIndicator={false}
      >
        {servicePopularity?.map((service, index) => {
          // filter the matching service type from previous insights
          // returns an arrau so get the first item then get the count property
          const prevServiceCount = prevServicePopularity?.filter(
            (prevService) => prevService.serviceType === service.serviceType
          )[0].count;

          return (
            <ServiceCard
              key={index}
              service={service}
              prevServiceCount={prevServiceCount || 0}
              weekly={weekly}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicePopularity;
