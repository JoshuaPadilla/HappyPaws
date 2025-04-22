import { ImageSourcePropType } from "react-native";

import back_green from "@/assets/icons/back_green.png";
import back_white from "@/assets/icons/back_white.png";
import next from "@/assets/icons/next.png";
import signin_cat from "@/assets/icons/signin_cat.png";
import signin_email from "@/assets/icons/signin_email.png";
import signin_google from "@/assets/icons/signin_google.png";
import signin_password from "@/assets/icons/signin_password.png";
import dropdown from "@/assets/icons/dropdown.png";
import bell_icon from "@/assets/icons/bell_icon.png";
import add_appointment from "@/assets/icons/add_appointment.png";
import bird_male from "@/assets/icons/pet_card_icons/bird_boy.png";
import bird_female from "@/assets/icons/pet_card_icons/bird_girl.png";
import dog_male from "@/assets/icons/pet_card_icons/dog_boy.png";
import dog_female from "@/assets/icons/pet_card_icons/dog_girl.png";
import cat_male from "@/assets/icons/pet_card_icons/cat_boy.png";
import cat_female from "@/assets/icons/pet_card_icons/cat_girl.png";
import nav_aftercare from "@/assets/icons/nav_icons/nav_aftercare.png";
import nav_appointment from "@/assets/icons/nav_icons/nav_appointment.png";
import nav_home from "@/assets/icons/nav_icons/nav_home.png";
import nav_pets from "@/assets/icons/nav_icons/nav_pets.png";
import nav_profile from "@/assets/icons/nav_icons/nav_profile.png";
import plus_icon from "@/assets/icons/plus_icon.png";
import caret_right from "@/assets/icons/caret_right.png";
import appointment_date from "@/assets/icons/appointment_date.png";
import appointment_notes from "@/assets/icons/appointment_notes.png";
import appointment_time from "@/assets/icons/appointment_time.png";
import appointment_type from "@/assets/icons/appointment_type.png";
import options_icon from "@/assets/icons/options_icon.png";

import profile_address from "@/assets/icons/profile_icons/profile_address.png";
import profile_appointments from "@/assets/icons/profile_icons/profile_appointments.png";
import profile_birthday from "@/assets/icons/profile_icons/profile_birthday.png";
import profile_gender from "@/assets/icons/profile_icons/profile_gender.png";
import profile_logout from "@/assets/icons/profile_icons/profile_logout.png";
import profile_phone from "@/assets/icons/profile_icons/profile_phone.png";
import profile_settings from "@/assets/icons/profile_icons/profile_settings.png";
import profile_userImgPlaceholder from "@/assets/icons/profile_icons/profile_userImgPlaceholder.png";
import profile_edit from "@/assets/icons/profile_icons/profile_edit.png";
import profile_detailsEdit from "@/assets/icons/profile_icons/profile_detailsEdit.png";
import edit_check from "@/assets/icons/edit_check.png";
import filter from "@/assets/icons/filter_icon.png";
import search_icon from "@/assets/icons/search_icon.png";
import pet_image_holder from "@/assets/icons/pet_image_holder.png";
import cancel from "@/assets/icons/cancel.png";
import appointment_status from "@/assets/icons/appointment_status.png";
import message_icon from "@/assets/icons/message_icon.png";

import view_pet_aftercare from "@/assets/icons/view_pets_icons/view_pet_aftercare.png";
import view_pet_medicalrecords from "@/assets/icons/view_pets_icons/view_pet_medicalrecords.png";
import view_pet_petdetails from "@/assets/icons/view_pets_icons/view_pet_petdetails.png";
import view_pet_vaccinehistory from "@/assets/icons/view_pets_icons/view_pet_vaccinehistory.png";
import trash from "@/assets/icons/trash.png";

import pet_age from "@/assets/icons/pet_details/pet_details_age.png";
import pet_breed from "@/assets/icons/pet_details/pet_details_breed.png";
import pet_gender from "@/assets/icons/pet_details/pet_details_gender.png";
import pet_specie from "@/assets/icons/pet_details/pet_details_specie.png";
import pet_name from "@/assets/icons/pet_details/pet_details_name.png";

