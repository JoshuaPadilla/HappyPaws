import { View, Text, Modal, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { MedicationForm } from "@/types/type";
import { formatDate, isValidMedication, showToast } from "@/lib/utils";
import CustomButton from "../custom_button";
import icons from "@/constants/icons";
import DatePickerModal from "../date_picker_modal";

interface NewRestrictionModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setRestrictions: (restriction: string) => void;
}

const NewRestrictionModal = ({
  modalVisible,
  setModalVisible,
  setRestrictions,
}: NewRestrictionModalProps) => {
  const [restriction, setRestriction] = useState<string>("");

  const handleAddRestriction = () => {
    if (restriction.length < 1) {
      showToast("error", "Please enter a restriction");
      return;
    }

    setRestrictions(restriction);
    setModalVisible(false);
    setRestriction("");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        <View className="bg-accent-100 w-full rounded-lg px-6 pt-6 pb-10 max-h-[70%] overflow-hidden">
          <Text className="font-rubik-bold text-xl text-black-100 mb-6 self-start">
            New Restriction
          </Text>

          <ScrollView
            contentContainerClassName="pb-[50px] gap-4"
            showsVerticalScrollIndicator={false}
          >
            {/* name */}
            <View className="gap-2">
              <Text className="font-rubik-medium text-md text-black-200">
                Restriction
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={restriction}
                  multiline
                  onChangeText={setRestriction}
                />
              </View>
            </View>

            <CustomButton
              title="Add"
              btnClassname="justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
              textClassname="text-white font-rubik-semibold text-lg"
              onPress={handleAddRestriction}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NewRestrictionModal;
