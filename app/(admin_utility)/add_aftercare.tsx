import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import Dropdown from "@/components/dropdown";
import { AFTERCARE_TYPES } from "@/constants";
import MedicationItem from "@/components/admin_components/medication_item";
import { AftercareForm, Medication, MedicationForm } from "@/types/type";
import DatePickerModal from "@/components/date_picker_modal";
import { formatDate } from "@/lib/utils";
import NewMedicationModal from "@/components/admin_components/new_medication_modal";

const AddAftercare = () => {
  const dateFor = useRef("start");
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [newMedicationModalVisible, setNewMedicationModalVisible] =
    useState(false);

  const [text, onChangeText] = React.useState("Useless Text");

  const [type, setType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [followUpDate, setFollowUpDate] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [aftercareType, setAftercareType] = useState<string[]>([]);
  const [medications, setMedications] = useState<MedicationForm[]>([]);

  console.log("medications", medications);

  const handleShowCalendar = (whatDate: String) => {
    if (whatDate === "start") {
      dateFor.current = "start";
    } else if (whatDate === "end") {
      dateFor.current = "end";
    } else {
      dateFor.current = "follow";
    }
    setCalendarModalVisible(true);
  };

  const setDate = (date: string) => {
    switch (dateFor.current) {
      case "start":
        setStartDate(date);
        break;
      case "end":
        setEndDate(date);
        break;
      default:
        setFollowUpDate(date);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* Modals */}
      <>
        <DatePickerModal
          modalVisible={calendarModalVisible}
          setModalVisible={setCalendarModalVisible}
          setDate={setDate}
          minDate={dateFor.current === "end" ? startDate : undefined}
        />

        <NewMedicationModal
          modalVisible={newMedicationModalVisible}
          setModalVisible={setNewMedicationModalVisible}
          setMedications={(medication) =>
            setMedications((prev) => [...prev, medication])
          }
        />
      </>
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
      <ScrollView
        contentContainerClassName="p-4 gap-6 pb-[400px]"
        showsVerticalScrollIndicator={false}
      >
        {/* start date and end date */}
        <View className="flex-row justify-between gap-4">
          {/* Start date */}
          <View className="gap-2 w-[46%]">
            <Text className="font-rubik-medium text-md text-black-200">
              Start Date
            </Text>

            <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
              <Text className="font-rubik-medium text-sm text-black-100">
                {startDate ? formatDate(startDate) : "YYYY/MM/DD"}
              </Text>

              <CustomButton
                iconLeft={icons.appointment_date}
                onPress={() => handleShowCalendar("start")}
              />
            </View>
          </View>

          {/* End Date */}
          <View className="gap-2 w-[46%]">
            <Text className="font-rubik-medium text-md text-black-200">
              End Date
            </Text>

            <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
              <Text className="font-rubik-medium text-sm text-black-100">
                {endDate ? formatDate(endDate) : "YYYY/MM/DD"}
              </Text>

              <CustomButton
                iconLeft={icons.appointment_date}
                onPress={() => handleShowCalendar("end")}
              />
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
              value={careInstructions}
              multiline
              onChangeText={setCareInstructions}
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
            onSelect={setType}
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
              onPress={() => setNewMedicationModalVisible(true)}
            />
          </View>

          <View className="w-full gap-2">
            {medications.map((medication, index) => (
              <MedicationItem key={index} medication={medication} />
            ))}
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
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* followupdate */}

        <View className="gap-2 ">
          <Text className="font-rubik-medium text-md text-black-200">
            Follow-up Date
          </Text>

          <View className="flex-row border border-primary-100 p-4 rounded-lg items-center justify-between">
            <Text className="font-rubik-medium text-sm text-black-100">
              {followUpDate ? formatDate(followUpDate) : "YYYY/MM/DD"}
            </Text>

            <CustomButton
              iconLeft={icons.appointment_date}
              onPress={() => handleShowCalendar("follow")}
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
