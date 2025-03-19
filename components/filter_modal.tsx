import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "./custom_button";
import icons from "@/constants/icons";
import { useAppointmentFilterStore } from "@/store/useFilter";
import moment from "moment";
import CalendarModal from "./calendar_modal";

interface FilterModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const FilterModal = ({ modalVisible, setModalVisible }: FilterModalProps) => {
  const { startDate, endDate, setStartDate, setEndDate, resetFilters } =
    useAppointmentFilterStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  const handleDateSelect = (date: string) => {
    if (!selectedDate) {
      setSelectedDate(date);
      setStartDate(date);
    } else {
      if (moment(date).isBefore(selectedDate)) {
        setStartDate(date);
        setEndDate(selectedDate);
      } else {
        setStartDate(selectedDate);
        setEndDate(date);
      }
      setSelectedDate(null);
    }
  };

  const handleReset = () => {
    resetFilters();
    setSelectedDate(null);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable className="flex-1 bg-black-100/80 overflow-hidden">
        <View className="w-full h-4/5 bg-accent-100 absolute bottom-0 rounded-t-3xl px-6 py-8">
          {/* headings */}
          <View className="flex-row justify-between items-center mb-8">
            <CustomButton
              iconLeft={icons.back_green}
              iconSize="size-8"
              onPress={() => setModalVisible(false)}
            />

            <Text className="font-rubik-semibold text-2xl text-black-100">
              Filter
            </Text>

            <CustomButton
              title="Reset"
              onPress={handleReset}
              textClassname="font-rubik-semibold text-primary-100"
            />
          </View>

          {/* filters */}
          <View>
            <View>
              <Text className="font-rubik-semibold text-xl text-black-100 mb-4">
                Date Range
              </Text>

              <View className="flex-row border">
                <View>
                  <Text>Start Date:</Text>
                  <CustomButton
                    title="Select Date"
                    onPress={() => setCalendarModalVisible(true)}
                    iconRight={icons.dropdown}
                    iconSize="size-6"
                    tintColor="#73C7C7"
                    btnClassname="flex-row justify-between gap-2"
                  />

                  <CalendarModal
                    modalVisible={calendarModalVisible}
                    setModalVisible={setCalendarModalVisible}
                    selectedDate={today}
                    setSelectedDate={setSelectedDate}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
