import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClient } from "@/store/useClient";
import Spinner from "react-native-loading-spinner-overlay";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { ImageAvatar } from "@/components/image_avatar";
import SettingsItem from "@/components/settingsItems";
import { textShortener } from "@/lib/utils";

const ViewClient = () => {
  const { isLoading, selectedClient } = useClient();

  const thisUser = selectedClient;

  return (
    <SafeAreaView className="flex-1 bg-background-100 px-4 pt-8">
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* headings */}
      <View className="flex-row justify-start items-center mb-6 gap-4">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          View Client
        </Text>
      </View>

      {!isLoading && thisUser && (
        // Profile Header
        <>
          <View className="flex items-center pb-4 border-b border-black-400">
            <View className="mt-4">
              <ImageAvatar imageUrl={thisUser.profilePicture} size="32" />
            </View>

            <Text className="font-poppins-bold text-2xl mt-4 text-black-100">
              {thisUser.firstName || "Jhon"} {thisUser.lastName || "Doe"}
            </Text>

            <Text className="font-poppins-regular text-lg mt-2 text-black-200">
              {thisUser.email || "jhondoe@sample.com"}
            </Text>
          </View>

          {/* // Details */}
          <View className="py-4 gap-4 mb-6">
            <SettingsItem
              iconLeft={profileIcons.profile_address}
              titleLeft="Address"
              titleRight={
                textShortener(thisUser.address || "", 10) || "Sinidman"
              }
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewClient;
