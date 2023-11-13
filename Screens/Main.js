import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { SimpleLinearRegression } from "ml-regression-simple-linear";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function Main({ navigation }) {
  //Simple addition of dates goes to next month

  const today = new Date();
  //today.setDate(today.getDate() + 3);
  let checkupDate = new Date();

  //console.log((temp1 - temp2) / (1000 * 60 * 60 * 24));
  // console.log(today.toDateString());
  // const newDate = new Date(today.toDateString());
  // console.log(newDate.toDateString());

  const checkupDuration = 20;

  const [checkupDay, setCheckupDay] = useState();
  const [remainingDays, setRemainingDays] = useState(checkupDuration);

  const [showAlert, setShowAlert] = useState(true);

  const getValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  async function setValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  //SecureStore.deleteItemAsync("checkupDate");

  useEffect(() => {
    getValueDB("checkupDate").then((value) => {
      if (value == "") {
        checkupDate.setDate(checkupDate.getDate() + checkupDuration);
        setCheckupDay(checkupDate);
        setValueDB("checkupDate", checkupDate.toDateString());
        setRemainingDays(checkupDuration);
      } else {
        checkupDate = new Date(value);
        setRemainingDays(
          Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24))
        );
      }
    });
  }, []);

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
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          Home
        </Text>
      </View>

      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          //justifyContent: "center",
        }}
      >
        <View style={{ paddingTop: 10, display: showAlert ? "flex" : "none" }}>
          <View
            style={{
              height: 50,
              width: "98%",
              backgroundColor: "#rgba(217,87,92,0.8)",
              borderRadius: 15,
              borderColor: "#e9454b",
              borderWidth: 3.5,
              alignSelf: "center",
            }}
          >
            <Text style={{}}>Get checkup done today!!</Text>

            <TouchableOpacity
              style={{
                position: "absolute",
                paddingTop: 5,
                paddingLeft: 305,
              }}
              onPress={() => setShowAlert(false)}
            >
              <View
                style={{
                  height: 30,
                  width: 80,
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                }}
              >
                <Text>DONE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={(Dimensions.get("window").width * 80) / 100} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            paddingTop: 20,
          }}
        /> */}
        <Text
          style={{
            fontSize: 50,
            alignSelf: "center",
            color: "rgba(170, 219, 255, 0.87)",
          }}
        >
          {remainingDays}
        </Text>
        <Text
          style={{
            fontSize: 25,
            alignSelf: "center",
            color: "rgba(170, 219, 255, 0.87)",
          }}
        >
          Days till next checkup
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
}
