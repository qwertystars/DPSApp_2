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
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

export default function Login({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1);
  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };


  const [name, setName] = useState("User");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [height, setHeight] = useState(0);
  const [unit, setUnit] = useState("cm");
  const [weight, setWeight] = useState(0);
  const [bloodGrp, setBloodGrp] = useState("AB+");

  const genderList = ["MALE", "FEMALE", "OTHER"];
  const bloodGrpList = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const unitList = ["cm", "inches"];
  const [heightUnit, setHeightUnit] = useState(0);

  const [SelectedImage, setSelectedImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
  );

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
    else
      setSelectedImage(
        require("../assets/user.png")
      );
  };

  useEffect(() => {
    getNameDB();
    getAgeDB();
    getGenderDB();
    getHeightDB();
    getUnitDB();
    getWeightDB();
    getBloodGroupDB();
    getProfilePicDB();
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
    } else if (unit == "inches") {
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


  async function SetValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: "rgba(93, 152, 255, 0.83)",
      }}
    >
      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >



        {/*Name Page*/}
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: "rgba(0,0,0,0.5)",
            height: "100%",
            width: "100%",
            display: currentPage == 1 ? "flex" : "none",
          }}
        >
             <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  opacity: 0.7,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
                imageStyle= {{ borderRadius: 40,}}
             >
                <Text
                  style={{
                    fontSize:28,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: "rgba(0, 0, 79, 1)",
                    alignSelf: "center",
                  }}
                > Welcome To</Text>
                <Text
                  style={{
                    fontSize:48,
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: "rgba(0, 0, 159, 1)",
                    alignSelf: "center",
                  }}
                > MediCoach!</Text>
            <View style={{paddingTop: 100}}>
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
              <Text
                style={{  fontSize:28,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 79, 1)",
                  alignSelf: "center", }}
              >
                Hi! I am...
              </Text>
              <View
                style={{
                  height: 52,
                  width: "90%",
                  borderColor: "rgba(0, 0, 79, 1)",
                  borderWidth: 2.75, //2.75
                  borderRadius: 20,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  alignSelf: "center",
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
                    color: "rgba(0, 0, 79, 1)",
                    alignSelf: "center",
                    fontSize: 22,
                  }}
                />
              </View>
            </View>
            <View style={{ paddingTop: "40%", alignSelf: "center", width: "95%" }}>
              <TouchableOpacity
                style={{
                  height: 60,
                  backgroundColor: "rgba(0, 0, 79, 1)",
                  paddingTop: 5,
                  borderColor: "rgba(0, 0, 79, 0.7)",
                  borderRadius: 20,
                  borderWidth: 3,
                }}
                onPress={() => setCurrentPage(2)}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "rgba(200, 247, 255, 0.87)",
                    paddingLeft: 70,
                    justifyContent: "flex-start",
                  }}
                >
                  Next
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={50}
                  style={{
                    position: "absolute",
                    paddingLeft: "70%",
                    paddingTop: 5,
                    color: "rgba(170, 219, 255, 0.87)",
                  }}
                />
              </TouchableOpacity>
            </View>

                  <TouchableOpacity
                    style={{
                      height: 2,
                      width: "100%",
                      backgroundColor: "rgba(255,255,255,1)",
                    }}
                    onPress={() => {
                      navigation.navigate("BottomTabNavigation");
                    }}
                  ></TouchableOpacity>
            </ImageBackground>
        </View>



        <View
         style={{
          position: "absolute",
          zIndex: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: "rgba(0,0,0,0.5)",
          height: "100%",
          width: "100%",
          display: currentPage == 2 ? "flex" : "none",}}
        >
          <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  opacity: 0.7,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
                imageStyle= {{ borderRadius: 40,}}
             >
          <TouchableOpacity
                style={{
                  height: 60,
                  width: 50,

                }}
                onPress={() => setCurrentPage(1)}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={62}
                  style={{
                    position: "absolute",

                    color: "rgba(0, 0, 79, 1)",
                  }}/>
              </TouchableOpacity>
            </ImageBackground>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}
