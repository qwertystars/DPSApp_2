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
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { SimpleLinearRegression } from "ml-regression-simple-linear";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { SelectList } from "react-native-dropdown-select-list";

//Timer: Feedback of user
//use firebase
//separate inouts in separate pages on first login
//make first time open sequence
//the question set should be asked after ailments are entered
//interactive first login page
//on home page give today's info like diet for today, work for today, medications
//add notification system for workout plan
export default function Main({ navigation }) {
  let today = new Date();
  let checkupDate = new Date();

  const checkupDuration = 2;

  const [allYears, setAllYears] = useState([]);

  const [checkupDay, setCheckupDay] = useState();
  const [remainingDays, setRemainingDays] = useState(checkupDuration);
  const [dateReading, setDateReading] = useState();
  const [monthReading, setMonthReading] = useState();
  const [yearReading, setYearReading] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const [readingContainder, setReadingContainer] = useState(false);
  const [readingContainerPrev, setReadingContainerPrev] = useState(false);
  const [newReading, setNewReading] = useState(0);

  const [glucoseReadings, setGlucoseReadings] = useState([0]);
  const [glucoseReadingsDates, setGlucoseReadingsDates] = useState([0]);
  const [glucoseDatePassed, setGlucoseDatePassed] = useState([0]);
  const [glucosePrediction, setGlucosePrediction] = useState([0]);

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
        temp.push(regression.predict(e * i));
      }
      console.log(temp + " pedictions");

      for (var i = 0; i < glucoseDatePassed.length; i++) {
        glucosePrediction.pop();
      }

      for (var i = 0; i < temp.length; i++) {
        glucosePrediction.push(temp[i]);
      }
    }
    console.log("Predictiopn function executed");
    console.log(glucosePrediction + " Nan u dumb");
    console.log(isNaN(glucosePrediction[1]));
    console.log(glucosePrediction + " Nan u dumb");
  }

  //SecureStore.deleteItemAsync("checkupDate");
  // SecureStore.deleteItemAsync("glucoseReadings");
  // SecureStore.deleteItemAsync("glucoseReadingsDates");

  useEffect(() => {
    today = new Date();
    checkupDate = new Date();

    for (var i = today.getFullYear(); i >= 1970; i--) {
      allYears.push(i);
    }

    GetValueDB("checkupDate").then((value) => {
      if (value == "") {
        ResetCheckupDuration();
      } else {
        checkupDate = new Date(value);
        setRemainingDays(
          Math.floor((checkupDate - today) / (1000 * 60 * 60 * 24))
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
    });
  }, []);

  useEffect(() => {
    if (remainingDays == 0) {
      setShowAlert(true);
    }
  }, [remainingDays]);

  useEffect(() => {
    console.log(glucoseReadings + "e");
    //SetValueDB("glucoseReadings", glucoseReadings.join(","));
  }, [glucoseReadings]);

  useEffect(() => {
    GlucoseDateUpdation();
    Prediction();

    console.log(glucoseReadings + " heeh boii");
    console.log(glucoseDatePassed + " eheh buoyy");
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
            zIndex: 1,
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
                  if (glucoseReadings.length == 1 && glucoseReadings[0] == 0) {
                    glucoseReadings[0] = newReading;
                  } else {
                    glucoseReadings.push(newReading);
                  }
                  SetValueDB("glucoseReadings", glucoseReadings.join(",")).then(
                    () => console.log("Added")
                  );
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
            zIndex: 1,
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
          <View style={{ backgroundColor: "rgba(0, 33, 59, 0.3)" }}>
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
            <TouchableOpacity onPress={() => navigation.navigate("Glucose")}>
              <LineChart
                data={{
                  labels: [
                    "                                                             CLICK FOR MORE INFO",
                  ],
                  datasets: [
                    {
                      data: glucoseReadings,
                    },
                    // {
                    //   data: isNaN(glucosePrediction[1])
                    //     ? []
                    //     : glucosePrediction,
                    // },
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
            </TouchableOpacity>

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

            {/* <View
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
            </View> */}
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
                //labels: ["January", "February", "March", "April", "May", "June"],
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
              width={(Dimensions.get("window").width * 70) / 100} // from react-native
              height={190}
              yAxisLabel="$"
              yAxisSuffix="k"
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