import appointments_admin_icon from "@/assets/icons/admin_icons/appointments_icon.png";
import cancelled_app_icon from "@/assets/icons/admin_icons/cancelled_app_icon.png";
import clients_icon from "@/assets/icons/admin_icons/clients_icon.png";
import completed_app_icon from "@/assets/icons/admin_icons/completed_app_icon.png";
import insights_icon from "@/assets/icons/admin_icons/insights_icon.png";
import most_booked_icon from "@/assets/icons/admin_icons/most_booked_icon.png";
import overview_icon from "@/assets/icons/admin_icons/overview_icon.png";
import total_app_icon from "@/assets/icons/admin_icons/total_app_icon.png";
import refresh_icon from "@/assets/icons/admin_icons/refresh_icon.png";
import trend_down from "@/assets/icons/trend_down.png";
import trend_up from "@/assets/icons/trend_up.png";
import ask_icon from "@/assets/icons/ask_icon.png";

import client_active_appointments from "@/assets/icons/client_icons/client_active_appointments.png";
import client_appointment_history from "@/assets/icons/client_icons/client_appointment_history.png";
import client_details from "@/assets/icons/client_icons/client_details.png";
import client_pets from "@/assets/icons/client_icons/client_pets.png";

import service_checkup from "@/assets/icons/service_icons/service_checkup.png";
import service_grooming from "@/assets/icons/service_icons/service_grooming.png";
import service_dental from "@/assets/icons/service_icons/service_dental.png";
import service_vaccine from "@/assets/icons/service_icons/service_vaccine.png";

import status_cancelled from "@/assets/icons/status_icons/status_cancelled.png";
import status_completed from "@/assets/icons/status_icons/status_completed.png";
import status_confirmed from "@/assets/icons/status_icons/status_confirmed.png";
import status_resched from "@/assets/icons/status_icons/status_resched.png";
import arrow_up from "@/assets/icons/arrow_up.png";

interface IconsProps {
  arrow_up: ImageSourcePropType;
  ask_icon: ImageSourcePropType;
  message_icon: ImageSourcePropType;
  back_green: ImageSourcePropType;
  back_white: ImageSourcePropType;
  next: ImageSourcePropType;
  signin_cat: ImageSourcePropType;
  signin_email: ImageSourcePropType;
  signin_google: ImageSourcePropType;
  signin_password: ImageSourcePropType;
  dropdown: ImageSourcePropType;
  bell_icon: ImageSourcePropType;
  add_appointment: ImageSourcePropType;
  plus_icon: ImageSourcePropType;
  caret_right: ImageSourcePropType;
  edit_check: ImageSourcePropType;
  filter: ImageSourcePropType;
  search_icon: ImageSourcePropType;
  pet_image_holder: ImageSourcePropType;
  trash: ImageSourcePropType;
  appointment_date: ImageSourcePropType;
  appointment_notes: ImageSourcePropType;
  appointment_time: ImageSourcePropType;
  appointment_type: ImageSourcePropType;
  cancel: ImageSourcePropType;
  appointment_status: ImageSourcePropType;
  options_icon: ImageSourcePropType;
  trend_down: ImageSourcePropType;
  trend_up: ImageSourcePropType;
}

interface PetCardsIconsProps {
  bird_male: ImageSourcePropType;
  bird_female: ImageSourcePropType;
  dog_male: ImageSourcePropType;
  dog_female: ImageSourcePropType;
  cat_male: ImageSourcePropType;
  cat_female: ImageSourcePropType;
}

interface NavIconsProps {
  nav_aftercare: ImageSourcePropType;
  nav_appointment: ImageSourcePropType;
  nav_home: ImageSourcePropType;
  nav_pets: ImageSourcePropType;
  nav_profile: ImageSourcePropType;
}

interface ProfileIconsProps {
  profile_address: ImageSourcePropType;
  profile_appointments: ImageSourcePropType;
  profile_birthday: ImageSourcePropType;
  profile_gender: ImageSourcePropType;
  profile_logout: ImageSourcePropType;
  profile_phone: ImageSourcePropType;
  profile_settings: ImageSourcePropType;
  profile_userImgPlaceholder: ImageSourcePropType;
  profile_edit: ImageSourcePropType;
  profile_detailsEdit: ImageSourcePropType;
}

