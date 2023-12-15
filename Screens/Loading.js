import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import Video from "react-native-video";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import medicoachLogo from "../assets/medicoachLogo.mp4";

export default function Loading({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1);
  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  async function SetValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
    <ImageBackground
      source={require("../assets/medisplash.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          height: 720,
          width: 400,
          backgroundColor: "rgba(0,0,0,0)",
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate("BottomTabNavigation")}
      ></TouchableOpacity>
    </ImageBackground>
  );
}
