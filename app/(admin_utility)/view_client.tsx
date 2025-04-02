import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClient } from "@/store/useClient";
import Spinner from "react-native-loading-spinner-overlay";
import CustomButton from "@/components/custom_button";
import icons, { clientIcons, profileIcons } from "@/constants/icons";
import {
  goBack,
  goToClientActiveAppointments,
  goToClientAppointmentHistory,
  goToClientDetails,
  goToClientPets,
} from "@/lib/routerFunctions";
import { ImageAvatar } from "@/components/image_avatar";
import SettingsItem from "@/components/settingsItems";
import ConfirmationModal from "@/components/confirmationModal";

const ViewClient = () => {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const { isLoading, selectedClient, fetchSelectedClientPets, deleteClient } =
    useClient();

  const thisUser = selectedClient;

  const handleGoToClientPets = () => {
    fetchSelectedClientPets();
    goToClientPets();
  };

  const handleDeleteClient = () => {
    deleteClient();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-100 px-4 pt-8">
      <ConfirmationModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        onConfirm={handleDeleteClient}
        onCancel={() => setDeleteModalVisible(false)}
        title="Delete Pet"
        message="Are you sure you want to delete this user?"
        message2="Deleting this user also deletes all the related data"
        onCancelBtnClassname="w-[45%] bg-black-400 items-center py-2 rounded-lg"
        onConfirmBtnClassname="w-[45%] bg-danger items-center py-2 rounded-lg"
        icon={icons.trash}
      />

      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* headings */}
      <View className="flex-row justify-between items-center mb-6 gap-4">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          View Client
        </Text>

        <CustomButton
          iconLeft={icons.trash}
          iconSize="size-6"
          tintColor="#f75555"
          onPress={() => setDeleteModalVisible(true)}
        />
      </View>

      {!isLoading && thisUser && (
        // Profile Header
        <>
          <View className="flex items-center pb-4 border-b border-black-400 mb-8">
            <View className="mt-4">
              <ImageAvatar imageUrl={thisUser.profilePicture} size="32" />
            </View>

            <Text className="font-poppins-bold text-2xl mt-4 text-black-100">
              {thisUser.firstName || "Jhon"} {thisUser.lastName || "Doe"}
            </Text>

            <Text className="font-poppins-regular text-lg mt-2 text-black-200">
              {thisUser.email || "jhondoe@sample.com"}
            </Text>
          </View>

          {/* // Details */}
          <View className="py-4 px-6 gap-6 mb-6">
            <SettingsItem
              iconLeft={clientIcons.client_details}
              titleLeft="Details"
              iconRight={icons.caret_right}
              onPress={goToClientDetails}
            />

            <SettingsItem
              iconLeft={clientIcons.client_pets}
              titleLeft="Pets"
              iconRight={icons.caret_right}
              onPress={handleGoToClientPets}
            />

            <SettingsItem
              iconLeft={clientIcons.client_active_appointments}
              titleLeft="Active Appointments"
              iconRight={icons.caret_right}
              onPress={goToClientActiveAppointments}
            />

            <SettingsItem
              iconLeft={clientIcons.client_appointment_history}
              titleLeft="Appointment History"
              iconRight={icons.caret_right}
              onPress={goToClientAppointmentHistory}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewClient;
