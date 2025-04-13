import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import {
  getAppointmentBg,
  getProgressLineColor,
  getServiceIcons,
  getStatusColor,
  getStatusIcons,
  getTotalPercentage,
} from "@/lib/utils";
import { status_icons } from "@/constants/icons";
import ProgressLine from "../charts/progress_line";

interface StatusCardProps {
  status: StatusCount;
  totalStatusCount: number;
  weekly?: boolean;
}

const StatusCard = ({ status, totalStatusCount, weekly }: StatusCardProps) => {
  const bgColor = getStatusColor(status.status);

  const statusIcon: keyof typeof status_icons = getStatusIcons(status.status);

  const progressLineColor = getProgressLineColor(status.status);

  const relativeCount = status.count / totalStatusCount;

  return (
    <View
      className="gap-4 w-[47%] h-48 rounded-xl p-4"
      style={{ backgroundColor: "#ffffff" }}
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
            {status.count} out of {totalStatusCount} appointments
          </Text>
        </View>

        <View className="px-2">
          <ProgressLine
            progress={relativeCount}
            filledColor={progressLineColor.filled}
            unFilledColor={progressLineColor.unfilled}
          />
        </View>
      </View>
    </View>
  );
};

export default StatusCard;
