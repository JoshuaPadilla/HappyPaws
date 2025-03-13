import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons, { profileIcons } from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import InputField from "@/components/InputField";
import Dropdown from "@/components/dropdown";
import { days, genderDropdownData, years, months } from "@/constants";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/store/useUser";
import { ImageAvatar } from "@/components/image_avatar";

const EditProfile = () => {
  const router = useRouter();

  const { user, isUpdating, updateUser } = useUserStore();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: user?.address,
    phone: user?.phone,
    gender: user?.gender,
    birthday: {
      date: user?.birthday.date,
      month: user?.birthday.month,
      year: user?.birthday.year,
    },
    profilePicture: user?.profilePicture,
  });

  const handleUpdate = () => {
    updateUser(form);
    router.dismiss();
  };

  const handleImagePick = async () => {
    try {
      setIsUploadingImage(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImageUri = result.assets[0].uri;

        setForm((prevForm) => ({
          ...prevForm,
          profilePicture: newImageUri,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-8">
      {/* Headings */}
      <View className="flex-row justify-between items-end mb-4">
        <Text className="font-poppins-bold text-2xl">Edit Profile</Text>

        <CustomButton
          iconLeft={icons.edit_check}
          iconSize="size-8"
          onPress={handleUpdate}
        />

        <Spinner
          visible={isUpdating}
          textContent={"Saving..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>

      <View className="px-8 justify-center items-center">
        <View className="mt-4 mb-8">
          <ImageAvatar
            placeholder={profileIcons.profile_userImgPlaceholder}
            imageUrl={form.profilePicture}
            size="40"
          />

          {/* Edit image profile button */}
          <CustomButton
            iconLeft={profileIcons.profile_edit}
            btnClassname="absolute bottom-0 right-[-12]"
            onPress={handleImagePick}
          />
        </View>
      </View>

      <KeyboardAvoidingView className="flex-1 gap-2 pb-4">
        {/* first name and last name */}
        <View className="flex-row justify-between">
          <View className="flex w-[48%] gap-1">
            <Text className="text-black-200 font-rubik-regular text-m">
              First Name
            </Text>

            <TextInput
              value={form.firstName}
              onChange={(value) =>
                setForm({
                  ...form,
                  firstName: value.nativeEvent.text,
                })
              }
              className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
            />
          </View>

          <View className="flex w-[48%] gap-1">
            <Text className="text-black-200 font-rubik-regular text-m">
              Last Name
            </Text>

            <TextInput
              value={form.lastName}
              onChange={(value) =>
                setForm({
                  ...form,
                  lastName: value.nativeEvent.text,
                })
              }
              className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
            />
          </View>
        </View>

        {/* Address */}
        <View className="flex gap-1">
          <Text className="text-black-200 font-rubik-regular text-m">
            Address
          </Text>

          <TextInput
            value={form.address}
            onChange={(value) =>
              setForm({
                ...form,
                address: value.nativeEvent.text,
              })
            }
            className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
          />
        </View>

        {/* Contact Number */}
        <View className="flex gap-1">
          <Text className="text-black-200 font-rubik-regular text-m">
            Contact Number
          </Text>

          <TextInput
            inputMode="tel"
            value={form.phone}
            onChange={(value) =>
              setForm({
                ...form,
                phone: value.nativeEvent.text,
              })
            }
            className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
          />
        </View>

        {/* Gender Dropdown */}
        <View className="flex gap-1">
          <Text className="text-black-200 font-rubik-regular text-m">
            Gender
          </Text>

          <Dropdown
            data={genderDropdownData}
            onSelect={(selectedItem: any) =>
              setForm({ ...form, gender: selectedItem })
            }
            iconLeft={icons.dropdown}
            title="select gender"
            height={genderDropdownData.length * 68}
            defaultValue={form.gender}
          />
        </View>

        {/* Birthday */}
        <View className="flex gap-1">
          <Text className="mb-2 text-black-200 font-rubik-regular text-m">
            Birthday
          </Text>

          {/* Datepicker container */}
          <View className="flex-row justify-between">
            {/* month */}
            <View className="w-[32%]">
              <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                month
              </Text>
              <Dropdown
                data={months}
                onSelect={(selectedItem) =>
                  setForm({
                    ...form,
                    birthday: {
                      ...form.birthday,
                      month: selectedItem,
                    },
                  })
                }
                title="month"
                iconLeft={icons.dropdown}
                height={250}
                defaultValue={form.birthday.month}
              />
            </View>

            {/* Day */}
            <View className="w-[32%]">
              <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                day
              </Text>
              <Dropdown
                data={days}
                onSelect={(selectedItem) =>
                  setForm({
                    ...form,
                    birthday: {
                      ...form.birthday,
                      date: selectedItem,
                    },
                  })
                }
                title="day"
                iconLeft={icons.dropdown}
                height={250}
                defaultValue={form.birthday.date}
              />
            </View>

            {/* year */}
            <View className="w-[32%]">
              <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                year
              </Text>
              <Dropdown
                data={years}
                onSelect={(selectedItem) =>
                  setForm({
                    ...form,
                    birthday: {
                      ...form.birthday,
                      year: selectedItem,
                    },
                  })
                }
                title="year"
                iconLeft={icons.dropdown}
                height={250}
                defaultValue={form.birthday.year}
              />
            </View>
          </View>

          {/* Date pickers */}
          <View className="flex-row"></View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;
