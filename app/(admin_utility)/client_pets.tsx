import { View, Text, Keyboard, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import { goBack, goToViewPet, goToViewPetAdmin } from "@/lib/routerFunctions";
import { useClient } from "@/store/useClient";
import SearchBar from "@/components/search_bar";
import Spinner from "react-native-loading-spinner-overlay";
import PetCard from "@/components/pet_card";
import { useAdminPets } from "@/store/useAdminPets";
import { Pet } from "@/types/type";

const ClientPets = () => {
  const { selectedClient, isLoading } = useClient();
  const { setSelectedPet } = useAdminPets();
  const pets = selectedClient?.pets || [];

  const [query, setQuery] = useState("");

  const filteredPets = query
    ? pets.filter((pet) =>
        `${pet.petName} ${pet.petBreed} ${pet.petSpecie}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : pets;

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    goToViewPet();
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* Headings */}
      <View className="flex-row gap-4 items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <Text className="font-poppins-semibold text-black-100 text-lg">
          {selectedClient?.firstName}'s Pets
        </Text>
      </View>

      {/* Search bar */}
      <View className="items-center justify-center p-2 prima">
        <SearchBar
          queryValue={query}
          setQuery={setQuery}
          placeholder="Search for pet"
          onSubmit={Keyboard.dismiss}
        />
      </View>

      {/* pet list */}
      <View className="flex-row justify-end w-full mt-8 mb-4">
        <Text className="font-poppins-medium text-m text-primary-100">
          {filteredPets.length} pets total
        </Text>
      </View>

      <ScrollView contentContainerClassName="flex-row flex-wrap justify-between gap-2 pb-[70px] ">
        {filteredPets &&
          filteredPets.map((pet, index) => (
            <PetCard
              petBreed={pet.petBreed}
              petGender={pet.petGender}
              petName={pet.petName}
              petSpecie={pet.petSpecie}
              petImage={pet.petImage}
              key={index}
              onPress={() => handleSelectPet(pet)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientPets;
