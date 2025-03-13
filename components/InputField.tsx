import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
  TextInputProps,
} from "react-native";
import React from "react";

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  width?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  width,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex">
        {label && (
          <Text
            className={`font-rubik-regular text-md text-black-300 ${
              Platform.OS === "ios" ? "mb-2" : ""
            }`}
          >
            {label}
          </Text>
        )}

        <View
          className={`w-${
            width || "full"
          } h-[50px] px-4 flex-row relative items-center gap-4 border rounded-xl border-primary-100 ${className}`}
        >
          {icon && (
            <Image
              source={icon}
              className={Platform.OS === "ios" ? "size-8" : "size-6"}
              resizeMode="contain"
            />
          )}

          <TextInput
            className={`flex-row w-[80%] font-rubik-regular items-center text-lg text-black-100  text-left ${
              Platform.OS === "ios" ? "" : ""
            }`}
            placeholderTextColor={Platform.OS === "ios" ? "#888A98" : "#666876"} // iOS-specific color
            secureTextEntry={secureTextEntry}
            textAlign="center"
            {...props}
            // textAlign="center"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputField;
