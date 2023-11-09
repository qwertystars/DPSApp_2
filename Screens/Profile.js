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
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list'


//GLUCARE
export default function Profile({ navigation }) {

  const [name, setName] = useState("User");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("MALE");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState();

  const genderList = ["MALE", "FEMALE"];
  const activityList = [
    "Little or no exercise",
    "Light exercise 1 - 3 times per week",
    "Moderate exercise 4 - 5 times per week",
    "Intense/Daily exercise 4 - 5 times per week",
    "Intense exercise 6 - 7 times per week",
    "Very intense daily exercise or physical job",
  ];

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={"#000"} />
        </TouchableOpacity>

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
        <ScrollView>
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
                paddingLeft: "33.61%",
                paddingTop: "20.88%",
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
                  width: "75%",
                  borderColor: "rgba(0, 72, 125, 0.23)",
                  borderWidth: 2.75,
                  borderRadius: 4,
                  marginVertical: 6,
                  justifyContent: "center",
                  paddingLeft: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
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
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)", paddingTop: 5, paddingLeft: 11, justifyContent: 'flex-start' }}
                >
                  {age}
                </Text>
                <View style={{position: 'absolute', paddingLeft: 40}}> 
                  < Slider 
                    style={{width: 300, height: 35}}
                    minimumValue={0}
                    maximumValue={99}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {setAge(value); value = Math.round(value)}}
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
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Gender
              </Text>
              
              <View style={{
                width: 300,
                paddingTop: 10,
                color: '#FFFFF'
              }}>
                <SelectList 
                  setSelected={setGender}
                  data={genderList}
                  placeholder="Select gender"
                  search='false'
                />
              </View>

              {/* <SelectDropdown
                data={genderList}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              /> */}
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
                Height(in cm)
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)", paddingTop: 5, paddingLeft: 11, justifyContent: 'flex-start' }}
                >
                  {height}
                </Text>
                <View style={{position: 'absolute', paddingLeft: 40}}> 
                  < Slider 
                    style={{width: 300, height: 35}}
                    minimumValue={0}
                    maximumValue={213}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {setHeight(value); value = Math.round(value)}}
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
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Weight(in kg)
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)", paddingTop: 5, paddingLeft: 11, justifyContent: 'flex-start' }}
                >
                  {weight}
                </Text>
                <View style={{position: 'absolute', paddingLeft: 40}}> 
                  < Slider 
                    style={{width: 300, height: 35}}
                    minimumValue={0}
                    maximumValue={120}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value) => {setWeight(value); value = Math.round(value)}}
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
              }}
            >
              <Text
                style={{ fontSize: 17, color: "rgba(170, 219, 255, 0.87)" }}
              >
                Activity
              </Text>
              <SelectDropdown
                data={activityList}
                onSelect={(selectedItem, index) => {
                  set(selectedItem);
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
