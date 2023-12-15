import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as SecureStore from "expo-secure-store";

export default function TimerSettings({ navigation }) {
  const [glucoseTimer, setGlucoseTimer] = useState(2);
  const [bpTimer, setBPTimer] = useState(2);

  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  async function SetValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    GetValueDB("checkupDate").then((value) => {
      const today = new Date();
      today.setHours(0, 0, 0);
      const checkupDay = new Date(value);
      checkupDay.setHours(0, 0, 0);
      const diff = checkupDay - today;
      console.log(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setGlucoseTimer(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    });
  }, []);

  function ResetReminder() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + glucoseTimer);
    SetValueDB("checkupDate", newDate.toDateString());
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: "rgba(93, 152, 255, 0.83)",
      }}
    >
      <View
        style={{
          marginHorizontal: 0,
          flexDirection: "row",
          justifyContent: "center",
          // backgroundColor: "rgba(109, 149, 222, 0.7)",
          // height: "5%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={"rgba(0, 17, 43, 0.83)"}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "rgba(0, 17, 43, 0.9)",
          }}
        >
          Timer Settings
        </Text>
      </View>

      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
              paddingHorizontal: 8,
              paddingTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}>
              Change Glucose Reminder Timer (Default: 7)
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 17,
                  color: "rgba(170, 219, 255, 0.87)",
                  paddingTop: 5,
                  paddingLeft: 11,
                  justifyContent: "flex-start",
                }}
              >
                {glucoseTimer - 1 + " Days"}
              </Text>
              <View style={{ position: "absolute", paddingLeft: 65 }}>
                <Slider
                  style={{
                    width: (Dimensions.get("window").width * 70) / 100,
                    height: 35,
                  }}
                  minimumValue={2}
                  maximumValue={91}
                  value={5}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => {
                    setGlucoseTimer(value);
                  }}
                  step={1}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}>
              Blood Pressure Checkup Reminder
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 17,
                  color: "rgba(170, 219, 255, 0.87)",
                  paddingTop: 5,
                  paddingLeft: 11,
                  justifyContent: "flex-start",
                }}
              >
                {bpTimer - 1 + " Days"}
              </Text>
              <View style={{ position: "absolute", paddingLeft: 40 }}>
                <Slider
                  style={{
                    width: (Dimensions.get("window").width * 70) / 100,
                    height: 35,
                  }}
                  minimumValue={2}
                  maximumValue={91}
                  value={5}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) => {
                    setBPTimer(value);
                  }}
                  step={1}
                />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={ResetReminder}
          style={{
            paddingLeft: 10,
            paddingTop: 15,
          }}
        >
          <View
            style={{
              height: 40,
              width: 200,
              backgroundColor: "#FFF",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                paddingTop: 10,
                fontSize: 15,
              }}
            >
              RESET REMINDER
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
