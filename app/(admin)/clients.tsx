import {
  View,
  Text,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import icons, { adminIcons } from "@/constants/icons";
import SearchBar from "@/components/search_bar";
import { useClient } from "@/store/useClient";
import ClientCard from "@/components/admin_components/client_card";
import { goBack, goToAddClient } from "@/lib/routerFunctions";
import { useAuthStore } from "@/store/useAuth";

const Clients = () => {
  const { fetchClients, clients, isLoading } = useClient();

  const [query, setQuery] = useState("");

  const filteredClients = query
    ? clients.filter((client) =>
        `${client.address} ${client.email} ${client.firstName} ${client.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : clients;

  const handleRefresh = () => {
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <SafeAreaView className="flex-1 flex-col bg-accent-100 px-6 py-8">
      {/* Headings */}
      <View className="flex-row justify-between mb-6">
        <CustomButton
          iconLeft={icons.back_green}
          iconSize="size-8"
          onPress={goBack}
        />

        <CustomButton
          iconLeft={icons.plus_icon}
          iconSize="size-6"
          tintColor="#73C7C7"
          onPress={goToAddClient}
        />
      </View>

      {/* Main */}

      <View className="items-center justify-center p-2">
        <SearchBar
          queryValue={query}
          setQuery={setQuery}
          placeholder="Search for client"
          onSubmit={() => {
            Keyboard.dismiss();
          }}
        />
      </View>

      {/* headings */}
      <View className="flex-row justify-between w-full mt-8 mb-4">
        <Text className="font-poppins-bold text-xl text-black-100">
          {filteredClients.length} clients
        </Text>

        <CustomButton
          iconLeft={adminIcons.refresh_icon}
          onPress={handleRefresh}
        />
      </View>

      <ScrollView contentContainerClassName="flex-col justify-between gap-2 pb-[70px] p-2 items-center w-full">
        {isLoading ? (
          <ActivityIndicator color={"#73C7C7"} className="pt-8" />
        ) : filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard client={client} key={client._id} />
          ))
        ) : (
          <Text>No Result</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clients;
