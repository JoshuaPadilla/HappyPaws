import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { FeSpecularLighting } from "react-native-svg";

interface ProgressLineProps {
  progress: number;
  filledColor: string;
  unFilledColor: string;
}

const ProgressLine = ({
  progress,
  filledColor,
  unFilledColor,
}: ProgressLineProps) => {
  return (
    <Progress.Bar
      progress={progress}
      animationType={"spring"}
      borderWidth={0}
      color={filledColor}
      unfilledColor={unFilledColor}
      width={null}
    />
  );
};

export default ProgressLine;
