import { ActivityIndicator, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { viewPetIcons } from "@/constants/icons";
import {
  dismiss,
  goBack,
  goToAftercaresList,
  goToMedicalRecordListView,
  goToPetDetails,
  goToVaccineListView,
  goToViewAftercare,
} from "@/lib/routerFunctions";
import { usePetStore } from "@/store/usePets";
import { ImageAvatar } from "@/components/image_avatar";
import SettingsItem from "@/components/settingsItems";
import { useAftercareStore } from "@/store/useAftercare";
import ConfirmationModal from "@/components/confirmationModal";
import Spinner from "react-native-loading-spinner-overlay";
import { useAdminPets } from "@/store/useAdminPets";
import { useRouter } from "expo-router";

const ViewPet = () => {
  const { selectedPet, deletePet, isUpdating, isDeleting } = usePetStore();
  const { selectedPet: adminSelectedPet } = useAdminPets();

  const thisPet = selectedPet || adminSelectedPet;

  const { fecthPetAftercare } = useAftercareStore();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeletePet = () => {
    deletePet(thisPet?._id || "");
    setDeleteModalVisible(false);
    goBack();
  };

  const handleViewAftercares = () => {
    fecthPetAftercare(thisPet?._id || "");
    goToAftercaresList();
  };

  const handleViewMedicalRecords = () => {
    goToMedicalRecordListView();
  };

  const handleViewVaccineHistory = () => {
    goToVaccineListView();
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-100 px-6 py-8">
      <ConfirmationModal
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        onConfirm={handleDeletePet}
        onCancel={() => setDeleteModalVisible(false)}
        title="Delete Pet"
        message="Are you sure you want to delete this pet?"
        onCancelBtnClassname="w-[45%] bg-black-400 items-center py-2 rounded-lg"
        onConfirmBtnClassname="w-[45%] bg-primary-100 items-center py-2 rounded-lg"
        icon={icons.trash}
      />

      {/* Headings */}
      <CustomButton
        iconLeft={icons.back_green}
        iconSize="size-8"
        onPress={dismiss}
      />

      {/* Pet Image and name*/}
      <View className="flex items-center justify-center gap-4 p-8 border-b border-black-400">
        <ImageAvatar imageUrl={thisPet?.petImage} size="40" />
        <Text className="text-2xl font-bold">{thisPet?.petName}</Text>
      </View>

      {/* pet Details */}
      <View className="py-8 px-4 gap-6">
        <SettingsItem
          iconLeft={viewPetIcons.view_pet_petdetails}
          titleLeft="Pet Details"
          iconRight={icons.caret_right}
          onPress={() => goToPetDetails()}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_medicalrecords}
          titleLeft="Medical Records"
          iconRight={icons.caret_right}
          onPress={handleViewMedicalRecords}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_vaccinehistory}
          titleLeft="Vaccine History"
          iconRight={icons.caret_right}
          onPress={handleViewVaccineHistory}
        />

        <SettingsItem
          iconLeft={viewPetIcons.view_pet_aftercare}
          titleLeft="Aftercare"
          iconRight={icons.caret_right}
          onPress={handleViewAftercares}
        />
      </View>

      {/* Delete Pet */}
      <View className="px-8 mt-12">
        <CustomButton
          iconLeft={icons.trash}
          btnClassname="p-2 bg-danger-500 flex-row items-center justify-center gap-4 bg-danger rounded-lg"
          textClassname="font-rubik-medium text-xl text-black-100"
          iconSize="size-6"
          title="Delete Pet"
          onPress={() => setDeleteModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPet;
