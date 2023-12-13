import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { SimpleLinearRegression } from "ml-regression-simple-linear";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { SelectList } from "react-native-dropdown-select-list";
import MealList from "./MealList";

//L KHAO

//Timer: Feedback of user
//use firebase

//Riddhi working on this:

//separate inouts in separate pages on first login
//make first time open sequence
//interactive first login page

//the question set should be asked after ailments are entered

//Me workin on this:
//on home page give today's info like diet for today, work for today, medications

//add notification system for workout plan
export default function Main({ navigation }) {
  let today = new Date();
  let checkupDate = new Date();
  let bpCheckupDate = new Date();
  let mealResetDate = new Date();

  const checkupDuration = 2; //Originally:
  const bpCheckupDuration = 3; //Originally: 91
  const mealResetDuration = 8;

  const [mealResetDay, setMealResetDay] = useState();
  const [mealResetRemainingDays, setMealResetRemainingDays] =
    useState(mealResetDuration);

  const [allYears, setAllYears] = useState([]);

  const [checkupDay, setCheckupDay] = useState();
  const [bpCheckupDay, setBPCheckupDay] = useState();
  const [remainingDays, setRemainingDays] = useState(checkupDuration);
  const [bpCheckupRemainingDays, setBPCheckupRemainingDays] = useState();
  const [dateReading, setDateReading] = useState();
  const [monthReading, setMonthReading] = useState();
  const [yearReading, setYearReading] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const [readingContainder, setReadingContainer] = useState(false);
  const [readingContainerPrev, setReadingContainerPrev] = useState(false);
  const [bpContainer, setBPContainer] = useState(false);
  const [bpContainerPrev, setBPContainerPrev] = useState(false);
  const [timerContainer, setTimerContainer] = useState(false);
  const [newReading, setNewReading] = useState(0);
  const [newReading2, setNewReading2] = useState(0);
  const [lowSugarContainer, setLowSugarContainer] = useState(false);
  const [diabetesContainer, setDiabetesContainer] = useState(false);
  const [prediabetesContainer, setPrediabetesContainer] = useState(false);
  const [bpWarningTitle, setBPWarningTitle] = useState("");
  const [bpWarningText, setBPWarningText] = useState("");
  const [bpWarningContainer, setBPWarningContainer] = useState(false);

  const [glucoseReadings, setGlucoseReadings] = useState([0]);
  const [glucoseReadingsDates, setGlucoseReadingsDates] = useState([0]);
  const [glucoseDatePassed, setGlucoseDatePassed] = useState([0]);
  const [glucosePrediction, setGlucosePrediction] = useState([0]);

  const [bpReadings, setBPReadings] = useState([0]);
  const [bpdReadings, setBPDReadings] = useState([0]);
  const [bpReadingsDates, setBPReadingsDates] = useState([0]);
  const [bpDatePassed, setBPDatePassed] = useState([0]);

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const [runAgain, setRunAgain] = useState("");

  const [todaysMeal, setTodaysMeal] = useState();

  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  async function SetValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  function ResetCheckupDuration() {
    checkupDate.setDate(checkupDate.getDate() + checkupDuration);
    checkupDate.setHours(0, 0, 0);
    setCheckupDay(checkupDate);
    SetValueDB("checkupDate", checkupDate.toDateString());
    setRemainingDays(checkupDuration - 1);
  }

  function ResetBPCheckupDuration() {
    bpCheckupDate.setDate(bpCheckupDate.getDate() + bpCheckupDuration);
    bpCheckupDate.setHours(0, 0, 0);
    setBPCheckupDay(bpCheckupDate);
    SetValueDB("bpCheckupDate", bpCheckupDate.toDateString());
    setBPCheckupRemainingDays(bpCheckupDuration - 1);
  }

  function GlucoseDateUpdation() {
    const temp = [];
    for (var i = 0; i < glucoseReadingsDates.length; i++) {
      var daysPassed =
        (glucoseReadingsDates[i] - glucoseReadingsDates[0]) /
        (1000 * 60 * 60 * 24);
      temp.push(daysPassed);
    }
    while (glucoseDatePassed.length > 0) {
      glucoseDatePassed.pop();
    }
    temp.forEach((value) => {
      glucoseDatePassed.push(value);
    });
    console.log(glucoseDatePassed);
  }

  function Prediction() {
    if (
      glucoseDatePassed.length == glucoseReadings.length &&
      glucoseReadings.length > 0
    ) {
      const regression = new SimpleLinearRegression(
        glucoseDatePassed,
        glucoseReadings
      );

      const temp = [];
      for (var i = 0; i < glucoseReadings.length; i++) {
        var e = glucoseDatePassed[glucoseDatePassed.length - 1];
        temp.push(regression.predict(glucoseDatePassed[i]));
      }
      console.log(temp + " pedictions");

      setGlucosePrediction(temp);

      if (!isNaN(temp[0])) {
        SetValueDB("PredictionSlope", regression.slope.toString());
        SetValueDB("PredictionIntercept", regression.intercept.toString());
      }
    }
    console.log("Predictiopn function executed");
    console.log(glucosePrediction + " Nan u dumb");
    console.log(isNaN(glucosePrediction[1]));
    console.log(glucosePrediction + " Nan u dumb");
  }

  function getMealData(calories) {
    const caloriM = parseInt(calories / 3);
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=938e60394e4d435ba65fe5e8139f02f2&includeNutrition=false&cuisine=Indian&minCalories=" +
        parseInt(caloriM / 2) +
        "&maxCalories=" +
        caloriM +
        "&number=21&excludeIngredients=pork,beef,lamb"
    )
      .then((response) => response.json())
      .then((value) => {
        const arr1json = [value.results[0], value.results[1], value.results[2]];
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

        setTodaysMeal(arr1json);

        SetValueDB("Day1", arr1.join("~"));
        SetValueDB("Day2", arr2.join("~"));
        SetValueDB("Day3", arr3.join("~"));
        SetValueDB("Day4", arr4.join("~"));
        SetValueDB("Day5", arr5.join("~"));
        SetValueDB("Day6", arr6.join("~"));
        SetValueDB("Day7", arr7.join("~"));
      });
    // fetch(
    //   "https://api.spoonacular.com/mealplanner/generate?apiKey=938e60394e4d435ba65fe5e8139f02f2&diet=Primal&timeFrame=week&targetCalories=" +
    //     calories
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //setMealData(data.week.friday);
    //     const temp = [
    //       data.week.friday,
    //       data.week.saturday,
    //       data.week.sunday,
    //       data.week.monday,
    //       data.week.tuesday,
    //       data.week.wednesday,
    //       data.week.thursday,
    //     ];

    //     setTodaysMeal(data.week.friday);

    //     SetValueDB("Day1", JSON.stringify(data.week.friday));
    //     SetValueDB("Day2", JSON.stringify(data.week.saturday));
    //     SetValueDB("Day3", JSON.stringify(data.week.sunday));
    //     SetValueDB("Day4", JSON.stringify(data.week.monday));
    //     SetValueDB("Day5", JSON.stringify(data.week.tuesday));
    //     SetValueDB("Day6", JSON.stringify(data.week.wednesday));
    //     SetValueDB("Day7", JSON.stringify(data.week.thursday));
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
  }

  //SecureStore.deleteItemAsync("mealResetDate");

  function ResetMeal() {
    console.log("RESETTING MEAL");

    mealResetDate.setDate(mealResetDate.getDate() + mealResetDuration);
    mealResetDate.setHours(0, 0, 0);
    setMealResetDay(mealResetDate);
    SetValueDB("mealResetDate", mealResetDate.toDateString());
    setMealResetRemainingDays(mealResetDuration - 1);

    console.log(height + " AMAR HEIGHT");

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
      console.log("2000 u dombu");
      getMealData(2000);
    }
  }

  function GetCheckupDate(value) {
    today = new Date();
    checkupDate = new Date(value);
    setRemainingDays(Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24)));
  }

  //SecureStore.deleteItemAsync("checkupDate");
  // SecureStore.deleteItemAsync("glucoseReadings");
  // SecureStore.deleteItemAsync("glucoseReadingsDates");
  // SecureStore.deleteItemAsync("bpReadings");
  // SecureStore.deleteItemAsync("bpdReadings");
  // SecureStore.deleteItemAsync("bpReadingsDates");

  //SecureStore.deleteItemAsync("firstLogin");

  useEffect(() => {
    today = new Date();
    checkupDate = new Date();

    GetValueDB("firstLogin").then((value) => {
      if (value == "") {
        SetValueDB("firstLogin", "LoggedIn");
        navigation.navigate("Login");
      }
    });

    for (var i = 0; i < allYears.length; i++) {
      allYears.pop();
    }

    for (var i = today.getFullYear(); i >= 1970; i--) {
      allYears.push(i);
    }

    GetValueDB("checkupDate").then((value) => {
      if (value == "") {
        ResetCheckupDuration();
      } else {
        GetCheckupDate(value);
        // checkupDate = new Date(value);
        // setRemainingDays(
        //   Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24))
        // );
      }
    });

    GetValueDB("bpCheckupDate").then((value) => {
      if (value == "") {
        ResetBPCheckupDuration();
      } else {
        bpCheckupDate = new Date(value);
        setBPCheckupRemainingDays(
          Math.floor((bpCheckupDate - today) / (1000 * 60 * 60 * 24))
        );
        if (Math.floor((bpCheckupDate - today) / (1000 * 60 * 60 * 24)) <= 0) {
          ResetBPCheckupDuration();
        }
        console.log(
          Math.floor((bpCheckupDate - today) / (1000 * 60 * 60 * 24))
        );
      }
    });

    GetValueDB("glucoseReadings").then((value) => {
      if (value == "") {
        console.log("empty hehheheheh");
        SetValueDB("glucoseReadings", "");
        setGlucoseReadings([0]);
      } else {
        let arr = value.split(",");
        console.log(arr);
        arr.forEach((value, index) => {
          arr[index] = parseInt(value);
        });
        console.log(arr);
        setGlucoseReadings(arr);
      }
    });

    GetValueDB("bpReadings").then((value) => {
      if (value == "") {
        console.log("empty hehheheheh BP");
        SetValueDB("bpReadings", "");
        setBPReadings([0]);
      } else {
        let arr = value.split(",");
        console.log(arr);
        arr.forEach((value, index) => {
          arr[index] = parseInt(value);
        });
        console.log(arr);
        setBPReadings(arr);
      }
    });

    GetValueDB("bpdReadings").then((value) => {
      if (value == "") {
        console.log("empty hehheheheh BPD");
        SetValueDB("bpdReadings", "");
        setBPDReadings([0]);
      } else {
        let arr = value.split(",");
        console.log(arr);
        arr.forEach((value, index) => {
          arr[index] = parseInt(value);
        });
        console.log(arr);
        setBPDReadings(arr);
      }
    });

    GetValueDB("glucoseReadingsDates").then((value) => {
      if (value == "") {
        console.log("ompty hehheheheh");
        SetValueDB("glucoseReadingsDates", "");
        setGlucoseReadingsDates([0]);
      } else {
        let arr = value.split(",");
        const temp = [];
        arr.forEach((value) => {
          let d = new Date(value);
          temp.push(d);
        });
        setGlucoseReadingsDates(temp);
      }
      //e
    });

    GetValueDB("bpReadingsDates").then((value) => {
      if (value == "") {
        console.log("ompty hehheheheh");
        SetValueDB("bpReadingsDates", "");
        setBPReadingsDates([0]);
      } else {
        let arr = value.split(",");
        const temp = [];
        arr.forEach((value) => {
          let d = new Date(value);
          temp.push(d);
        });
        setBPReadingsDates(temp);
      }
      //e
    });

    GlucoseDateUpdation();
    Prediction();
    //e

    GetValueDB("mealResetDate").then((value) => {
      if (value == "") {
        ResetMeal();
      } else {
        mealResetDate = new Date(value);
        const r = Math.floor((mealResetDate - today) / (1000 * 60 * 60 * 24));
        console.log(r + "Meal Reset Remaining Days");
        if (r == 0) {
          ResetMeal();
        } else {
          setMealResetRemainingDays(r);
        }
      }
    });

    GetValueDB("Weight").then((value) => {
      if (value != "") {
        setWeight(parseInt(weight));
      } else {
        SetValueDB("Weight", "70");
        setWeight(60);
      }
    });

    GetValueDB("Height").then((value) => {
      if (value != "") {
        setHeight(parseInt(value));
      } else {
        SetValueDB("Height", "170");
        setHeight(170);
      }
    });

    GetValueDB("Age").then((value) => {
      if (value != "") {
        setAge(parseInt(value));
      } else {
        SetValueDB("Age", "35");
        setAge(35);
      }
    });

    GetValueDB("Gender").then((value) => {
      if (value != "") {
        setGender(value);
        setRunAgain("No");
      } else {
        SetValueDB("Gender", "MALE");
        setGender("MALE");
        setRunAgain("No");
      }
    });

    if (mealResetRemainingDays > 0 && mealResetRemainingDays < 8) {
      console.log(mealResetRemainingDays + " UGOCHUKWU");
      GetValueDB("Day" + (7 - mealResetRemainingDays + 1)).then((value) => {
        if (value == "") {
          console.log("empty meal");
        } else {
          const mealsStr = value.split("~");
          const e = "EASPORTS";
          const m1 = JSON.parse(mealsStr[0]);
          const m2 = JSON.parse(mealsStr[1]);
          const m3 = JSON.parse(mealsStr[2]);
          console.log("Meal Today");
          const mels = [m1, m2, m3];
          //console.log(e));
          //setMealDataArray([...mealDataArray, e]);
          setTodaysMeal(mels);
          //setRunAgain("No");
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("CALURI CALURI ONEK");
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

      console.log(calsNeeded + " CALORIES NEEDED");
    }
  }, [runAgain]);

  useEffect(() => {
    if (remainingDays <= 0) {
      setShowAlert(true);
    }
  }, [remainingDays]);

  useEffect(() => {
    if (mealResetRemainingDays > 0 && mealResetRemainingDays < 8) {
      console.log(mealResetRemainingDays + " UGOCHUKWU");
      GetValueDB("Day" + (7 - mealResetRemainingDays + 1)).then((value) => {
        if (value == "") {
          console.log("empty meal");
        } else {
          const mealsStr = value.split("~");
          const e = "EASPORTS";
          const m1 = JSON.parse(mealsStr[0]);
          const m2 = JSON.parse(mealsStr[1]);
          const m3 = JSON.parse(mealsStr[2]);
          const mels = [m1, m2, m3];

          console.log(m2);

          console.log("Meal Today");
          //console.log(e));
          //setMealDataArray([...mealDataArray, e]);
          setTodaysMeal(mels);
          //setRunAgain("No");
        }
      });
    }

    //SetValueDB("glucoseReadings", glucoseReadings.join(","));
  }, [mealResetRemainingDays]);

  useEffect(() => {
    GlucoseDateUpdation();
    Prediction();

    // console.log(glucoseReadings + " heeh boii");
    // console.log(glucoseDatePassed + " eheh buoyy");
  }, [glucoseReadingsDates]);

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
            //paddingLeft: "43%",
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
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            paddingTop: 180,
            display: readingContainder == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 25) / 100,
              width: "70%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              New Reading
            </Text>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Blood Glucose Reading (mmol/mol)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                paddingTop: 20,
                width: "100%",
                //alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "50%",
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  setReadingContainer(false);

                  if (newReading < 6 || newReading > 152) {
                    {
                      Alert.alert(
                        "Invalid glucose level",
                        "Invalid glucose level entered"
                      );
                    }
                  } else {
                    if (
                      glucoseReadings.length == 1 &&
                      glucoseReadings[0] == 0
                    ) {
                      glucoseReadings[0] = newReading;
                    } else {
                      glucoseReadings.push(newReading);
                    }
                    SetValueDB(
                      "glucoseReadings",
                      glucoseReadings.join(",")
                    ).then(() => console.log("Added"));
                    today = new Date();
                    if (
                      glucoseReadingsDates.length == 1 &&
                      glucoseReadingsDates[0] == 0
                    ) {
                      glucoseReadingsDates[0] = today;
                    } else {
                      glucoseReadingsDates.push(today);
                    }
                    SetValueDB(
                      "glucoseReadingsDates",
                      glucoseReadingsDates.join(",")
                    ).then(() =>
                      console.log(glucoseReadingsDates + " mina eh eh")
                    );

                    const temp = [];
                    for (var i = 0; i < glucoseReadingsDates.length; i++) {
                      var daysPassed =
                        (glucoseReadingsDates[i] - glucoseReadingsDates[0]) /
                        (1000 * 60 * 60 * 24);
                      temp.push(daysPassed);
                    }
                    while (glucoseDatePassed.length > 0) {
                      glucoseDatePassed.pop();
                    }
                    temp.forEach((value) => {
                      glucoseDatePassed.push(value);
                    });
                    console.log(glucoseDatePassed + " lolol");

                    GlucoseDateUpdation();

                    Prediction();

                    console.log(glucoseReadings + "r");
                  }

                  if (newReading < 21) {
                    setLowSugarContainer(true);
                  } else if (newReading > 39 && newReading < 48) {
                    setPrediabetesContainer(true);
                  } else if (newReading > 48) {
                    setDiabetesContainer(true);
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "10%",
                    paddingVertical: 5,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  Confirm
                </Text>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={{
                    //paddingLeft: "90%",
                    //paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                    paddingTop: 8,
                    paddingLeft: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            paddingTop: 120,
            display: readingContainerPrev == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 58) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              New Reading
            </Text>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Blood Glucose Reading (mmol/mol)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.7
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                paddingTop: 10,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Date
            </Text>

            <View
              style={{
                flexDirection: "row",
                //alignContent: "center",
              }}
            >
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList
                  data={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                  ]}
                  setSelected={setDateReading}
                />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  setSelected={setMonthReading}
                />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList data={allYears} setSelected={setYearReading} />
              </View>
            </View>

            <View
              style={{
                paddingTop: 20,
                width: "100%",
                //alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "50%",
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  let d = new Date(yearReading, monthReading - 1, dateReading);
                  if (d < today) {
                    setReadingContainerPrev(false);

                    if (newReading < 6 || newReading > 152) {
                      {
                        Alert.alert(
                          "Invalid glucose level",
                          "Invalid glucose level entered"
                        );
                      }
                    } else {
                      if (
                        glucoseReadings.length == 1 &&
                        glucoseReadings[0] == 0
                      ) {
                        glucoseReadings[0] = newReading;
                      } else {
                        glucoseReadings.push(newReading);
                      }

                      if (
                        glucoseReadingsDates.length == 1 &&
                        glucoseReadingsDates[0] == 0
                      ) {
                        glucoseReadingsDates[0] = d;
                      } else {
                        glucoseReadingsDates.push(d);

                        const temp = [];
                        glucoseReadingsDates.forEach((value) => {
                          temp.push(value);
                        });

                        glucoseReadingsDates.sort((a, b) => {
                          return a - b;
                        });

                        const tempGlcRd = [];

                        glucoseReadingsDates.forEach((value, index) => {
                          var i = temp.indexOf(value);
                          tempGlcRd.push(glucoseReadings[i]);
                          console.log(tempGlcRd);
                        });

                        for (var i = 0; i < glucoseReadings.length; i++) {
                          glucoseReadings[i] = tempGlcRd[i];
                        }
                        // setGlucoseReadings(tempGlcRd);
                        // console.log(glucoseReadings + " ///>>>");
                      }

                      SetValueDB(
                        "glucoseReadings",
                        glucoseReadings.join(",")
                      ).then(() => console.log(glucoseReadings + " zamina"));

                      SetValueDB(
                        "glucoseReadingsDates",
                        glucoseReadingsDates.join(",")
                      ).then(() =>
                        console.log(glucoseReadingsDates + " mina eh eh")
                      );

                      GlucoseDateUpdation();

                      Prediction();

                      console.log(glucoseReadingsDates);
                      console.log(glucoseReadings + "r");
                    }

                    if (newReading < 21) {
                      setLowSugarContainer(true);
                    } else if (newReading > 39 && newReading < 48) {
                      setPrediabetesContainer(true);
                    } else if (newReading > 48) {
                      setDiabetesContainer(true);
                    }
                  } else {
                    {
                      Alert.alert("Invalid date", "Invalid date entered");
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "10%",
                    paddingVertical: 5,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  Confirm
                </Text>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={{
                    //paddingLeft: "90%",
                    //paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                    paddingTop: 8,
                    paddingLeft: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            paddingTop: 180,
            display: bpContainer == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 38) / 100,
              width: "80%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              New Reading
            </Text>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Systolic Blood Pressure Reading (mmHg)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Diastolic Blood Pressure Reading (mmHg)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading2(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <View
              style={{
                paddingTop: 20,
                width: "100%",
                //alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "50%",
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  setBPContainer(false);

                  if (
                    newReading < 50 ||
                    newReading > 190 ||
                    newReading2 > 120 ||
                    newReading2 < 30
                  ) {
                    {
                      Alert.alert(
                        "Invalid blood pressure",
                        "Invalid blood pressure entered"
                      );
                    }
                  } else {
                    if (bpReadings.length == 1 && bpReadings[0] == 0) {
                      bpReadings[0] = newReading;
                    } else {
                      bpReadings.push(newReading);
                    }
                    SetValueDB("bpReadings", bpReadings.join(",")).then(() =>
                      console.log("Added")
                    );

                    if (bpdReadings.length == 1 && bpdReadings[0] == 0) {
                      bpdReadings[0] = newReading2;
                    } else {
                      bpdReadings.push(newReading2);
                    }
                    SetValueDB("bpdReadings", bpdReadings.join(",")).then(() =>
                      console.log("Added")
                    );

                    today = new Date();
                    if (
                      bpReadingsDates.length == 1 &&
                      bpReadingsDates[0] == 0
                    ) {
                      bpReadingsDates[0] = today;
                    } else {
                      bpReadingsDates.push(today);
                    }
                    SetValueDB(
                      "bpReadingsDates",
                      bpReadingsDates.join(",")
                    ).then(() => console.log(bpReadingsDates + " mina eh eh"));

                    console.log(bpReadings + "r");

                    if (age > 2 && age < 18) {
                      if (newReading > 120 || newReading2 > 80) {
                        setBPWarningTitle("High Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is higher than it should be. You might have hypertension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      } else if (newReading < 90 && newReading2 < 50) {
                        setBPWarningTitle("Low Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is lower than it should be. You might have hypotension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      }
                    } else if (age >= 19 && age < 40) {
                      if (newReading > 135 || newReading2 > 80) {
                        setBPWarningTitle("High Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is higher than it should be. You might have hypertension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      } else if (newReading < 95 && newReading2 < 60) {
                        setBPWarningTitle("Low Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is lower than it should be. You might have hypotension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      }
                    } else if (age >= 41) {
                      if (newReading > 145 || newReading2 > 90) {
                        setBPWarningTitle("High Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is higher than it should be. You might have hypertension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      } else if (newReading < 95 && newReading2 < 70) {
                        setBPWarningTitle("Low Blood Pressure Warning");
                        setBPWarningText(
                          "The entered blood pressure is lower than it should be. You might have hypotension. Consider consulting a doctor."
                        );
                        setBPWarningContainer(true);
                      }
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "10%",
                    paddingVertical: 5,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  Confirm
                </Text>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={{
                    //paddingLeft: "90%",
                    //paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                    paddingTop: 8,
                    paddingLeft: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 5,
            paddingTop: 80,
            display: bpContainerPrev == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 68) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              New Reading
            </Text>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Systolic Blood Pressure Reading (mmHg)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                paddingTop: 20,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Diastolic Blood Pressure Reading (mmHg)
            </Text>

            <View
              style={{
                paddingTop: 0,
              }}
            >
              <View
                style={{
                  height: 38,
                  width: "80%",
                  borderColor: "rgba(0, 72, 125, 0.5)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    setNewReading2(parseInt(value));
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                paddingTop: 10,
                fontWeight: "500",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Date
            </Text>

            <View
              style={{
                flexDirection: "row",
                //alignContent: "center",
              }}
            >
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList
                  data={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                  ]}
                  setSelected={setDateReading}
                />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  setSelected={setMonthReading}
                />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  width: 120,
                }}
              >
                <SelectList data={allYears} setSelected={setYearReading} />
              </View>
            </View>

            <View
              style={{
                paddingTop: 20,
                width: "100%",
                //alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "50%",
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  let d = new Date(yearReading, monthReading - 1, dateReading);
                  if (d < today) {
                    setBPContainerPrev(false);

                    if (bpReadings.length == 1 && bpReadings[0] == 0) {
                      bpReadings[0] = newReading;
                    } else {
                      bpReadings.push(newReading);
                    }

                    if (bpdReadings.length == 1 && bpdReadings[0] == 0) {
                      bpdReadings[0] = newReading2;
                    } else {
                      bpdReadings.push(newReading2);
                    }

                    if (
                      bpReadingsDates.length == 1 &&
                      bpReadingsDates[0] == 0
                    ) {
                      bpReadingsDates[0] = d;
                    } else {
                      bpReadingsDates.push(d);

                      const temp = [];
                      bpReadingsDates.forEach((value) => {
                        temp.push(value);
                      });

                      bpReadingsDates.sort((a, b) => {
                        return a - b;
                      });

                      const tempBP = [];
                      const tempBPD = [];

                      bpReadingsDates.forEach((value, index) => {
                        var i = temp.indexOf(value);
                        tempBP.push(bpReadings[i]);
                        tempBPD.push(bpdReadings[i]);
                        console.log(tempBP);
                      });

                      for (var i = 0; i < bpReadingsDates.length; i++) {
                        bpReadings[i] = tempBP[i];
                        bpdReadings[i] = tempBPD[i];
                      }
                      // setGlucoseReadings(tempGlcRd);
                      // console.log(glucoseReadings + " ///>>>");
                    }

                    SetValueDB("bpReadings", bpReadings.join(",")).then(() =>
                      console.log(bpReadings + " zamina")
                    );

                    SetValueDB("bpdReadings", bpdReadings.join(",")).then(() =>
                      console.log(bpdReadings + " zamina")
                    );

                    SetValueDB(
                      "bpReadingsDates",
                      bpReadingsDates.join(",")
                    ).then(() => console.log(bpReadingsDates + " mina eh eh"));

                    console.log(glucoseReadingsDates);
                    console.log(glucoseReadings + "r");
                  } else {
                    {
                      Alert.alert("Invalid date", "Invalid date entered");
                    }
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "10%",
                    paddingVertical: 5,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  Confirm
                </Text>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={{
                    //paddingLeft: "90%",
                    //paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                    paddingTop: 8,
                    paddingLeft: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            paddingTop: 190,
            display: lowSugarContainer == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 20) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Potential Hypoglycemia Warning!
            </Text>
            <TouchableOpacity
              onPress={() => setLowSugarContainer(false)}
              style={{
                position: "absolute",
                paddingTop: 10,
                paddingLeft: 330,
              }}
            >
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>

            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                The blood glucose entered is lower than it should be. You might
                have hypoglycemia. Consider consulting a doctor.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            paddingTop: 190,
            display: bpWarningContainer ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 20) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {bpWarningTitle}
            </Text>
            <TouchableOpacity
              onPress={() => setBPWarningContainer(false)}
              style={{
                position: "absolute",
                paddingTop: 10,
                paddingLeft: 330,
              }}
            >
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>

            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {bpWarningText}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            paddingTop: 190,
            display: diabetesContainer == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 25) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Potential Diabetes Warning!
            </Text>
            <TouchableOpacity
              onPress={() => setDiabetesContainer(false)}
              style={{
                position: "absolute",
                paddingTop: 10,
                paddingLeft: 330,
              }}
            >
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>

            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                The blood glucose entered is higher than it should be. You might
                have Diabetes. Consider consulting a doctor.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            paddingTop: 190,
            display: prediabetesContainer == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 25) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Potential Prediabetes Warning!
            </Text>
            <TouchableOpacity
              onPress={() => setPrediabetesContainer(false)}
              style={{
                position: "absolute",
                paddingTop: 10,
                paddingLeft: 330,
              }}
            >
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>

            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                The blood glucose entered is higher than it should be. You might
                have Prediabetes. Consider consulting a doctor.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            paddingTop: 190,
            display: timerContainer == true ? "flex" : "none",
          }}
        >
          <View
            style={{
              height: (Dimensions.get("window").height * 40) / 100,
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Reminders
            </Text>
            <TouchableOpacity
              onPress={() => setTimerContainer(false)}
              style={{
                position: "absolute",
                paddingTop: 10,
                paddingLeft: 330,
              }}
            >
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>

            <View
              style={{
                alignItems: "center",
                paddingTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {remainingDays}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Days till next glucose reading entry
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                paddingTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {bpCheckupRemainingDays}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  width: 350,
                  textAlign: "center",
                }}
              >
                Days till next blood pressure reading entry
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                paddingTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {remainingDays}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  width: 350,
                  textAlign: "center",
                }}
              >
                Days till next user info updation
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: 70,
            left: 330,
            // paddingLeft: 330,
            // paddingTop: 650,
          }}
        >
          <TouchableOpacity onPress={() => setTimerContainer(true)}>
            <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: "#FFF",
                borderRadius: 100,
                alignItems: "center",
                paddingTop: 3,
              }}
            >
              <MaterialCommunityIcons name="timer-outline" size={60} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{ paddingTop: 10, display: showAlert ? "flex" : "none" }}
          >
            <View
              style={{
                height: 50,
                width: "98%",
                backgroundColor: "rgba(250,62,62,0.7)",
                borderRadius: 15,
                borderColor: "#96333d",
                borderWidth: 3.5,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  fontSize: 22,
                  paddingTop: "1%",
                  paddingLeft: "5%",
                  color: "rgba(255,198,196,1)",
                }}
              >
                Get checkup done today!!
              </Text>

              <TouchableOpacity
                style={{
                  position: "absolute",
                  paddingTop: 5,
                  paddingLeft: "83%",
                }}
                onPress={() => {
                  setShowAlert(false);
                  ResetCheckupDuration();
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 50,
                    backgroundColor: "rgba(255,198,196,1)",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: 16,
                      paddingVertical: 4,
                      alignSelf: "center",
                      color: "#96333d",
                    }}
                  >
                    DONE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{ backgroundColor: "rgba(0, 33, 59, 0.3)" }}>
            <Text
              style={{
                fontSize: 50,
                alignSelf: "center",
                color: "rgba(180, 229, 255, 0.87)",
              }}
            >
              {remainingDays}
            </Text>
            <Text
              style={{
                fontSize: 25,
                alignSelf: "center",
                color: "rgba(190, 239, 255, 0.87)",
              }}
            >
              Days till next checkup
            </Text>
          </View> */}

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
                {todaysMeal && <MealList mealData={todaysMeal} />}
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: 30,
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
                Blood Glucose
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 240,
            }}
          >
            <View>
              <LineChart
                data={{
                  datasets: [
                    {
                      data: glucoseReadings,
                    },
                    {
                      data:
                        isNaN(
                          glucosePrediction[glucosePrediction.length - 1]
                        ) || glucosePrediction.length == 0
                          ? []
                          : glucosePrediction,
                      color: (opacity = 0.5) =>
                        `rgba(255, 102, 102, ${opacity})`,
                    },
                  ],
                }}
                width={(Dimensions.get("window").width * 70) / 100} // from react-native
                height={190}
                //yAxisLabel="$"
                //yAxisSuffix="mmol/mol"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#00dee2",
                  backgroundGradientFrom: "rgba(74, 137, 255, 1)",
                  backgroundGradientFromOpacity: 0.8,
                  backgroundGradientTo: "rgba(74, 183, 255, 1)",
                  backgroundGradientToOpacity: 0.8,
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#0051d4",
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingTop: 15,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View
              style={{
                position: "absolute",
                paddingTop: 40,
                paddingLeft: "80%",
              }}
            >
              <TouchableOpacity
                onPress={() => setReadingContainer(true)}
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                }}
              >
                <MaterialIcons
                  name="add-chart"
                  size={64}
                  color={"#00213b"}
                  style={{
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                paddingTop: 130,
                paddingLeft: "80%",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                }}
                onPress={() => setReadingContainerPrev(true)}
              >
                <MaterialIcons
                  name="history"
                  size={64}
                  color={"#00213b"}
                  style={{
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                paddingTop: 225,
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 290,
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate("Glucose")}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "30%",
                    paddingVertical: 5,
                    alignItems: "center",
                  }}
                >
                  Show More
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingTop: 80,
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
                Blood Pressure
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 260,
            }}
          >
            <LineChart
              data={{
                datasets: [
                  {
                    data: bpReadings,
                  },
                  {
                    data: bpdReadings,
                    color: (opacity = 0.5) => `rgba(255, 102, 102, ${opacity})`,
                  },
                ],
              }}
              width={(Dimensions.get("window").width * 70) / 100} // from react-native
              height={190}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#00dee2",
                backgroundGradientFrom: "rgba(74, 137, 255, 1)",
                backgroundGradientFromOpacity: 0.8,
                backgroundGradientTo: "rgba(74, 183, 255, 1)",
                backgroundGradientToOpacity: 0.8,
                borderRadius: 16,
                borderColor: "#0051d4",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#0051d4",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                paddingTop: 15,
                paddingLeft: 10,
              }}
            />

            <View
              style={{
                position: "absolute",
                paddingTop: 40,
                paddingLeft: "80%",
              }}
            >
              <TouchableOpacity
                onPress={() => setBPContainer(true)}
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                }}
              >
                <MaterialIcons
                  name="add-chart"
                  size={64}
                  color={"#00213b"}
                  style={{
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                paddingTop: 130,
                paddingLeft: "80%",
              }}
            >
              <TouchableOpacity
                onPress={() => setBPContainerPrev(true)}
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 10,
                }}
              >
                <MaterialIcons
                  name="history"
                  size={64}
                  color={"#00213b"}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                paddingTop: 225,
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 290,
                  backgroundColor: "#00213b",
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate("BloodPressure")}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: "rgba(170, 219, 255,1)",
                    paddingLeft: "30%",
                    paddingVertical: 5,
                    alignItems: "center",
                  }}
                >
                  Show More
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingVertical: 8,
                    color: "rgba(170, 219, 255, 1)",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Workout page button */}
          <View
            style={{
              paddingTop: 80,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 140,
                width: 120,
                alignContent: "flex-end",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 10,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("WorkoutPlan")}
            >
              <Image
                source={require("../assets/WorkoutPlan.png")}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  paddingTop: 40,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
            <View style={{ width: 40 }}></View>
            {/* Diet page button */}
            <TouchableOpacity
              style={{
                height: 140,
                width: 120,
                alignContent: "flex-end",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 10,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("DietChart")}
            >
              <Image
                source={require("../assets/DietChart.png")}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  paddingTop: 40,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 130,
            }}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
