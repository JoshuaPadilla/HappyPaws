import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import icons from "@/constants/icons";
import CustomButton from "./custom_button";

interface SearchBarProps {
  queryValue: string;
  placeholder: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar = ({
  queryValue,
  placeholder,
  setQuery,
  onSubmit,
}: SearchBarProps) => {
  const paddingStyle = {
    padding: Platform.OS === "ios" ? 0 : 8, // Apply padding if applyPadding is true
  };

  return (
    <KeyboardAvoidingView
      className={`w-full flex-row px-4 shadow rounded-xl bg-white items-center justify-between`}
    >
      <View className="flex-row gap-2 items-center">
        <Image source={icons.search_icon} className="size-6" />
        <TextInput
          style={paddingStyle}
          className={`w-[77%] text-black-100 font-rubik-regular`}
          placeholder={placeholder}
          placeholderTextColor={Platform.OS === "ios" ? "#888A98" : "#666876"} // iOS-specific color
          value={queryValue}
          onChange={(value) => setQuery(value.nativeEvent.text)}
        />
      </View>

      <CustomButton
        title="Search"
        textClassname="font-rubik-medium text-sm text-primary-100"
        onPress={onSubmit}
      />
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
