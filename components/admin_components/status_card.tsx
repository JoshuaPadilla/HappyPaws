import { View, Text, Image } from "react-native";
import React from "react";
import {
  getAppointmentBg,
  getServiceIcons,
  getStatusColor,
  getStatusIcons,
  getTotalPercentage,
} from "@/lib/utils";
import { status_icons } from "@/constants/icons";

interface StatusCardProps {
  status: StatusCount;
  totalStatusCount: number;
  weekly?: boolean;
}

const StatusCard = ({ status, totalStatusCount, weekly }: StatusCardProps) => {
  const bgColor = getStatusColor(status.status);

  const statusIcon: keyof typeof status_icons = getStatusIcons(status.status);

  const relativeCount = Math.abs((status.count / totalStatusCount) * 100);

  return (
    <View
      className="gap-4 w-[47%] h-48 rounded-xl p-4"
      style={{ backgroundColor: bgColor }}
    >
      <Image
        source={status_icons[statusIcon]}
        className="size-10 rounded-full"
      />

      <View className="gap-2">
        <View className="flex-row gap-2 items-center">
          <Text className="font-rubik-semibold text-2xl text-black-100 px-2">
            {status.count}
          </Text>

          <Text className="font-rubik-medium text-sm text-black-200">
            | {status.status}
          </Text>
        </View>

        <View className="">
          <Text className="font-rubik-semibold text-black-200 text-sm px-2">
            {relativeCount.toFixed()}% relative from
          </Text>
          <Text className={`font-rubik-semibold text-black-200 text-sm px-2`}>
            total status this {weekly ? "week" : "month"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatusCard;
