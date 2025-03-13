import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import React from "react";

interface SettingsItemProps {
  iconLeft: ImageSourcePropType;
  iconLeftSize?: string;
  iconRight?: ImageSourcePropType;
  titleLeft?: string;
  titleRight?: string;
  onPress?: () => void;
}

const SettingsItem = ({
  iconLeft,
  iconRight,
  titleLeft,
  titleRight,
  iconLeftSize,
  onPress,
  ...props
}: SettingsItemProps) => {
  return (
    <Pressable
      className="flex-row justify-between items-center w-full"
      onPress={onPress}
    >
      <View className="flex-row gap-4 items-center justify-center">
        <Image
          source={iconLeft}
          className={iconLeftSize ? `size-${iconLeftSize}` : "size-8"}
          resizeMode="contain"
        />

        <Text
          className={`text-black-100 font-rubik-${
            titleRight ? "regular" : "medium"
          } text-${titleRight ? "m" : "lg"}`}
        >
          {titleLeft}
        </Text>
      </View>

      {titleRight && (
        <Text className="font-rubik-medium text-xl text-black-100">
          {titleRight}
        </Text>
      )}

      {iconRight && (
        <Image source={iconRight} className="size-4" resizeMode="contain" />
      )}
    </Pressable>
  );
};

export default SettingsItem;
