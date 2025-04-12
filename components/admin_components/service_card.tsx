import { View, Text, Image } from "react-native";
import React from "react";
import {
  getAppointmentBg,
  getServiceIcons,
  getTotalPercentage,
} from "@/lib/utils";
import { service_icons } from "@/constants/icons";

interface ServiceCardProps {
  service: ServicePopularity;
  prevServiceCount: number;
  weekly?: boolean;
}

const ServiceCard = ({
  service,
  prevServiceCount,
  weekly,
}: ServiceCardProps) => {
  const bgColor = getAppointmentBg(service.serviceType);

  const serviceIcon: keyof typeof service_icons = getServiceIcons(
    service.serviceType
  );

  const countPercentage = getTotalPercentage(service.count, prevServiceCount);

  return (
    <View
      className="gap-4 w-[47%] h-48 rounded-xl p-4"
      style={{ backgroundColor: bgColor }}
    >
      <Image
        source={service_icons[serviceIcon]}
        className="size-12 rounded-full"
      />

      <View className="gap-2">
        <View className="flex-row gap-2 items-center">
          <Text className="font-rubik-semibold text-2xl text-black-100 px-2">
            {service.count}
          </Text>

          <Text className="font-rubik-medium text-sm text-black-200">
            | {service.serviceType}s
          </Text>
        </View>

        <View className="">
          <Text className="font-rubik-semibold text-black-200 text-sm px-2">
            {countPercentage >= 0 ? `+` : "-"}{" "}
            {Math.abs(countPercentage).toFixed()}%
          </Text>
          <Text className={`font-rubik-semibold text-black-200 text-sm px-2`}>
            from last {weekly ? "week" : "month"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;
