import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  View,
  ScrollView,
} from "react-native";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import MealList from "./MealList";

export default function DietChart({ navigation }) {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function getMealData() {
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=938e60394e4d435ba65fe5e8139f02f2&timeFrame=day&targetCalories=" +
        calories
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
        // data.forEach((value) => console.log(value))
        console.log(data);
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
          backgroundColor: "rgba(109, 149, 222, 0.7)",
          height: "5%",
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
          Diet Chart
        </Text>
      </View>
      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{ flex: 1 /*justifyContent: "center",*/ }}
      >
        <ScrollView
          style={{
            height: 200,
            paddingLeft: 7,
          }}
        >
          <TouchableOpacity onPress={getMealData}>
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor: "#FFF",
              }}
            ></View>
          </TouchableOpacity>

          {mealData && <MealList mealList={mealData} />}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
