import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import { ImageAvatar } from "@/components/image_avatar";
import { useClient } from "@/store/useClient";
import { goBack, goToEditClient } from "@/lib/routerFunctions";
import SettingsItem from "@/components/settingsItems";
import { formatDate, textShortener } from "@/lib/utils";
import Spinner from "react-native-loading-spinner-overlay";

const ClientDetails = () => {
  const { selectedClient, isUpdating } = useClient();

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      <Spinner
        visible={isUpdating}
        textContent={"Updating..."}
        textStyle={{ color: "#FFF" }}
      />
      {/* Headings */}
      <View className="flex-row justify-between items-center mb-4">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <CustomButton
          iconLeft={profileIcons.profile_edit}
          iconSize="size-6"
          onPress={goToEditClient}
        />
      </View>

      {/* Profile Header */}
      <View className="flex items-center pb-4 border-b border-black-400">
        <View className="mt-4">
          <ImageAvatar imageUrl={selectedClient?.profilePicture} size="32" />
        </View>

        <Text className="font-poppins-bold text-2xl mt-4 text-black-100">
          {selectedClient?.firstName || "Jhon"}{" "}
          {selectedClient?.lastName || "Doe"}
        </Text>

        <Text className="font-poppins-regular text-lg mt-2 text-black-200">
          {selectedClient?.email || "jhondoe@sample.com"}
        </Text>
      </View>

      {/* Details */}
      <View className="py-8 border-b border-black-400 gap-4 mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-rubik-medium text-lg text-black-100">
            Details
          </Text>
        </View>

        <SettingsItem
          iconLeft={profileIcons.profile_address}
          titleLeft="Address"
          titleRight={
            textShortener(selectedClient?.address || "", 10) || "Sinidman"
          }
        />

        <SettingsItem
          iconLeft={profileIcons.profile_phone}
          titleLeft="Contact"
          titleRight={selectedClient?.phone || "09123456789"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_gender}
          titleLeft="Gender"
          titleRight={selectedClient?.gender || "Male"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_birthday}
          titleLeft="Birthday"
          titleRight={
            selectedClient?.birthday
              ? `${selectedClient?.birthday.month} ${selectedClient?.birthday.date}, ${selectedClient?.birthday.year}`
              : "June 2, 2024"
          }
        />
      </View>

      <View className="flex-row gap-4 justify-between">
        <Text className="font-rubik-regular text-lg">Joined At:</Text>
        <Text className="font-rubik-semibold text-lg">
          {formatDate(selectedClient?.joinedAt || "")}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ClientDetails;
