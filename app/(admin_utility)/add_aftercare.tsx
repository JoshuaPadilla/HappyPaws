import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import Dropdown from "@/components/dropdown";
import { AFTERCARE_TYPES } from "@/constants";
import MedicationItem from "@/components/admin_components/medication_item";

const AddAftercare = () => {
  const [typeOfAftercare, setTypeOfAftercare] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* headings */}
      <View className="flex-row justify-between gap-4 mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          New aftercare
        </Text>

        <CustomButton
          iconLeft={icons.edit_check}
          iconSize="size-8"
          onPress={() => {}}
        />
      </View>

      <ScrollView contentContainerClassName="p-4 gap-6 pb-[400px]">
        {/* start date and end date */}
        <View className="flex-row justify-between gap-4">
          {/* Start date */}
          <View className="gap-2 w-[46%]">
            <Text className="font-rubik-medium text-md text-black-200">
              Start Date
            </Text>

            <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
              <Text className="font-rubik-medium text-md text-black-100">
                date start
              </Text>

              <CustomButton iconLeft={icons.appointment_date} />
            </View>
          </View>

          {/* End Date */}
          <View className="gap-2 w-[46%]">
            <Text className="font-rubik-medium text-md text-black-200">
              Start Date
            </Text>

            <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
              <Text className="font-rubik-medium text-md text-black-100">
                date start
              </Text>

              <CustomButton iconLeft={icons.appointment_date} />
            </View>
          </View>
        </View>

        {/* care instruction */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">
            Care Instruction
          </Text>

          <View className="">
            <TextInput
              className="border border-primary-100 rounded-lg p-4"
              multiline
            />
          </View>
        </View>

        {/* Type of Aftercare */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">
            What type of aftercare?
          </Text>

          <Dropdown
            data={AFTERCARE_TYPES}
            onSelect={(selectedItem) => setTypeOfAftercare(selectedItem)}
            title="Type of aftercare"
            iconLeft={icons.dropdown}
            height={250}
          />
        </View>

        {/* Medication */}
        <View className="gap-2">
          <View className="flex-row justify-between py-4 items-center">
            <Text className="font-rubik-medium text-md text-black-200">
              Medications
            </Text>

            <CustomButton
              iconLeft={icons.plus_icon}
              tintColor="#73C7C7"
              iconSize="size-6"
            />
          </View>

          <View className="w-full gap-2">
            <MedicationItem />
            <MedicationItem />
          </View>
        </View>

        {/* Restrictions */}
        <View className="gap-2">
          <View className="flex-row justify-between py-4 items-center">
            <Text className="font-rubik-medium text-md text-black-200">
              Restrictions
            </Text>

            <CustomButton
              iconLeft={icons.plus_icon}
              tintColor="#73C7C7"
              iconSize="size-6"
            />
          </View>

          <View>
            <RestrictionItem />
            <RestrictionItem />
          </View>
        </View>

        {/* Notes */}
        <View className="gap-2">
          <Text className="font-rubik-medium text-md text-black-200">Note</Text>

          <View className="">
            <TextInput
              className="border border-primary-100 rounded-lg p-4"
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const RestrictionItem = ({ restriction }: { restriction?: string }) => {
  return (
    <View className="flex-row p-2 justify-between items-center">
      <View className="bg-primary-100 rounded-full size-3"></View>
      <Text className="w-[92%] font-rubik-medium text-lg text-black-100">
        {restriction || "Restriction name"}
      </Text>
    </View>
  );
};

export default AddAftercare;
