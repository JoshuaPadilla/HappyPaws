import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Link, Redirect } from "expo-router";
import icons from "@/constants/icons";
import CustomButton from "@/components/custom_button";
import Dropdown from "@/components/dropdown";
import { days, genderDropdownData, months, years } from "@/constants";
import { useAuthStore } from "@/store/useAuth";
import { checkForm, checkSamePassword } from "@/lib/utils";
import Spinner from "react-native-loading-spinner-overlay";

const SignUp = () => {
  const { signup, isSigningUp, authUser } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    gender: "",
    birthday: { date: "", month: "", year: "" },
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);

  const handleSignup = () => {
    if (!checkForm(form)) {
      console.log("all fields are required");
      return;
    }

    if (!checkSamePassword(form.password, form.confirmPassword)) {
      console.log("passwords are not the same");
      return;
    }

    signup(form);
  };

  if (authUser?.role === "user") return <Redirect href="/(tabs)/home" />;
  if (authUser?.role === "admin") return <Redirect href="/(admin)/overview" />;

  return (
    <SafeAreaView className="flex flex-1 mb-2">
      <StatusBar
        backgroundColor="#73C7C7"
        barStyle="dark-content"
        translucent={true}
      />

      <Spinner
        visible={isSigningUp}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-1 justify-start items-center bg-primary-100">
          {/* Headings */}

          <View className="w-full flex-row justify-between items-start h-[10%] p-8">
            {step === 2 && (
              <Pressable
                onPress={() => {
                  setStep((step) => (step -= 1));
                }}
              >
                <Image
                  source={icons.back_white}
                  className="size-8"
                  resizeMode="contain"
                />
              </Pressable>
            )}

            {step === 1 && (
              <Link href="/welcome">
                <Image
                  source={icons.back_white}
                  className="size-8"
                  resizeMode="contain"
                />
              </Link>
            )}

            <Link href="/signin" asChild>
              <Text className="font-poppins-regular text-m text-background-100">
                Login
              </Text>
            </Link>
          </View>

          {/* form */}
          <View className="flex h-full w-full bg-background-100 rounded-[20px] p-8 gap-4">
            {/* heading */}
            <Text className="font-rubik-bold text-2xl text-black-100">
              Create an account
            </Text>

            {/* step 1 */}
            {step === 1 && (
              <View className="w-full flex gap-2">
                <Text className="font-rubik-semibold text-lg text-black-100">
                  Step 1: Basic Information
                </Text>

                {/* Input fields */}
                <KeyboardAvoidingView className="flex gap-2 pb-4">
                  {/* first name and last name */}
                  <View className="flex-row justify-between">
                    <View className="flex w-[48%] gap-1">
                      <Text className="text-black-200 font-rubik-regular text-m">
                        First Name
                      </Text>

                      <TextInput
                        value={form.firstName}
                        onChange={(value) =>
                          setForm({
                            ...form,
                            firstName: value.nativeEvent.text,
                          })
                        }
                        className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                      />
                    </View>

                    <View className="flex w-[48%] gap-1">
                      <Text className="text-black-200 font-rubik-regular text-m">
                        Last Name
                      </Text>

                      <TextInput
                        value={form.lastName}
                        onChange={(value) =>
                          setForm({
                            ...form,
                            lastName: value.nativeEvent.text,
                          })
                        }
                        className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                      />
                    </View>
                  </View>

                  {/* Address */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Address
                    </Text>

                    <TextInput
                      value={form.address}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          address: value.nativeEvent.text,
                        })
                      }
                      className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                    />
                  </View>

                  {/* Contact Number */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Contact Number
                    </Text>

                    <TextInput
                      inputMode="tel"
                      value={form.phone}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          phone: value.nativeEvent.text,
                        })
                      }
                      className="border rounded-xl border-primary-100 p-2 h-[50px] font-poppins-medium text-lg"
                    />
                  </View>

                  {/* Gender Dropdown */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Gender
                    </Text>

                    <Dropdown
                      data={genderDropdownData}
                      onSelect={(selectedItem: any) =>
                        setForm({ ...form, gender: selectedItem })
                      }
                      iconLeft={icons.dropdown}
                      title="select gender"
                      height={genderDropdownData.length * 68}
                    />
                  </View>

                  {/* Birthday */}
                  <View className="flex gap-1">
                    <Text className="mb-2 text-black-200 font-rubik-regular text-m">
                      Birthday
                    </Text>

                    {/* Datepicker container */}
                    <View className="flex-row justify-between">
                      {/* month */}
                      <View className="w-[32%]">
                        <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                          month
                        </Text>
                        <Dropdown
                          data={months}
                          onSelect={(selectedItem) =>
                            setForm({
                              ...form,
                              birthday: {
                                ...form.birthday,
                                month: selectedItem,
                              },
                            })
                          }
                          title="month"
                          iconLeft={icons.dropdown}
                          height={250}
                        />
                      </View>

                      {/* Day */}
                      <View className="w-[32%]">
                        <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                          day
                        </Text>
                        <Dropdown
                          data={days}
                          onSelect={(selectedItem) =>
                            setForm({
                              ...form,
                              birthday: {
                                ...form.birthday,
                                date: selectedItem,
                              },
                            })
                          }
                          title="day"
                          iconLeft={icons.dropdown}
                          height={250}
                        />
                      </View>

                      {/* year */}
                      <View className="w-[32%]">
                        <Text className="mb-1 text-black-300 font-rubik-regular text-m">
                          year
                        </Text>
                        <Dropdown
                          data={years}
                          onSelect={(selectedItem) =>
                            setForm({
                              ...form,
                              birthday: {
                                ...form.birthday,
                                year: selectedItem,
                              },
                            })
                          }
                          title="year"
                          iconLeft={icons.dropdown}
                          height={250}
                        />
                      </View>
                    </View>

                    {/* Date pickers */}
                    <View className="flex-row"></View>
                  </View>
                </KeyboardAvoidingView>

                <View className="flex-row justify-end">
                  <CustomButton
                    btnClassname="p-4 bg-primary-100 w-[150px] rounded-xl flex items-center"
                    title="next"
                    textClassname="font-rubik-semibold text-accent-100 text-lg"
                    onPress={() => {
                      setStep((step) => (step += 1));
                    }}
                  />
                </View>
              </View>
            )}

            {/* step 2 */}
            {step === 2 && (
              <View className="w-full flex gap-2">
                <Text className="font-rubik-semibold text-lg text-black-100">
                  Step 2: Login Information
                </Text>

                {/* Input fields */}
                <KeyboardAvoidingView className="flex gap-2 pb-4">
                  {/* Email */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Email
                    </Text>

                    <TextInput
                      value={form.email}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          email: value.nativeEvent.text,
                        })
                      }
                      className="border rounded-xl border-primary-100 py-2 px-4 h-[50px] font-poppins-medium text-lg"
                      inputMode="email"
                    />
                  </View>

                  {/* Password */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Password
                    </Text>

                    <TextInput
                      value={form.password}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          password: value.nativeEvent.text,
                        })
                      }
                      className=" border rounded-xl border-primary-100 py-2 px-4 h-[50px] font-poppins-medium text-lg"
                      secureTextEntry={true}
                    />
                  </View>

                  {/* Confirm Password */}
                  <View className="flex gap-1">
                    <Text className="text-black-200 font-rubik-regular text-m">
                      Confirm Password
                    </Text>

                    <TextInput
                      value={form.confirmPassword}
                      onChange={(value) =>
                        setForm({
                          ...form,
                          confirmPassword: value.nativeEvent.text,
                        })
                      }
                      className=" border rounded-xl border-primary-100 py-2 px-4 h-[50px] font-poppins-medium text-lg"
                      secureTextEntry={true}
                    />
                  </View>
                </KeyboardAvoidingView>

                <View className="flex-row justify-end">
                  <CustomButton
                    btnClassname="p-4 bg-primary-100 w-full rounded-xl flex items-center"
                    title="sign in"
                    textClassname="font-rubik-semibold text-accent-100 text-lg"
                    onPress={handleSignup}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