interface ViewPetIconsProps {
  view_pet_aftercare: ImageSourcePropType;
  view_pet_medicalrecords: ImageSourcePropType;
  view_pet_petdetails: ImageSourcePropType;
  view_pet_vaccinehistory: ImageSourcePropType;
}

interface PetDetailsIconsProps {
  pet_age: ImageSourcePropType;
  pet_breed: ImageSourcePropType;
  pet_gender: ImageSourcePropType;
  pet_specie: ImageSourcePropType;
  pet_name: ImageSourcePropType;
}

interface AdminIconsProps {
  appointments_admin_icon: ImageSourcePropType;
  cancelled_app_icon: ImageSourcePropType;
  clients_icon: ImageSourcePropType;
  completed_app_icon: ImageSourcePropType;
  insights_icon: ImageSourcePropType;
  most_booked_icon: ImageSourcePropType;
  overview_icon: ImageSourcePropType;
  total_app_icon: ImageSourcePropType;
  refresh_icon: ImageSourcePropType;
}

interface ClientIconsProps {
  client_active_appointments: ImageSourcePropType;
  client_appointment_history: ImageSourcePropType;
  client_details: ImageSourcePropType;
  client_pets: ImageSourcePropType;
}

interface ServiceIconsProps {
  service_checkup: ImageSourcePropType;
  service_grooming: ImageSourcePropType;
  service_dental: ImageSourcePropType;
  service_vaccine: ImageSourcePropType;
}

interface StatusIconsProps {
  status_cancelled: ImageSourcePropType;
  status_completed: ImageSourcePropType;
  status_confirmed: ImageSourcePropType;
  status_resched: ImageSourcePropType;
}

const icons: IconsProps = {
  arrow_up,
  ask_icon,
  message_icon,
  back_green,
  back_white,
  next,
  signin_cat,
  signin_email,
  signin_google,
  signin_password,
  dropdown,
  bell_icon,
  add_appointment,
  plus_icon,
  caret_right,
  edit_check,
  filter,
  search_icon,
  pet_image_holder,
  trash,
  appointment_date,
  appointment_notes,
  appointment_time,
  appointment_type,
  appointment_status,
  cancel,
  options_icon,
  trend_down,
  trend_up,
};

export const petCardsIcon: PetCardsIconsProps = {
  bird_male,
  bird_female,
  dog_male,
  dog_female,
  cat_male,
  cat_female,
};

export const navIcons: NavIconsProps = {
  nav_aftercare,
  nav_appointment,
  nav_home,
  nav_pets,
  nav_profile,
};

export const profileIcons: ProfileIconsProps = {
  profile_address,
  profile_appointments,
  profile_birthday,
  profile_gender,
  profile_logout,
  profile_phone,
  profile_settings,
  profile_userImgPlaceholder,
  profile_edit,
  profile_detailsEdit,
};

export const viewPetIcons: ViewPetIconsProps = {
  view_pet_aftercare,
  view_pet_medicalrecords,
  view_pet_petdetails,
  view_pet_vaccinehistory,
};

export const petDetailsIcons: PetDetailsIconsProps = {
  pet_age,
  pet_breed,
  pet_gender,
  pet_specie,
  pet_name,
};

export const adminIcons: AdminIconsProps = {
  appointments_admin_icon,
  cancelled_app_icon,
  clients_icon,
  completed_app_icon,
  insights_icon,
  most_booked_icon,
  overview_icon,
  total_app_icon,
  refresh_icon,
};

export const clientIcons: ClientIconsProps = {
  client_active_appointments,
  client_appointment_history,
  client_details,
  client_pets,
};

export const service_icons: ServiceIconsProps = {
  service_checkup,
  service_grooming,
  service_dental,
  service_vaccine,
};

export const status_icons: StatusIconsProps = {
  status_cancelled,
  status_completed,
  status_confirmed,
  status_resched,
};
export default icons;
