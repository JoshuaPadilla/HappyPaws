import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons, { profileIcons } from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import { useAuthStore } from "@/store/useAuth";
import SettingsItem from "@/components/settingsItems";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/useUser";
import { ImageAvatar } from "@/components/image_avatar";

const Profile = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { logout } = useAuthStore();

  const goToEditProfile = () => {
    router.push("/(utility)/edit_profile");
  };

  const goToAppointments = () => {
    router.push("/(utility)/user_appointments");
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row justify-between items-end mb-4">
        <Text className="font-poppins-bold text-2xl">Profile</Text>

        <Image
          source={icons.bell_icon}
          className="size-8"
          resizeMode="contain"
        />
      </View>

      {/* Profile Header */}
      <View className="flex items-center pb-4 border-b border-black-400">
        <View className="mt-4">
          <ImageAvatar
            placeholder={profileIcons.profile_userImgPlaceholder}
            imageUrl={user?.profilePicture}
            size="40"
          />
        </View>

        <Text className="font-poppins-bold text-2xl mt-4 text-black-100">
          {user?.firstName || "Jhon"} {user?.lastName || "Doe"}
        </Text>

        <Text className="font-poppins-regular text-lg mt-2 text-black-200">
          {user?.email || "jhondoe@sample.com"}
        </Text>
      </View>

      {/* Clickables */}
      <View className="py-8 border-b border-black-400 gap-6">
        <SettingsItem
          iconLeft={profileIcons.profile_appointments}
          titleLeft="Appointment History"
          iconRight={icons.caret_right}
          onPress={goToAppointments}
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
          titleRight={user?.address || "Sinidman"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_phone}
          titleLeft="Contact"
          titleRight={user?.phone || "09123456789"}
        />

        <SettingsItem
          iconLeft={profileIcons.profile_gender}
          titleLeft="Gender"
          titleRight={user?.phone || "Male"}
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
        onPress={logout}
      />
    </SafeAreaView>
  );
};

export default Profile;
