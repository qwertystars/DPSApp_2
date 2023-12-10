import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function GlucoseGraph({ navigation }) {
  const [readings, setReadings] = useState([]);
  const [dates, setDates] = useState([]);
  const [exmpl, setExmpl] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);
  var data = ["e"];

  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  useEffect(() => {
    GetValueDB("glucoseReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setReadings(arr);
      console.log(arr);
    });

    GetValueDB("glucoseReadingsDates").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        var x = new Date(value);
        arr[index] = x;
        //console.log(x.getDate());
        data.push(x.getDate());
      });
      let y = [];
      for (var i = 0; i < arr.length; i++) {
        y.push(
          arr[i].getDate() +
            "/" +
            (arr[i].getMonth() + 1) +
            "/" +
            arr[i].getFullYear()
        );
      }
      console.log(y);
      setExmpl(y);
    });

    GetValueDB("PredictionSlope").then((value) => {
      if (value == "") {
        setSlope(0);
      } else {
        setSlope(parseFloat(value));
      }
    });

    GetValueDB("PredictionIntercept").then((value) => {
      if (value == "") {
        setIntercept(0);
      } else {
        setIntercept(parseFloat(value));
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
          Glucose History
        </Text>
      </View>
      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            padding: 25,
          }}
        >
          <View
            style={{
              width: (Dimensions.get("window").width * 95) / 100,
              height: (Dimensions.get("window").height * 5) / 100,
              backgroundColor: "rgba(0, 33, 59, 0.5)",
              alignSelf: "center",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingTop: 8,
                paddingLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Prediction(2 months later):{" "}
              </Text>
              <View style={{ paddingLeft: 80 }}>
                <Text
                  style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
                >
                  {(slope * 60 + intercept).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 50,
            backgroundColor: "rgba(0, 33, 59, 0.5)",
          }}
        >
          <View
            style={{
              paddingLeft: 28,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "rgba(180, 229, 255, 0.87)",
              }}
            >
              Glucose Level
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 138,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "rgba(180, 229, 255, 0.87)",
              }}
            >
              Date
            </Text>
          </View>
        </View>

        <ScrollView>
          {!isNaN(readings[0]) &&
            readings.map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      width: (Dimensions.get("window").width * 95) / 100,
                      height: (Dimensions.get("window").height * 5) / 100,
                      backgroundColor: "rgba(0, 33, 59, 0.5)",
                      alignSelf: "center",
                      borderRadius: 10,
                      flexDirection: "row",
                      //alignContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 8,
                        paddingLeft: 60,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "rgba(180, 229, 255, 0.87)",
                        }}
                      >
                        {value}
                      </Text>
                      <View style={{ paddingLeft: 180 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "rgba(180, 229, 255, 0.87)",
                          }}
                        >
                          {exmpl.length >= index ? exmpl[index] : "0"}
                        </Text>
                      </View>
                    </View>
                    {/* <Text>{value}</Text>
                  <Text>{exmpl.length >= index ? exmpl[index] : "0"}</Text> */}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
