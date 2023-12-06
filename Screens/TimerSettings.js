import {
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
export default function TimerSettings({ navigation }) {
  const [glucoseTimer, setGlucoseTimer] = useState(2);
  const [bpTimer, setBPTimer] = useState(2);

  function RecipeNStuff() {
    console.log("RECIPE GEN");
    // fetch(
    //   "https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=1"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=938e60394e4d435ba65fe5e8139f02f2&timeFrame=week&cuisine=Indian&diet=Vegetarian&targetCalories=" +
        2000
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //setMealData(data.week.friday);
        // const temp = [
        //   data.week.friday,
        //   data.week.saturday,
        //   data.week.sunday,
        //   data.week.monday,
        //   data.week.tuesday,
        //   data.week.wednesday,
        //   data.week.thursday,
        // ];

        // setTodaysMeal(data.week.friday);

        // SetValueDB("Day1", JSON.stringify(data.week.friday));
        // SetValueDB("Day2", JSON.stringify(data.week.saturday));
        // SetValueDB("Day3", JSON.stringify(data.week.sunday));
        // SetValueDB("Day4", JSON.stringify(data.week.monday));
        // SetValueDB("Day5", JSON.stringify(data.week.tuesday));
        // SetValueDB("Day6", JSON.stringify(data.week.wednesday));
        // SetValueDB("Day7", JSON.stringify(data.week.thursday));
      })
      .catch(() => {
        console.log("error");
      });
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
            }}
          >
            <Text style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}>
              Glucose Checkup Reminder
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
                {glucoseTimer - 1}
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
                {bpTimer - 1}
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

        <TouchableOpacity onPress={RecipeNStuff}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: "#FFF",
            }}
          ></View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
