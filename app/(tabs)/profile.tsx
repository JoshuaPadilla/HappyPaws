import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons, { profileIcons } from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import { useAuthStore } from "@/store/useAuth";
import SettingsItem from "@/components/settingsItems";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/useUser";
import { ImageAvatar } from "@/components/image_avatar";
import { goToAppointmentHistory, goToEditProfile } from "@/lib/routerFunctions";
import ConfirmationModal from "@/components/confirmationModal";
import { textShortener } from "@/lib/utils";
const Profile = () => {
  const router = useRouter();
  const { user, isUpdating } = useUserStore();
  const { logout } = useAuthStore();

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const handleLogout = () => {
    setConfirmationModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setConfirmationModalVisible(false);
  };

  const handleLogoutCancel = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      <ConfirmationModal
        icon={profileIcons.profile_logout}
        modalVisible={confirmationModalVisible}
        setModalVisible={setConfirmationModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        title="Logout"
        message="Are you sure you want to logout?"
        onCancelBtnClassname="w-[45%] bg-black-400 items-center py-2 rounded-lg"
        onConfirmBtnClassname="w-[45%] bg-primary-100 items-center py-2 rounded-lg"
      />

      {isUpdating && (
        <ActivityIndicator
          color={"#73C7C7"}
          size={"large"}
          className="absolute top-1/2 left-1/2"
        />
      )}

      {/* Headings */}
      <View className="flex-row justify-between items-end mb-4">
        <Text className="font-poppins-bold text-2xl">Profile</Text>

        <CustomButton
          btnClassname=""
          textClassname=""
          iconLeft={icons.bell_icon}
          iconSize="size-8"
          onPress={() => {}}
        />
      </View>

      {/* Profile Header */}
      <View className="flex items-center pb-4 border-b border-black-400">
        <View className="mt-4">
          <ImageAvatar imageUrl={user?.profilePicture} size="32" />
        </View>

        <Text className="font-poppins-bold text-2xl mt-4 text-black-100">
          {user?.firstName || "Jhon"} {user?.lastName || "Doe"}
        </Text>

        <Text className="font-poppins-regular text-lg mt-2 text-black-200">
          {user?.email || "jhondoe@sample.com"}
        </Text>
      </View>

      {/* Clickables */}
      <View className="py-8 border-b border-black-400 gap-4">
        <SettingsItem
          iconLeft={profileIcons.profile_appointments}
          titleLeft="Appointment History"
          iconRight={icons.caret_right}
          onPress={goToAppointmentHistory}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_settings}
          titleLeft="Settings"
          iconRight={icons.caret_right}
        />
      </View>

      {/* Details */}
      <View className="py-4 border-b border-black-400 gap-4 mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-rubik-medium text-lg text-black-100">
            Details
          </Text>

          <CustomButton
            iconLeft={profileIcons.profile_detailsEdit}
            title="Edit Pofile"
            btnClassname="flex-row items-center justify-center gap-2 rounded-xl px-4 py-1 bg-primary-100"
            textClassname="font-rubik-light text-m text-accent-100"
            iconSize="size-3"
            tintColor="#F6F4F0"
            onPress={goToEditProfile}
          />
        </View>

        <SettingsItem
          iconLeft={profileIcons.profile_address}
          titleLeft="Address"
          titleRight={textShortener(user?.address || "", 10) || "Sinidman"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_phone}
          titleLeft="Contact"
          titleRight={user?.phone || "09123456789"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_gender}
          titleLeft="Gender"
          titleRight={user?.gender || "Male"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_birthday}
          titleLeft="Birthday"
          titleRight={
            user?.birthday
              ? `${user?.birthday.month} ${user?.birthday.date}, ${user?.birthday.year}`
              : "June 2, 2024"
          }
        />
      </View>

      {/* Logout */}
      <CustomButton
        title="Logout"
        iconLeft={profileIcons.profile_logout}
        btnClassname="flex-row gap-2"
        textClassname="font-rubik-regular text-black-100"
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Profile;
