import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { User } from "@/types/type";
import { useClient } from "@/store/useClient";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { profileIcons } from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import { ImageAvatar } from "@/components/image_avatar";
import Dropdown from "@/components/dropdown";
import { days, genderDropdownData, months, years } from "@/constants";
import { isUserFormValid, showToast } from "@/lib/utils";
import { dismiss } from "@/lib/routerFunctions";
const EditClient = () => {
  const { selectedClient, updateClient } = useClient();

  const [form, setForm] = useState<Partial<User>>({
    firstName: selectedClient!.firstName,
    lastName: selectedClient!.lastName,
    address: selectedClient!.address,
    phone: selectedClient!.phone,
    gender: selectedClient!.gender,
    birthday: {
      date: selectedClient?.birthday?.date || "",
      month: selectedClient?.birthday?.month || "",
      year: selectedClient?.birthday?.year || "",
    },
    profilePicture: selectedClient?.profilePicture,
  });

  const selectImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library to select an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use "Images" for images only
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for profile pictures
        quality: 0.8, // Highest quality
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImageUri = result.assets[0]; // Get the first selected image

        setForm((prevForm) => ({
          ...prevForm,
          profilePicture: {
            uri: newImageUri.uri,
            type: newImageUri.type || "image/jpeg", // Default to 'image/jpeg' if type is not provided
            fileName: newImageUri.fileName || `profile-${Date.now()}.jpg`, // Generate a unique filename if not provided
          },
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleUpdate = () => {
    if (!isUserFormValid(form)) {
      showToast("error", "all fields should be filled");
      return;
    }

    updateClient(form);

    dismiss();
  };

  return (
    <SafeAreaView className="flex-1 py-8 px-6 bg-accent-100">
      {/* Headings */}
      <View className="flex-row justify-between items-end mb-4">
        <View className="flex-row gap-4 items-center">
          <CustomButton
            iconLeft={icons.back_green}
            iconSize="size-8"
            onPress={goBack}
          />
          <Text className="font-poppins-bold text-xl">Edit Details</Text>
        </View>
        <CustomButton
          iconLeft={icons.edit_check}
          iconSize="size-8"
          onPress={handleUpdate}
        />
      </View>

      <View className="px-8 justify-center items-center">
        <View className="mt-4 mb-8">
          <ImageAvatar imageUrl={form.profilePicture} size="40" />

          {/* Edit image profile button */}
          <CustomButton
            iconLeft={profileIcons.profile_edit}
            btnClassname="absolute bottom-0 right-[-12]"
            onPress={selectImage}
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
                onSelect={(selectedItem: string) =>
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
                defaultValue={form.birthday!.month}
              />
            </View>

            {/* Day */}
            <View className="w-[32%]">
              <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                day
              </Text>
              <Dropdown
                data={days}
                onSelect={(selectedItem: string) =>
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
                defaultValue={form.birthday!.date}
              />
            </View>

            {/* year */}
            <View className="w-[32%]">
              <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                year
              </Text>
              <Dropdown
                data={years}
                onSelect={(selectedItem: string) =>
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
                defaultValue={form.birthday!.year}
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

export default EditClient;
