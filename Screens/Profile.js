import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";
import { Ailments } from "../Screens";
import { Allergies } from "../Screens";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

//GLUCARE
export default function Profile({ navigation }) {
  const [name, setName] = useState("User");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [height, setHeight] = useState(0);
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState(0);
  const [bloodGrp, setBloodGrp] = useState("AB+");

  const genderList = ["MALE", "FEMALE", "OTHER"];
  const bloodGrpList = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const unitList = ["cm", "feet"];
  const [heightUnit, setHeightUnit] = useState(0);

  const [diabetes, setDiabetes] = useState(false);
  const [preDiabetes, setPreDiabetes] = useState(false);
  const [highBloodPressure, setHighBloodPressure] = useState(false);
  const [lowBloodPressure, setLowBloodPressure] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [arthiritis, setArthiritis] = useState(false);
  const [migraine, setMigraine] = useState(false);
  const [pulmonaryDisease, setPulmonaryDisease] = useState(false);

  const [glucoseReadings, setGlucoseReadings] = useState([]);
  const [dates, setDates] = useState([]);
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);

  const [bpReadings, setBPReadings] = useState([]);
  const [bpdReadings, setBPDReadings] = useState([]);
  const [bpDates, setBPDates] = useState([]);

  var data = ["e"];

  const [SelectedImage, setSelectedImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
  );

  const getValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result == "true" ? true : false;
    else return false;
  };

  const GetValueDB2 = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  const getNameDB = async () => {
    let result = await SecureStore.getItemAsync("Name");
    if (result) setName(result);
    else setName("User");
  };

  const getAgeDB = async () => {
    let result = await SecureStore.getItemAsync("Age");
    if (result) setAge(parseInt(result));
    else setAge(50);
  };

  const getGenderDB = async () => {
    let result = await SecureStore.getItemAsync("Gender");
    if (result) setGender(result);
    else setGender("Select Gender");
  };

  const getHeightDB = async () => {
    let result = await SecureStore.getItemAsync("Height");
    if (result) setHeight(parseInt(result));
    else setHeight(140);
  };

  const getUnitDB = async () => {
    let result = await SecureStore.getItemAsync("Unit");
    if (result) setUnit(result);
    else setUnit("cm");
  };

  const getWeightDB = async () => {
    let result = await SecureStore.getItemAsync("Weight");
    if (result) setWeight(parseInt(result));
    else setWeight(74);
  };

  const getBloodGroupDB = async () => {
    let result = await SecureStore.getItemAsync("BloodGrp");
    if (result) setBloodGrp(result);
    else setBloodGrp("Select Blood Group");
  };

  const getProfilePicDB = async () => {
    let result = await SecureStore.getItemAsync("profilePic");
    if (result) setSelectedImage(result);
    else setSelectedImage(require("../assets/user.png"));
  };

  useEffect(() => {
    console.log("FETCHIONG PROFILE DATA");

    getNameDB();
    getAgeDB();
    getGenderDB();
    getHeightDB();
    getUnitDB();
    getWeightDB();
    getBloodGroupDB();
    getProfilePicDB();

    getValueDB("diabetes").then((value) => {
      setDiabetes(value == true ? true : false);
    });

    getValueDB("preDiabetes").then((value) => {
      setPreDiabetes(value == true ? true : false);
    });

    getValueDB("highBloodPressure").then((value) => {
      setHighBloodPressure(value == true ? true : false);
    });

    getValueDB("lowBloodPressure").then((value) => {
      setLowBloodPressure(value == true ? true : false);
    });

    getValueDB("cholesterol").then((value) => {
      setCholesterol(value == true ? true : false);
    });

    getValueDB("arthiritis").then((value) => {
      setArthiritis(value == true ? true : false);
    });

    getValueDB("migraine").then((value) => {
      setMigraine(value == true ? true : false);
    });

    getValueDB("pulmonaryDisease").then((value) => {
      setPulmonaryDisease(value == true ? true : false);
    });

    GetValueDB2("glucoseReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setGlucoseReadings(arr);
      console.log(arr);
    });

    GetValueDB2("glucoseReadingsDates").then((value) => {
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
      setDates(y);
    });

    GetValueDB2("PredictionSlope").then((value) => {
      if (value == "") {
        setSlope(0);
      } else {
        setSlope(parseFloat(value));
      }
    });

    GetValueDB2("PredictionIntercept").then((value) => {
      if (value == "") {
        setIntercept(0);
      } else {
        setIntercept(parseFloat(value));
      }
    });

    GetValueDB2("bpReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setBPReadings(arr);
      console.log(arr);
    });

    GetValueDB2("bpdReadings").then((value) => {
      let arr = value.split(",");
      arr.reverse();
      arr.forEach((value, index) => {
        arr[index] = parseInt(arr[index]);
      });
      setBPDReadings(arr);
      console.log(arr);
    });

    GetValueDB2("bpReadingsDates").then((value) => {
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
      setBPDates(y);
    });
  }, []);

  async function handleChangeName() {
    await SecureStore.setItemAsync("Name", name);
  }

  async function handleChangeAge() {
    await SecureStore.setItemAsync("Age", age.toString());
  }

  async function handleChangeGender() {
    await SecureStore.setItemAsync("Gender", gender);
  }

  async function handleChangeUnit() {
    await SecureStore.setItemAsync("Unit", unit);
  }

  async function handleChangeHeight() {
    await SecureStore.setItemAsync("Height", height.toString());
    if (unit == "cm") {
      setHeightUnit(height);
    } else if (unit == "feet") {
      setHeightUnit(
        Math.floor(height / 30.48) + "'" + Math.round((height % 30.48) / 2.4)
      );
    }
    console.log(height);
  }

  async function handleChangeWeight() {
    await SecureStore.setItemAsync("Weight", weight.toString());
  }

  async function handleChangeBloodGroup() {
    await SecureStore.setItemAsync("BloodGrp", bloodGrp);
  }

  const handleImageSelector = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }

    await SecureStore.setItemAsync("profilePic", SelectedImage).then(() =>
      console.log(SelectedImage)
    );
  };

  const html = `<div
  style="width: 360px; height: 1065px; position: relative; background: white"
>
<img
style="
  width: 83.01px;
  height: 84px;
  left: 17px;
  top: 14px;
  position: absolute;
  border-radius: 40px;
"
src="https://i.pinimg.com/736x/a1/ac/15/a1ac15e883ceddaf6c6a6fa413d58e8f.jpg"
/>
  <div
    style="
      width: 231px;
      height: 76px;
      left: 129px;
      top: 14px;
      position: absolute;
      color: black;
      font-size: 24px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    MediCoach<br /><br />Health Report
  </div>
  <div
    style="
      width: 322px;
      height: 0px;
      left: 17px;
      top: 115px;
      position: absolute;
      border: 3px black solid;
    "
  ></div>
  <div
    style="
      width: 322px;
      height: 0px;
      left: 17px;
      top: 283px;
      position: absolute;
      border: 3px black solid;
    "
  ></div>
  <div
    style="
      width: 322px;
      height: 0px;
      left: 17px;
      top: 465px;
      position: absolute;
      border: 3px black solid;
    "
  ></div>
  <div
    style="
      width: 99px;
      height: 132px;
      left: 23px;
      top: 130px;
      position: absolute;
      color: black;
      font-size: 14px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    Name:<br />Age:<br />Height:<br />Weight:<br />Gender:<br />Blood Group:<br /><br />
  </div>
  <div
    style="
      width: 177px;
      height: 130px;
      left: 129px;
      top: 132px;
      position: absolute;
      color: black;
      font-size: 14px;
      font-family: Inter;
      font-weight: 400;
      word-wrap: break-word;
    "
  >
    ${name}<br />${age}<br />${height}<br />${weight}<br />${gender}<br />${bloodGrp}
  </div>
  <div
    style="
      width: 322px;
      height: 41px;
      left: 17px;
      top: 298px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 20px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    Pre-Existing Conditions
  </div>
  <div
    style="
      width: 322px;
      height: 23px;
      left: 13px;
      top: 891px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 20px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    Health Results
  </div>
  <div
    style="
      width: 163px;
      height: 100px;
      left: 23px;
      top: 345px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    ${diabetes ? "Diabetes" : ""}<br />${
    preDiabetes ? "PreDiabetes" : ""
  }<br />${highBloodPressure ? "High Blood Pressure" : ""}<br />${
    lowBloodPressure ? "Low Blood Pressure" : ""
  }
  </div>
  <div
    style="
      width: 153px;
      height: 100px;
      left: 186px;
      top: 345px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
  ${arthiritis ? "Arthiritis" : ""}<br />${migraine ? "Migraine" : ""}<br />${
    pulmonaryDisease ? "Pulmonary Diseases" : ""
  }<br />${cholesterol ? "Cholestorol" : ""}
  </div>
  <div
    style="
      width: 113px;
      height: 164px;
      left: 26px;
      top: 929px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    BMI: <br />BMR:<br />Daily Calorie <br />Requirement :<br />Obesity:
  </div>
  <div
    style="
      width: 113px;
      height: 164px;
      left: 145px;
      top: 929px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 400;
      word-wrap: break-word;
    "
  >
    ${
      weight / ((height / 100) * (height / 100))
    }<br />${height} kcal<br /><br />2000 kcal<br />No
  </div>
  <div
    style="
      width: 322px;
      height: 0px;
      left: 11px;
      top: 677px;
      position: absolute;
      border: 3px black solid;
    "
  ></div>
  <div
    style="
      width: 251px;
      height: 0px;
      left: 49px;
      top: 534px;
      position: absolute;
      border: 2px black solid;
    "
  ></div>
  <div
    style="
      width: 329px;
      height: 30px;
      left: 10px;
      top: 480px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 20px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    Blood Glucose
  </div>
  <div
    style="
      width: 316px;
      height: 18px;
      left: 23px;
      top: 510px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Prediction(after 2 months): ${slope * 60 + intercept}
  </div>
  <div
    style="
      width: 129px;
      height: 64px;
      left: 198px;
      top: 603px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    ${dates.length > 0 ? dates[0] : ""}<br />${
    dates.length > 1 ? dates[1] : ""
  }<br />${dates.length > 2 ? dates[2] : ""}
  </div>
  <div
    style="
      width: 166px;
      height: 18px;
      left: 23px;
      top: 540px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Past Readings:
  </div>
  <div
    style="
      width: 35px;
      height: 64px;
      left: 59px;
      top: 603px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    ${glucoseReadings.length > 0 ? glucoseReadings[0] : ""}<br />${
    glucoseReadings.length > 1 ? glucoseReadings[1] : ""
  }<br />${glucoseReadings.length > 2 ? glucoseReadings[2] : ""}
  </div>
  <div
    style="
      width: 137px;
      height: 25px;
      left: 12px;
      top: 572px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Glucose Reading
  </div>
  <div
    style="
      width: 137px;
      height: 25px;
      left: 187px;
      top: 572px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Date
  </div>
  <div
    style="
      width: 322px;
      height: 0px;
      left: 15px;
      top: 877px;
      position: absolute;
      border: 3px black solid;
    "
  ></div>
  <div
    style="
      width: 251px;
      height: 0px;
      left: 49px;
      top: 727px;
      position: absolute;
      border: 2px black solid;
    "
  ></div>
  <div
    style="
      width: 329px;
      height: 30px;
      left: 8px;
      top: 691px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 20px;
      font-family: Inter;
      font-weight: 700;
      word-wrap: break-word;
    "
  >
    Blood Pressure
  </div>
  <div
    style="
      width: 129px;
      height: 64px;
      left: 198px;
      top: 794px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    ${bpDates.length > 0 ? bpDates[0] : ""}<br />${
    bpDates.length > 1 ? bpDates[1] : ""
  }<br />${bpDates.length > 2 ? bpDates[2] : ""}
  </div>
  <div
    style="
      width: 166px;
      height: 18px;
      left: 23px;
      top: 739px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Past Readings:
  </div>
  <div
    style="
      width: 62px;
      height: 18px;
      left: 23px;
      top: 767px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Systolic
  </div>
  <div
    style="
      width: 62px;
      height: 18px;
      left: 116px;
      top: 767px;
      position: absolute;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Diastolic
  </div>
  <div
    style="
      width: 62px;
      height: 18px;
      left: 231px;
      top: 767px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    Date
  </div>
  <div
    style="
      width: 35px;
      height: 64px;
      left: 30px;
      top: 799px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
    ${bpReadings.length > 0 ? bpReadings[0] : ""}<br />${
    bpReadings.length > 1 ? bpReadings[1] : ""
  }<br />${bpReadings.length > 2 ? bpReadings[2] : ""}
  </div>
  <div
    style="
      width: 35px;
      height: 64px;
      left: 132px;
      top: 795px;
      position: absolute;
      text-align: center;
      color: black;
      font-size: 15px;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
    "
  >
  ${bpdReadings.length > 0 ? bpdReadings[0] : ""}<br />${
    bpdReadings.length > 1 ? bpdReadings[1] : ""
  }<br />${bpdReadings.length > 2 ? bpdReadings[2] : ""}
  </div>
</div>
`;

  const [selectedPrinter, setSelectedPrinter] = useState();

  let generatePdf = async () => {
    await printAsync({
      html: html,
    });
  };

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
          Profile
        </Text>
      </View>

      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={generatePdf}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: "#FFFF",
            }}
          ></View>
        </TouchableOpacity>

        <ScrollView
          style={{
            height: 200,
            paddingLeft: 7,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelector}>
              <Image
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 85,
                  position: "relative",
                  paddingTop: "20.88%",
                  alignSelf: "center",
                  opacity: 0.9,
                }}
                source={{ uri: SelectedImage }}
              />
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Name
              </Text>
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
                }}
              >
                <TextInput
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    handleChangeName();
                  }}
                  editable={true}
                  style={{
                    color: "rgba(18, 18, 18, 0.7)",
                  }}
                />
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
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Age
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
                  {age}
                </Text>
                <View style={{ position: "absolute", paddingLeft: 40 }}>
                  <Slider
                    style={{
                      width: (Dimensions.get("window").width * 70) / 100,
                      height: 35,
                    }}
                    minimumValue={0}
                    maximumValue={127}
                    value={age}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setAge(value);
                      value = Math.round(value);
                      handleChangeAge();
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
                paddingTop: 8,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Gender
              </Text>

              <View
                style={{
                  width: "80%",
                  paddingTop: 10,
                  color: "#FFFFF",
                }}
              >
                <SelectList
                  setSelected={setGender}
                  data={genderList}
                  placeholder={gender}
                  search="false"
                  onSelect={() => {
                    handleChangeGender();
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
                paddingHorizontal: 8,
                paddingTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: "rgba(170, 219, 255, 0.87)",
                    paddingRight: 10,
                  }}
                >
                  Height
                </Text>

                <View styles={{ marginHorizontal: 10 }}>
                  <SelectList
                    setSelected={setUnit}
                    data={unitList}
                    placeholder={unit}
                    search="false"
                    onSelect={() => {
                      handleChangeUnit();
                    }}
                    boxStyles={{
                      height: 35,
                      width: 90,
                      paddingTop: 5,
                    }}
                    inputStyles={{
                      fontSize: 12,
                    }}
                  />
                </View>
              </View>
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
                  {heightUnit}
                </Text>
                <View style={{ position: "absolute", paddingLeft: 40 }}>
                  <Slider
                    style={{
                      width: (Dimensions.get("window").width * 70) / 100,
                      height: 35,
                    }}
                    minimumValue={0}
                    maximumValue={213}
                    value={height}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setHeight(value);
                      value = Math.round(value);
                      handleChangeHeight();
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
                paddingTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Weight(in kg)
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
                  {weight}
                </Text>
                <View style={{ position: "absolute", paddingLeft: 40 }}>
                  <Slider
                    style={{
                      width: (Dimensions.get("window").width * 70) / 100,
                      height: 35,
                    }}
                    minimumValue={0}
                    maximumValue={120}
                    value={weight}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setWeight(value);
                      value = Math.round(value);
                      handleChangeWeight();
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
                paddingTop: 8,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Blood Group
              </Text>

              <View
                style={{
                  width: "80%",
                  paddingTop: 10,
                  color: "#FFFFF",
                }}
              >
                <SelectList
                  setSelected={setBloodGrp}
                  data={bloodGrpList}
                  placeholder={bloodGrp}
                  search="false"
                  onSelect={() => {
                    handleChangeBloodGroup();
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "left",
              paddingLeft: 6,
              flexDirection: "column",
              paddingTop: 5,
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "80%",
                  backgroundColor: "#2e6698",
                  paddingTop: 5,
                  borderColor: "#37688d",
                  borderRadius: 5,
                  borderWidth: 3,
                }}
                onPress={() => navigation.navigate("BetterAilments")}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "rgba(170, 219, 255, 0.87)",
                    paddingLeft: 2,
                    justifyContent: "flex-start",
                  }}
                >
                  Medical History
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingTop: 5,
                    color: "rgba(170, 219, 255, 0.87)",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 15 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "80%",
                  backgroundColor: "#2e6698",
                  paddingTop: 5,
                  borderColor: "#37688d",
                  borderRadius: 5,
                  borderWidth: 3,
                }}
                onPress={() => navigation.navigate("Allergies")}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "rgba(170, 219, 255, 0.87)",
                    paddingLeft: 2,
                    justifyContent: "flex-start",
                  }}
                >
                  Allergies
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingTop: 5,
                    color: "rgba(170, 219, 255, 0.87)",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 15 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "80%",
                  backgroundColor: "#2e6698",
                  paddingTop: 5,
                  borderColor: "#37688d",
                  borderRadius: 5,
                  borderWidth: 3,
                }}
                onPress={() => navigation.navigate("TimerSettings")}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "rgba(170, 219, 255, 0.87)",
                    paddingLeft: 2,
                    justifyContent: "flex-start",
                  }}
                >
                  Timer Settings
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingTop: 5,
                    color: "rgba(170, 219, 255, 0.87)",
                  }}
                />
              </TouchableOpacity>
            </View>
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
