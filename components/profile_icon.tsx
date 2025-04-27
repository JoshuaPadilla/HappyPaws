import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useAuthStore } from "@/store/useAuth";
import { goToProfile } from "@/lib/routerFunctions";
import { profileIcons } from "@/constants/icons";

const ProfileIcon = () => {
  const { authUser } = useAuthStore();

  return (
    <TouchableOpacity
      className="size-14 rounded-full border-2 border-primary-100"
      onPress={goToProfile}
    >
      <Image
        source={
          authUser?.profilePicture || profileIcons.profile_userImgPlaceholder
        }
        style={{ width: "100%", height: "100%", borderRadius: 9999 }}
      />
    </TouchableOpacity>
  );
};

export default ProfileIcon;
