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
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

export default function Login({ navigation }) {
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
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: "rgba(93, 152, 255, 0.83)",
      }}
    >
      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            display: currentPage == 1 ? "flex" : "none",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
             <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  opacity: 0.7,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
                imageStyle= {{ borderRadius: 40,}}
             >
                <Text
                  style={{
                    fontSize:28,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: "rgba(0, 0, 79, 1)",
                    alignSelf: "center",
                  }}
                > Welcome To</Text>
                <Text
                  style={{
                    fontSize:48,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: "rgba(0, 0, 159, 1)",
                    alignSelf: "center",
                  }}
                > MediCoach!</Text>
                  <TouchableOpacity
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: "rgba(255,255,255,1)",
                    }}
                    onPress={() => {
                      navigation.navigate("BottomTabNavigation");
                    }}
                  ></TouchableOpacity>
            </ImageBackground>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
