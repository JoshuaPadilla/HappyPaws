import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import moment from "moment";
import DateCalendar from "@/components/date_calendar";
import Toggle from "@/components/toggle";
import CustomButton from "@/components/custom_button";
import TimeSlotList from "@/components/timeslot_list";
import TabbedFilter from "@/components/tabbed_filter";
import AppointmentCard from "@/components/appointment_card";
import { Appointment, AppointmentForm } from "@/types/type";
import { router } from "expo-router";
import { useAppointmentsStore } from "@/store/useAppointments";
import NewAppointmentModal from "@/components/new_appointment_modal";
import { usePetStore } from "@/store/usePets";
import { FILTER_CATEGORY } from "@/constants";
import { findPetById } from "@/lib/utils";
import { goToViewAppointment } from "@/lib/routerFunctions";
const Appointments = () => {
  const { appointments, setSelectedAppointment } = useAppointmentsStore();
  const { pets } = usePetStore();
  const currDate = moment().format("MMMM, YYYY");
  const [all, setAll] = useState(false);
  const [currFilter, setCurrFilter] = useState("All");
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [viewAppointmentModalVisible, setViewAppointmentModalVisible] =
    useState(false);

  const handleAddAppointment = () => {
    if (pets.length === 0) {
      Alert.alert("Please add a pet first");
      return;
    }
    setAppointmentModalVisible(true);
  };

  const handleViewAppointment = (appointment: AppointmentForm) => {
    setSelectedAppointment(appointment);
    goToViewAppointment();
  };

  return (
    <SafeAreaView className="flex-1 flex-col  bg-accent-100 px-6 py-8">
      <NewAppointmentModal
        modalVisible={appointmentModalVisible}
        setModalVisible={setAppointmentModalVisible}
      />

      {/* Headings */}
      <View className="flex-row w-full justify-between items-center mb-8">
        <CustomButton
          iconLeft={icons.back_green}
          onPress={router.back}
          iconSize="size-8"
        />

        <Toggle
          trueValue="Today"
          falseValue="All"
          onPress={() => setAll((all) => !all)}
        />
      </View>

      {/* All (All appointments) */}
      {all && (
        // Headding
        <View>
          <View className="flex-row justify-between items-end mb-6">
            <Text className="font-poppins-semibold text-lg">{`Appointment: ${appointments.length}`}</Text>

            <CustomButton
              btnClassname="flex-row items-center justify-center gap-2 bg-primary-100 px-4 py-2 rounded-xl"
              textClassname="font-poppins-semibold text-accent-100 h-[20px]"
              iconLeft={icons.plus_icon}
              title="New Appointment"
              iconSize="size-4"
              onPress={handleAddAppointment}
            />
          </View>

          {/* Filter */}
          <TabbedFilter
            filterCategory={FILTER_CATEGORY}
            value={currFilter}
            setValue={setCurrFilter}
          />

          {/* Appointment List */}
          <ScrollView contentContainerClassName="gap-2 pb-[120px]">
            {appointments.map((appointment: AppointmentForm) => (
              <AppointmentCard
                appointment={appointment}
                key={appointment._id}
                onPress={() => handleViewAppointment(appointment)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* not all (today list) */}
      {!all && (
        <View>
          {/* Heading */}
          <View>
            <View className="flex-row justify-between items-end mb-4">
              <Text className="font-poppins-bold text-2xl">{currDate}</Text>

              <CustomButton
                btnClassname=" flex-row items-center justify-center gap-2 bg-primary-100 px-4 py-2 rounded-xl"
                textClassname="font-poppins-semibold text-accent-100 h-[20px]"
                iconLeft={icons.plus_icon}
                title="New Appointment"
                iconSize="size-4"
                onPress={handleAddAppointment}
              />

              {/* Filters */}
            </View>

            <View className="mb-4">
              <DateCalendar />
            </View>
          </View>

          {/* List */}

          <TimeSlotList appointmentList={appointments} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Appointments;
