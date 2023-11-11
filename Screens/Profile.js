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
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";
import { Ailments } from "../Screens";

//GLUCARE
export default function Profile({ navigation }) {
  const [name, setName] = useState("User");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bloodGrp, setBloodGrp] = useState("AB+");

  const genderList = ["MALE", "FEMALE"];
  const bloodGrpList = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

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
            <Image
              source={require("../assets/user.png")}
              style={{
                width: 170,
                height: 170,
                borderRadius: 85,
                position: "relative",
                paddingTop: "20.88%",
                alignSelf: "center",
                opacity: 0.9,
              }}
            />
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
                  onChangeText={(value) => setName(value)}
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
                    maximumValue={99}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setAge(value);
                      value = Math.round(value);
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
                  placeholder="Select gender"
                  search="false"
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
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Height(in cm)
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
                  {height}
                </Text>
                <View style={{ position: "absolute", paddingLeft: 40 }}>
                  <Slider
                    style={{
                      width: (Dimensions.get("window").width * 70) / 100,
                      height: 35,
                    }}
                    minimumValue={0}
                    maximumValue={213}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setHeight(value);
                      value = Math.round(value);
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
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {
                      setWeight(value);
                      value = Math.round(value);
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
                  placeholder="Select blood group"
                  search="false"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: 18,
              alignItems: "left",
              paddingLeft: 6,
              flexDirection: "row",
            }}
          >
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
              onPress={() => (window.location.href = "Ailments.js")}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "rgba(170, 219, 255, 0.87)",
                  paddingLeft: 2,
                  justifyContent: "flex-start",
                }}
              >
                Ailments
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                style={{
                  position: "absolute",
                  paddingLeft: 290,
                  paddingTop: 5,
                  color: "rgba(170, 219, 255, 0.87)",
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
