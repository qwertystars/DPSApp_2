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

var viewStyles = StyleSheet.create({
  View: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
var bgStyles = StyleSheet.create({
  bg: {
    flex: 1,
    opacity: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
var qStyles = StyleSheet.create({
    q: {
        fontSize: 20,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "rgba(0, 0, 79, 1)",
        alignSelf: "center",
    },
});
var aStyles = StyleSheet.create({
    a: {
        fontSize: 28,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "rgba(0, 0, 159, 1)",
        alignSelf: "center",
    },
});


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
            ...bgStyles.bg,
            display: currentPage == 1 ? "flex" : "none",
          }}
        >
             <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={viewStyles.View}
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
            <View style={{paddingTop: "10%"}}>
                <TouchableOpacity onPress={handleImageSelector}>
              <Image
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 85,
                  position: "relative",
                  paddingTop: 0,
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
            <View style={{ paddingTop: "25%", alignSelf: "center", width: "95%" }}>
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


        {/*Age and gender*/}            
        <View
         style={{...bgStyles.bg,
          display: currentPage == 2 ? "flex" : "none",}}
        >
          <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={viewStyles.View}
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
              
              <Text style={{...qStyles.q, paddingTop: "20%",}}>
               How old are you?
              </Text>
              <Text
                style={{...aStyles.a, paddingTop: "5%"}}
              >
               I am {age} years old!
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: "rgba(70, 70, 255, 1)",
                    paddingTop: 5,
                    paddingLeft: 11,
                    justifyContent: "center",
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

                  <View style= {{paddingTop: "20%"}}>
                  <Text style={{...qStyles.q, paddingTop: "10%"}}>
                   What is your gender?
                  </Text>
                  <Text
                    style={{...aStyles.a, paddingTop: "5%"}}
                  >
                    I am a ...
                  </Text>
                    <View
                        style={{
                            width: "80%",
                            paddingTop: 10,
                            color: "#FFFFF",
                            alignSelf: "center",
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
                    <View style={{paddingTop: "25%", width: "100%"}}>
                    <TouchableOpacity
                        style={{
                            height: 60,
                            backgroundColor: "rgba(0, 0, 79, 1)",
                            paddingTop: 5,
                            borderColor: "rgba(0, 0, 79, 0.7)",
                            borderRadius: 20,
                            borderWidth: 3,
                        }}
                        onPress={() => setCurrentPage(3)}
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
                  </View>

                </View>
              </View>

            </ImageBackground>
        </View>


              {/*Height and Weight*/ }
        <View
         style={{...bgStyles.bg,
          display: currentPage == 3 ? "flex" : "none",}}
        >
          <ImageBackground
                source={require("../assets/GradientBackground.png")}
                resizeMode="cover"
                style={viewStyles.View}
                imageStyle= {{ borderRadius: 40,}}
             >
          <TouchableOpacity
                style={{
                  height: 60,
                  width: 50,

                }}
                onPress={() => setCurrentPage(2)}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={62}
                  style={{
                    position: "absolute",

                    color: "rgba(0, 0, 79, 1)",
                  }}/>
              </TouchableOpacity>

                <View style={{paddingTop: "5%"}}>
                    <Text style={{ ...qStyles.q, paddingTop: "5%", }}>
                        How tall are you?
                    </Text>
                    <Text
                        style={{ ...aStyles.a, paddingTop: "5%" }}
                    >
                     I am {heightUnit} {unit} tall!
                    </Text>

                          <View styles={{ marginHorizontal: 10, }}>
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
                                      alignSelf: "center"
                                  }}
                                  inputStyles={{
                                      fontSize: 12,
                                  }}
                              />
                          <View style={{ position: "absolute", paddingTop: "10%", alignSelf: "center"}}>
                              <Slider
                                  style={{
                                      width: (Dimensions.get("window").width * 70) / 100,
                                      height: 35,
                                      alignSelf: "center",
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
                          <Text style={{ ...qStyles.q, paddingTop: "20%", }}>
                              How much do you weigh?
                          </Text>
                          <Text
                              style={{ ...aStyles.a, paddingTop: "5%" }}
                          >
                              I am {weight} kg!
                          </Text>
                          <Slider
                              style={{
                                  width: (Dimensions.get("window").width * 70) / 100,
                                  height: 35,
                                  alignSelf: "center"
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

              <View style={{paddingTop: "25%"}}>
                    <TouchableOpacity
                        style={{
                            height: 60,
                            backgroundColor: "rgba(0, 0, 79, 1)",
                            paddingTop: 5,
                            borderColor: "rgba(0, 0, 79, 0.7)",
                            borderRadius: 20,
                            borderWidth: 3,
                        }}
                        onPress={() => setCurrentPage(4)}
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
            </ImageBackground>
          </View>

              {/*Blood grp*/}
              <View
                  style={{
                      ...bgStyles.bg,
                      display: currentPage == 4 ? "flex" : "none",
                  }}
              >
                  <ImageBackground
                      source={require("../assets/GradientBackground.png")}
                      resizeMode="cover"
                      style={viewStyles.View}
                      imageStyle={{ borderRadius: 40, }}
                  >
                      <TouchableOpacity
                          style={{
                              height: 60,
                              width: 50,

                          }}
                          onPress={() => setCurrentPage(3)}
                      >
                          <MaterialIcons
                              name="keyboard-arrow-left"
                              size={62}
                              style={{
                                  position: "absolute",

                                  color: "rgba(0, 0, 79, 1)",
                              }} />
                      </TouchableOpacity>

                      <Text style={{ ...qStyles.q, paddingTop: "20%", }}>
                          What's your Blood Group?
                      </Text>
                      <Text
                          style={{ ...aStyles.a, paddingTop: "5%" }}
                      >
                          I have {bloodGrp} blood!
                      </Text>
                      <View
                          style={{
                              width: "80%",
                              paddingTop: 10,
                              color: "#FFFFF",
                              alignSelf : "center",
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

                      <View style={{ paddingTop: "25%" }}>
                          <TouchableOpacity
                              style={{
                                  height: 60,
                                  backgroundColor: "rgba(0, 0, 79, 1)",
                                  paddingTop: 5,
                                  borderColor: "rgba(0, 0, 79, 0.7)",
                                  borderRadius: 20,
                                  borderWidth: 3,
                              }}
                              onPress={() => setCurrentPage(5)}
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
                  </ImageBackground>
              </View>

      </ImageBackground>
    </SafeAreaView>
  );
}
