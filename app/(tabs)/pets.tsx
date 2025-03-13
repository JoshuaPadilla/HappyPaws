import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons from "@/constants/icons";
import SearchBar from "@/components/search_bar";
import PetCard from "@/components/pet_card";
import { usePetStore } from "@/store/usePets";
import { goBack, goToViewPet, goToAddPet } from "@/lib/routerFunctions";
import { Pet } from "@/types/type";

const Pets = () => {
  const { pets, setSelectedPet } = usePetStore();

  const [query, setQuery] = useState("");

  const handleSelecPet = (pet: Pet) => {
    setSelectedPet(pet);
    goToViewPet();
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      {/* Headings */}
      <View className="flex-row justify-between mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <CustomButton iconLeft={icons.bell_icon} iconSize="size-8" />
      </View>

      {/* Main */}

      <View className="items-center justify-center p-2">
        <SearchBar
          queryValue={query}
          setQuery={setQuery}
          placeholder="Search for pet"
          onSubmit={() => console.log("query")}
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
        {pets &&
          pets.map((pet, index) => (
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

        <CustomButton
          iconLeft={icons.plus_icon}
          tintColor="#1E1E1E"
          title="Add Pet"
          iconSize="size-10"
          btnClassname="p-3 w-[48%] h-72 flex-col bg-white rounded-2xl gap-2 justify-center items-center"
          textClassname="font-poppins-medium text-m text-black-100"
          onPress={() => goToAddPet()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;
