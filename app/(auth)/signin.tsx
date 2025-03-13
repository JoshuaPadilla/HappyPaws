import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { Link, Redirect } from "expo-router";
import InputField from "@/components/InputField";
import CustomButton from "@/components/custom_button";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";

const SignIn = () => {
  const { signin, authUser, isSigningIn } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignin = () => {
    if (!form.email || !form.password) {
      console.log("invalid credentials");
      return;
    }

    signin(form);
  };

  if (authUser) return <Redirect href="/(tabs)/home" />;

  return (
    <SafeAreaView className="flex flex-1">
      <StatusBar
        backgroundColor="#73C7C7"
        barStyle="dark-content"
        translucent={true}
      />

      <Spinner
        visible={isSigningIn}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-1 justify-start items-center bg-primary-100">
          {/* Headings */}

          <View className="w-full flex-row justify-between items-start h-[25%] p-8">
            <Link href="/welcome">
              <Image source={icons.back_white} className="size-8" />
            </Link>

            <Link href="/signup">
              <Text className="font-poppins-regular text-m text-background-100">
                Register
              </Text>
            </Link>

            <Image
              source={icons.signin_cat}
              className="size-40 absolute bottom-[-29] right-10 z-10"
            />
          </View>

          {/* form */}
          <View className="flex h-full w-full bg-background-100 rounded-[20px] p-8 gap-4">
            <Text className="font-rubik-bold text-2xl text-black-100">
              Sign In
            </Text>

            <InputField
              placeholder="email"
              icon={icons.signin_email}
              value={form.email}
              onChange={(value) =>
                setForm({ ...form, email: value.nativeEvent.text })
              }
            />
            <InputField
              secureTextEntry={true}
              placeholder="password"
              icon={icons.signin_password}
              value={form.password}
              onChange={(value) =>
                setForm({ ...form, password: value.nativeEvent.text })
              }
            />

            <View className="w-full flex-row justify-end">
              <Text className="font-rubik-regular text-m text-black-200">
                Forgot Password
              </Text>
            </View>

            <CustomButton
              title="Sign In"
              btnClassname="flex-row justify-center items-center flex bg-primary-100 p-4 rounded-xl"
              textClassname="w-fit text-accent-100 font-rubik-semibold text-xl "
              onPress={handleSignin}
            />

            <Text className="text-center font-rubik-medium text-black-100">
              Or
            </Text>

            <CustomButton
              iconLeft={icons.signin_google}
              title={"Continue with google"}
              btnClassname={
                "flex-row justify-center gap-4 p-4 border border-primary-100 rounded-xl"
              }
              textClassname={"font-rubik-medium text-black-200"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
