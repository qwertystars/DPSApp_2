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
  //const [calories, setCalories] = useState(2000);
  const [runAgain, setRunAgain] = useState("");

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

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

  function getMealData(calories) {
    const caloriM = parseInt(calories / 3);
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=938e60394e4d435ba65fe5e8139f02f2&includeNutrition=false&cuisine=Indian&minCalories=" +
        parseInt(caloriM / 2) +
        "&maxCalories=" +
        caloriM +
        "&number=21"
    )
      .then((response) => response.json())
      .then((value) => {
        const arr1json = [value.results[0], value.results[1], value.results[2]];
        const arr2json = [value.results[3], value.results[4], value.results[5]];
        const arr3json = [value.results[6], value.results[7], value.results[8]];
        const arr4json = [
          value.results[9],
          value.results[10],
          value.results[11],
        ];
        const arr5json = [
          value.results[12],
          value.results[13],
          value.results[14],
        ];
        const arr6json = [
          value.results[15],
          value.results[16],
          value.results[17],
        ];
        const arr7json = [
          value.results[19],
          value.results[19],
          value.results[20],
        ];

        const temp = [
          arr1json,
          arr2json,
          arr3json,
          arr4json,
          arr5json,
          arr6json,
          arr7json,
        ];

        const arr1 = [
          JSON.stringify(value.results[0]),
          JSON.stringify(value.results[1]),
          JSON.stringify(value.results[2]),
        ];
        const arr2 = [
          JSON.stringify(value.results[3]),
          JSON.stringify(value.results[4]),
          JSON.stringify(value.results[5]),
        ];
        const arr3 = [
          JSON.stringify(value.results[6]),
          JSON.stringify(value.results[7]),
          JSON.stringify(value.results[8]),
        ];
        const arr4 = [
          JSON.stringify(value.results[9]),
          JSON.stringify(value.results[10]),
          JSON.stringify(value.results[11]),
        ];
        const arr5 = [
          JSON.stringify(value.results[12]),
          JSON.stringify(value.results[13]),
          JSON.stringify(value.results[14]),
        ];
        const arr6 = [
          JSON.stringify(value.results[15]),
          JSON.stringify(value.results[16]),
          JSON.stringify(value.results[17]),
        ];
        const arr7 = [
          JSON.stringify(value.results[18]),
          JSON.stringify(value.results[19]),
          JSON.stringify(value.results[20]),
        ];

        console.log(arr1);
        console.log(arr2);
        console.log(arr3);
        console.log(arr4);
        console.log(arr5);
        console.log(arr6);
        console.log(arr7);

        SetValueDB("Day1", arr1.join("~"));
        SetValueDB("Day2", arr2.join("~"));
        SetValueDB("Day3", arr3.join("~"));
        SetValueDB("Day4", arr4.join("~"));
        SetValueDB("Day5", arr5.join("~"));
        SetValueDB("Day6", arr6.join("~"));
        SetValueDB("Day7", arr7.join("~"));

        setMealDataArray(temp);
      });
    // fetch(
    //   "https://api.spoonacular.com/mealplanner/generate?apiKey=938e60394e4d435ba65fe5e8139f02f2&timeFrame=week&diet=Primal&targetCalories=" +
    //     calories
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMealData(data.week.friday);
    //     const temp = [
    //       data.week.friday,
    //       data.week.saturday,
    //       data.week.sunday,
    //       data.week.monday,
    //       data.week.tuesday,
    //       data.week.wednesday,
    //       data.week.thursday,
    //     ];
    //     // const temp2 = [
    //     //   JSON.stringify(data.week.friday),
    //     //   JSON.stringify(data.week.saturday),
    //     //   JSON.stringify(data.week.sunday),
    //     //   JSON.stringify(data.week.monday),
    //     //   JSON.stringify(data.week.tuesday),
    //     //   JSON.stringify(data.week.wednesday),
    //     //   JSON.stringify(data.week.thursday),
    //     // ];
    //     SetValueDB("Day1", JSON.stringify(data.week.friday));
    //     SetValueDB("Day2", JSON.stringify(data.week.saturday));
    //     SetValueDB("Day3", JSON.stringify(data.week.sunday));
    //     SetValueDB("Day4", JSON.stringify(data.week.monday));
    //     SetValueDB("Day5", JSON.stringify(data.week.tuesday));
    //     SetValueDB("Day6", JSON.stringify(data.week.wednesday));
    //     SetValueDB("Day7", JSON.stringify(data.week.thursday));
    //     ///console.log(JSON.stringify(data.week.friday));
    //     //SetValueDB("WeeklyDiet", temp2.join("~"));
    //     setMealDataArray(temp);
    //     // data.forEach((value) => console.log(value))
    //     //console.log(data.week.friday);
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
  }

  function ResetMeal() {
    console.log("RESETTING MEAL DATA");

    mealResetDate.setDate(mealResetDate.getDate() + mealResetDuration);
    mealResetDate.setHours(0, 0, 0);
    setMealResetDay(mealResetDate);
    SetValueDB("mealResetDate", mealResetDate.toDateString());
    setRemainingDays(mealResetDuration - 1);

    if (height > 0) {
      const bmi = weight / ((height / 100) * (height / 100));
      let calsNeeded = 2000;

      if (gender == "MALE") {
        calsNeeded = 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (gender == "FEMALE") {
        calsNeeded = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      if (bmi > 24) {
        calsNeeded += 500;
      } else if (bmi < 19) {
        calsNeeded += 1000;
      } else {
        calsNeeded += 700;
      }
      calsNeeded = parseInt(calsNeeded);

      console.log(calsNeeded);

      getMealData(calsNeeded);
    } else {
      getMealData(2000);
    }
  }

  useEffect(() => {
    GetValueDB("Day1").then((value) => {
      if (value == "") {
        console.log("empty day 1");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 1");
        //console.log(e));
        mealDataArray.push(mels);
        //setMealDataArray([...mealDataArray, e]);
        //
      }
    });

    GetValueDB("Day2").then((value) => {
      if (value == "") {
        console.log("empty day 2");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 2");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day3").then((value) => {
      if (value == "") {
        console.log("empty day 3");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 3");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day4").then((value) => {
      if (value == "") {
        console.log("empty day 4");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 4");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day5").then((value) => {
      if (value == "") {
        console.log("empty day 5");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 5");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day6").then((value) => {
      if (value == "") {
        console.log("empty day 6");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 6");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day7").then((value) => {
      if (value == "") {
        console.log("empty day 7");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 7");
        //console.log(e));
        mealDataArray.push(mels);
        setRunAgain("No");
      }
    });

    GetValueDB("Weight").then((value) => {
      if (value != "") {
        setWeight(parseInt(weight));
      }
    });

    GetValueDB("Height").then((value) => {
      if (value != "") {
        setHeight(parseInt(value));
      }
    });

    GetValueDB("Age").then((value) => {
      if (value != "") {
        setAge(parseInt(value));
      }
    });

    GetValueDB("Gender").then((value) => {
      if (value != "") {
        setGender(value);
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
        console.log(r + " REM DAES");
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
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 1");
        //console.log(e));
        mealDataArray.push(mels);
        //setMealDataArray([...mealDataArray, e]);
        //
      }
    });

    GetValueDB("Day2").then((value) => {
      if (value == "") {
        console.log("empty day 2");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 2");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day3").then((value) => {
      if (value == "") {
        console.log("empty day 3");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 3");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day4").then((value) => {
      if (value == "") {
        console.log("empty day 4");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 4");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day5").then((value) => {
      if (value == "") {
        console.log("empty day 5");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 5");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day6").then((value) => {
      if (value == "") {
        console.log("empty day 6");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 6");
        //console.log(e));
        mealDataArray.push(mels);
      }
    });

    GetValueDB("Day7").then((value) => {
      if (value == "") {
        console.log("empty day 7");
      } else {
        const mealsStr = value.split("~");
        const e = "EASPORTS";
        const m1 = JSON.parse(mealsStr[0]);
        const m2 = JSON.parse(mealsStr[1]);
        const m3 = JSON.parse(mealsStr[2]);
        const mels = [m1, m2, m3];

        console.log("Day 7");
        //console.log(e));
        mealDataArray.push(mels);
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
          {/* {mealDataArray.length == 0 && (
            <TouchableOpacity onPress={getMealData}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "#FFF",
                }}
              ></View>
            </TouchableOpacity>
          )} */}

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
                flexDirection: "row",
                height: 30,
                width: "100%",
                backgroundColor: "rgba(0, 33, 59, 0.5)",
                justifyContent: "space-between",
                paddingLeft: 30,
                paddingRight: 40,
              }}
            >
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Breakfast
              </Text>
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Lunch
              </Text>
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Dinner
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

          <View
            style={{
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 30,
                width: "100%",
                backgroundColor: "rgba(0, 33, 59, 0.5)",
                justifyContent: "space-between",
                paddingLeft: 30,
                paddingRight: 40,
              }}
            >
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Breakfast
              </Text>
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Lunch
              </Text>
              <Text
                style={{ fontSize: 18, color: "rgba(180, 229, 255, 0.87)" }}
              >
                Dinner
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
                  paddingTop: 0,
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
