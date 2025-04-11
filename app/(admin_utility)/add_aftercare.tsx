import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack } from "@/lib/routerFunctions";
import Dropdown from "@/components/dropdown";
import { AFTERCARE_TYPES } from "@/constants";
import MedicationItem from "@/components/admin_components/medication_item";
import { AftercareForm, Medication } from "@/types/type";
import DatePickerModal from "@/components/date_picker_modal";
import { formatDate, isValidAftercare, showToast } from "@/lib/utils";
import NewMedicationModal from "@/components/admin_components/new_medication_modal";
import NewRestrictionModal from "@/components/admin_components/new_restriction_modal";
import { useClient } from "@/store/useClient";
import { useAdminPets } from "@/store/useAdminPets";
import { useAftercareStore } from "@/store/useAftercare";
import moment from "moment";

const AddAftercare = () => {
  const { selectedClient } = useClient();
  const { selectedPet } = useAdminPets();
  const { addAftercare, selectedAftercare, updateAftercare, action } =
    useAftercareStore();

  const dateFor = useRef("start");
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [newMedicationModalVisible, setNewMedicationModalVisible] =
    useState(false);
  const [newRestrictionModalVisible, setNewRestrictionModalVisible] =
    useState(false);

  const [error, setError] = useState("");

  const [type, setType] = useState<any>(
    selectedAftercare?.type || "Medication"
  );
  const [startDate, setStartDate] = useState<string>(
    selectedAftercare?.startDate || ""
  );
  const [endDate, setEndDate] = useState<string>(
    selectedAftercare?.endDate || ""
  );
  const [followUpDate, setFollowUpDate] = useState<string>(
    selectedAftercare?.followUpDate || ""
  );
  const [note, setNote] = useState<string>(selectedAftercare?.notes || "");
  const [careInstructions, setCareInstructions] = useState<string>(
    selectedAftercare?.careInstructions || ""
  );
  const [restrictions, setRestrictions] = useState<string[]>(
    selectedAftercare?.restrictions || []
  );
  const [medications, setMedications] = useState<Medication[]>(
    selectedAftercare?.medications || []
  );

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

  const handleSubmit = () => {
    const newAftercare: AftercareForm = {
      type,
      medications,
      followUpDate,
      restrictions,
      careInstructions,
      notes: note,
      endDate,
      startDate,
    };

    if (!isValidAftercare(newAftercare)) {
      setError("*Please fill in all fields");
      return;
    }

    action === "add"
      ? addAftercare(
          newAftercare,
          selectedPet?._id || "",
          selectedClient?._id || ""
        )
      : updateAftercare(newAftercare, selectedAftercare?._id || "");

    goBack();
  };

  const handleDeleteMedication = (id: string) => {
    setMedications((prev) =>
      prev.filter(
        (medication) => medication.indexID !== id && medication._id !== id
      )
    );
  };

  const handleDeleteRestrictions = (selectedRestriction: string) => {
    setRestrictions((prev) =>
      prev.filter((restriction) => restriction !== selectedRestriction)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8 gap-4">
      {/* Modals */}
      <>
        <DatePickerModal
          modalVisible={calendarModalVisible}
          setModalVisible={setCalendarModalVisible}
          setDate={setDate}
          minDate={
            dateFor.current === "end"
              ? startDate
              : moment().format("YYYY-MM-DD")
          }
        />

        <NewMedicationModal
          modalVisible={newMedicationModalVisible}
          setModalVisible={setNewMedicationModalVisible}
          setMedications={(medication) =>
            setMedications((prev) => [...prev, medication])
          }
        />

        <NewRestrictionModal
          modalVisible={newRestrictionModalVisible}
          setModalVisible={setNewRestrictionModalVisible}
          setRestrictions={(restriction) =>
            setRestrictions((prev) => [...prev, restriction])
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
          onPress={handleSubmit}
        />
      </View>

      {error && (
        <View className="flex-row gap-4">
          <Text className="text-danger">{error}</Text>
          <CustomButton
            iconLeft={icons.cancel}
            iconSize="size-4"
            onPress={() => setError("")}
          />
        </View>
      )}
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
            defaultValue={type ? type : ""}
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
              <View className="flex-row gap-2 items-center" key={index}>
                <MedicationItem medication={medication} />
                <CustomButton
                  iconLeft={icons.trash}
                  tintColor="#F75555"
                  iconSize="size-6"
                  onPress={() => {
                    handleDeleteMedication(
                      medication?.indexID || medication._id || ""
                    );
                  }}
                />
              </View>
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
              onPress={() => setNewRestrictionModalVisible(true)}
            />
          </View>

          <View className="gap-2">
            {restrictions.map((restriction, index) => (
              <View className="flex-row gap-2 items-center" key={index}>
                <RestrictionItem key={index} restriction={restriction} />

                <CustomButton
                  iconLeft={icons.trash}
                  tintColor="#F75555"
                  iconSize="size-6"
                  onPress={() => {
                    handleDeleteRestrictions(restriction);
                  }}
                />
              </View>
            ))}
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
    <View className="w-[92%]">
      <View className="flex-row p-4 justify-between items-center border border-primary-100 rounded-lg w-[92%]">
        <Text className=" font-rubik-medium text-lg text-black-100">
          {restriction || "Restriction name"}
        </Text>
      </View>
    </View>
  );
};

export default AddAftercare;
