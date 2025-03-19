import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons, { profileIcons } from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import { router } from "expo-router";
import Dropdown from "@/components/dropdown";
import { ImageAvatar } from "@/components/image_avatar";
import { gender, petSpecies, ageFormat, AGE_FORMAT } from "@/constants";
import TabSelect from "@/components/tab_select";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { usePetStore } from "@/store/usePets";
import { AddPetForm } from "@/types/type";
const AddPet = () => {
  const { addPet, isAdding } = usePetStore();
  const [ageInNum, setAgeInNum] = useState("");

  const [form, setForm] = useState<AddPetForm>({
    petName: "",
    petSpecie: "",
    petBreed: "",
    petAge: "",
    petGender: "",
    petImage: null,
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
          petImage: {
            uri: newImageUri.uri,
            type: newImageUri.type || "image/jpeg", // Default to 'image/jpeg' if type is not provided
            fileName: newImageUri.fileName || `${Date.now()}.jpg`, // Generate a unique filename if not provided
          },
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleAddPet = () => {
    if (
      !form.petName ||
      !form.petSpecie ||
      !form.petBreed ||
      !form.petAge ||
      !form.petGender
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }

    addPet(form);

    !isAdding && router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      {/* Headings */}

      <Spinner
        visible={isAdding}
        textContent={"Uploading image..."}
        textStyle={{ color: "#FFF" }}
      />

      <View className="flex-row justify-between items-end mb-4">
        <Text className="font-poppins-bold text-2xl">Add Pet</Text>

        <CustomButton
          title="Cancel"
          textClassname="font-poppins-medium text-lg text-danger"
          onPress={() => router.back()}
        />
      </View>
      {/* Form*/}
      <View className="px-8 justify-center items-center">
        <View className="mt-4 mb-8">
          <ImageAvatar imageUrl={form?.petImage?.uri} size="40" />

          {/* Edit image profile button */}
          <CustomButton
            iconLeft={profileIcons.profile_edit}
            btnClassname="absolute bottom-0 right-[-12]"
            onPress={selectImage}
          />
        </View>
      </View>
      <KeyboardAvoidingView className="flex-1 gap-4 pb-4">
        {/* pet name */}

        <View className="flex ] gap-1">
          <Text className="text-black-200 font-rubik-regular text-m">
            Name*
          </Text>

          <TextInput
            value={form.petName}
            onChange={(value) =>
              setForm({
                ...form,
                petName: value.nativeEvent.text,
              })
            }
            className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
          />
        </View>

        {/* Species Dropdown and Breed */}
        <View className="flex-row justify-between gap-4">
          {/* Species Dropdown */}
          <View className="flex gap-1 w-[35%]">
            <Text className="text-black-200 font-rubik-regular text-m">
              Specie
            </Text>

            <Dropdown
              data={petSpecies}
              onSelect={(selectedItem: any) =>
                setForm({ ...form, petSpecie: selectedItem })
              }
              iconLeft={icons.dropdown}
              title="select gender"
              height={petSpecies.length * 68}
              defaultValue={"Dog"}
            />
          </View>

          {/* Breed */}
          <View className="flex gap-1 w-[60%]">
            <Text className="text-black-200 font-rubik-regular text-m">
              Breed
            </Text>

            <TextInput
              value={form.petBreed}
              onChange={(value) =>
                setForm({
                  ...form,
                  petBreed: value.nativeEvent.text,
                })
              }
              className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
            />
          </View>
        </View>

        {/*age*/}
        <View className="flex-row justify-between gap-4">
          <View className="flex gap-1 w-[20%]">
            <Text className="text-black-200 font-rubik-regular text-m">
              Age
            </Text>

            <TextInput
              value={ageInNum}
              onChange={(value) => setAgeInNum(value.nativeEvent.text)}
              keyboardType="numeric"
              className=" h-[50px] border rounded-xl border-primary-100 pl-4 font-poppins-medium text-lg"
            />
          </View>

          {ageInNum && (
            <View className="flex gap-1 w-[70%]">
              <Text className="text-black-200 font-rubik-regular text-m">
                in
              </Text>
              <TabSelect
                data={AGE_FORMAT}
                onSelect={(value) => {
                  setForm({ ...form, petAge: `${ageInNum} ${value}` });
                }}
                defaultSelected="Years"
              />
            </View>
          )}
        </View>

        {/* gender */}
        <View className="flex-row justify-between gap-4">
          <View className="flex gap-1">
            <Text className="text-black-200 font-rubik-regular text-m">
              Gender
            </Text>
            <TabSelect
              data={gender}
              onSelect={(item) => setForm({ ...form, petGender: item })}
              defaultSelected="Male"
            />
          </View>
        </View>
        {/* buttons */}

        <CustomButton
          title="Save"
          btnClassname="bg-primary-100 h-[50px] rounded-full justify-center items-center mt-8"
          textClassname="font-poppins-medium text-lg text-white"
          onPress={handleAddPet}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPet;
