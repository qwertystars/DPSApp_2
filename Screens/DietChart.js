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
import { useState, useEffect } from "react";
import MealList from "./MealList";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function DietChart({ navigation }) {
  let today = new Date();
  let mealResetDate = new Date();

  const mealResetDuration = 8;

  const [mealResetDay, setMealResetDay] = useState();
  const [remainingDays, setRemainingDays] = useState(mealResetDuration);

  const [mealData, setMealData] = useState(null);
  const [mealDataArray, setMealDataArray] = useState([]);
  const [calories, setCalories] = useState(2000);
  const [runAgain, setRunAgain] = useState("");

  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else {
      //console.log(result);
      return "";
    }
  };

  async function SetValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  //SecureStore.deleteItemAsync("WeeklyDiet");
  // SecureStore.deleteItemAsync("Day1");
  // SecureStore.deleteItemAsync("Day2");
  // SecureStore.deleteItemAsync("Day3");
  // SecureStore.deleteItemAsync("Day4");
  // SecureStore.deleteItemAsync("Day5");
  // SecureStore.deleteItemAsync("Day6");
  // SecureStore.deleteItemAsync("Day7");
  //SecureStore.deleteItemAsync("mealResetDate");

  function getMealData() {
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=938e60394e4d435ba65fe5e8139f02f2&timeFrame=week&targetCalories=" +
        calories
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data.week.friday);
        const temp = [
          data.week.friday,
          data.week.saturday,
          data.week.sunday,
          data.week.monday,
          data.week.tuesday,
          data.week.wednesday,
          data.week.thursday,
        ];
        // const temp2 = [
        //   JSON.stringify(data.week.friday),
        //   JSON.stringify(data.week.saturday),
        //   JSON.stringify(data.week.sunday),
        //   JSON.stringify(data.week.monday),
        //   JSON.stringify(data.week.tuesday),
        //   JSON.stringify(data.week.wednesday),
        //   JSON.stringify(data.week.thursday),
        // ];
        SetValueDB("Day1", JSON.stringify(data.week.friday));
        SetValueDB("Day2", JSON.stringify(data.week.saturday));
        SetValueDB("Day3", JSON.stringify(data.week.sunday));
        SetValueDB("Day4", JSON.stringify(data.week.monday));
        SetValueDB("Day5", JSON.stringify(data.week.tuesday));
        SetValueDB("Day6", JSON.stringify(data.week.wednesday));
        SetValueDB("Day7", JSON.stringify(data.week.thursday));
        ///console.log(JSON.stringify(data.week.friday));
        //SetValueDB("WeeklyDiet", temp2.join("~"));
        setMealDataArray(temp);
        // data.forEach((value) => console.log(value))
        //console.log(data.week.friday);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function ResetMeal() {
    mealResetDate.setDate(mealResetDate.getDate() + mealResetDuration);
    mealResetDate.setHours(0, 0, 0);
    setMealResetDay(mealResetDate);
    SetValueDB("mealResetDate", mealResetDate.toDateString());
    setRemainingDays(mealResetDuration - 1);
    getMealData();
  }

  useEffect(() => {
    GetValueDB("Day1").then((value) => {
      if (value == "") {
        console.log("empty day 1");
      } else {
        const e = JSON.parse(value);
        console.log("Day 1");
        //console.log(e));
        mealDataArray.push(e);
        //setMealDataArray([...mealDataArray, e]);
        //
      }
    });

    GetValueDB("Day2").then((value) => {
      if (value == "") {
        console.log("empty day 2");
      } else {
        const e = JSON.parse(value);
        console.log("Day 2");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day3").then((value) => {
      if (value == "") {
        console.log("empty day 3");
      } else {
        const e = JSON.parse(value);
        console.log("Day 3");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day4").then((value) => {
      if (value == "") {
        console.log("empty day 4");
      } else {
        const e = JSON.parse(value);
        console.log("Day 4");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day5").then((value) => {
      if (value == "") {
        console.log("empty day 5");
      } else {
        const e = JSON.parse(value);
        console.log("Day 5");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day6").then((value) => {
      if (value == "") {
        console.log("empty day 6");
      } else {
        const e = JSON.parse(value);
        console.log("Day 6");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day7").then((value) => {
      if (value == "") {
        console.log("empty day 7");
      } else {
        const e = JSON.parse(value);
        console.log("Day 7");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
        setRunAgain("No");
      }
    });

    // const interval = setInterval(() => {
    //   console.log(remainingDays);
    // }, 1000);
  }, []);

  useEffect(() => {
    today = new Date();
    //checkupDate = new Date();

    GetValueDB("mealResetDate").then((value) => {
      if (value == "") {
        ResetMeal();
      } else {
        mealResetDate = new Date(value);
        const r = Math.floor((mealResetDate - today) / (1000 * 60 * 60 * 24));
        if (r == 0) {
          ResetMeal();
        } else {
          setRemainingDays(r);
        }
      }
    });

    GetValueDB("Day1").then((value) => {
      if (value == "") {
        console.log("empty day 1");
      } else {
        const e = JSON.parse(value);
        console.log("Day 1");
        //console.log(e));
        mealDataArray.push(e);
        //setMealDataArray([...mealDataArray, e]);
        //
      }
    });

    GetValueDB("Day2").then((value) => {
      if (value == "") {
        console.log("empty day 2");
      } else {
        const e = JSON.parse(value);
        console.log("Day 2");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day3").then((value) => {
      if (value == "") {
        console.log("empty day 3");
      } else {
        const e = JSON.parse(value);
        console.log("Day 3");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day4").then((value) => {
      if (value == "") {
        console.log("empty day 4");
      } else {
        const e = JSON.parse(value);
        console.log("Day 4");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day5").then((value) => {
      if (value == "") {
        console.log("empty day 5");
      } else {
        const e = JSON.parse(value);
        console.log("Day 5");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day6").then((value) => {
      if (value == "") {
        console.log("empty day 6");
      } else {
        const e = JSON.parse(value);
        console.log("Day 6");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
      }
    });

    GetValueDB("Day7").then((value) => {
      if (value == "") {
        console.log("empty day 7");
      } else {
        const e = JSON.parse(value);
        console.log("Day 7");
        //console.log(e));
        //setMealDataArray([...mealDataArray, e]);
        mealDataArray.push(e);
        //setRunAgain("No");
      }
    });
  }, [runAgain]);

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
            paddingLeft: 1,
          }}
        >
          {mealDataArray.length == 0 && (
            <TouchableOpacity onPress={getMealData}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "#FFF",
                }}
              ></View>
            </TouchableOpacity>
          )}

          <View
            style={{
              paddingTop: 10,
            }}
          >
            <View
              style={{
                height: (Dimensions.get("window").height * 5) / 100,
                width: "100%",
                backgroundColor: "rgba(0, 33, 59, 0.5)",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: "center",
                  color: "rgba(180, 229, 255, 0.87)",
                }}
              >
                Today's Meal
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 10,
            }}
          >
            <View
              style={{
                height: 170,
                width: "100%",
                backgroundColor: "rgba(0, 33, 59, 0.5)",
              }}
            >
              <View
                style={{
                  paddingTop: 20,
                }}
              >
                {mealDataArray.length > 6 &&
                  remainingDays < mealResetDuration &&
                  remainingDays > 0 && (
                    <MealList mealData={mealDataArray[7 - remainingDays]} />
                  )}
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: 40,
            }}
          >
            <View
              style={{
                height: (Dimensions.get("window").height * 5) / 100,
                width: "100%",
                backgroundColor: "rgba(0, 33, 59, 0.5)",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  alignSelf: "center",
                  color: "rgba(180, 229, 255, 0.87)",
                }}
              >
                Week Plan
              </Text>
            </View>
          </View>

          {remainingDays < mealResetDuration &&
            remainingDays > 0 &&
            console.log(remainingDays)}

          {mealDataArray.length > 6 && (
            <View style={{ paddingTop: 10 }}>
              <View
                style={{
                  paddingTop: 20,
                }}
              >
                <MealList mealData={mealDataArray[0]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[1]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[2]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[3]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[4]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[5]} />
              </View>
              <View
                style={{
                  paddingTop: 40,
                }}
              >
                <MealList mealData={mealDataArray[6]} />
              </View>
            </View>
          )}

          <View
            style={{
              height: 60,
            }}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
