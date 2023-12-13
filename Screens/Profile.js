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
    if (result) {
      setSelectedImage(result);
      console.log(result);
    } else setSelectedImage(require("../assets/user.png"));
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
                source={{
                  uri: SelectedImage
                    ? SelectedImage
                    : "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
                }}
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
