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

export default function BloodPressureGraph({ navigation }) {
  const [bpReadings, setBPReadings] = useState([]);
  const [bpdReadings, setBPDReadings] = useState([]);
  const [dates, setDates] = useState([]);
  const [exmpl, setExmpl] = useState([1, 2, 3, 4, 5, 6, 7]);
  var data = ["e"];

  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  useEffect(() => {
    GetValueDB("bpReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setBPReadings(arr);
      console.log(arr);
    });

    GetValueDB("bpdReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setBPDReadings(arr);
      console.log(arr);
    });

    GetValueDB("bpReadingsDates").then((value) => {
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
          Blood Pressure History
        </Text>
      </View>

      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <View style={{ paddingTop: 20 }}>
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
                Systolic
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 48,
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(180, 229, 255, 0.87)",
                }}
              >
                Diastolic
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 98,
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
        </View>

        <ScrollView>
          {!isNaN(bpReadings[0]) &&
            bpReadings.map((value, index) => {
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
                        paddingLeft: 40,
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
                      <View style={{ paddingLeft: 50 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "rgba(180, 229, 255, 0.87)",
                          }}
                        >
                          {bpdReadings.length >= index
                            ? bpdReadings[index]
                            : "0"}
                        </Text>
                      </View>
                      <View style={{ paddingLeft: 50 }}>
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
