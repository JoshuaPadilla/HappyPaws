import { View, Text, ScrollView, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import SearchBar from "@/components/search_bar";
import PetCard from "@/components/pet_card";
import { usePetStore } from "@/store/usePets";
import { goBack, goToViewPet, goToAddPet } from "@/lib/routerFunctions";
import { Pet } from "@/types/type";
import Spinner from "react-native-loading-spinner-overlay";
import AskButton from "@/components/ask_button";

const Pets = () => {
  const { pets, setSelectedPet, isAdding } = usePetStore();

  const [query, setQuery] = useState("");

  const filteredPets = query
    ? pets.filter((pet) =>
        `${pet.petName} ${pet.petBreed} ${pet.petSpecie}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : pets;

  const handleSelecPet = (pet: Pet) => {
    setSelectedPet(pet);
    goToViewPet();
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      <AskButton />

      <Spinner
        visible={isAdding}
        textContent={"Adding..."}
        textStyle={{ color: "#FFF" }}
      />
      {/* Headings */}
      <View className="flex-row justify-between items-center mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <CustomButton
          iconLeft={icons.plus_icon}
          iconSize="size-6"
          tintColor="#73c7c7"
          onPress={goToAddPet}
        />
      </View>

      {/* Main */}

      <View className="items-center justify-center p-2 prima">
        <SearchBar
          queryValue={query}
          setQuery={setQuery}
          placeholder="Search for pet"
          onSubmit={() => {
            Keyboard.dismiss();
          }}
        />
      </View>

      {/* headings */}
      <View className="flex-row justify-between w-full mt-8 mb-4">
        <Text className="font-poppins-bold text-xl text-black-100">
          Your Pets
        </Text>
        <Text className="font-poppins-medium text-m text-primary-100">
          {pets.length} pets total
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
              onPress={() => handleSelecPet(pet)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;
