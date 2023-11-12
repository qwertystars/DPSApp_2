import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  View,
  Button,
} from "react-native";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { React, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default BetterAilments = ({ navigation }) => {
  const [diabetes, setDiabetes] = useState(false);
  const [preDiabetes, setPreDiabetes] = useState(false);
  const [highBloodPressure, setHighBloodPressure] = useState(false);
  const [lowBloodPressure, setLowBloodPressure] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [arthiritis, setArthiritis] = useState(false);

  const Ailments = [];
 
  const click = () => {
    if (diabetes == true) {
        Ailments.push(true);
    } else Ailments.push(false);
    if (preDiabetes == true) {
      Ailments.push(true);
    } else Ailments.push(false);
    if (highBloodPressure == true) {
      Ailments.push(true);
    } else Ailments.push(false);
    if (lowBloodPressure == true) {
      Ailments.push(true);
    } else Ailments.push(false);
    if (obesity == true) {
      Ailments.push(true);
    } else Ailments.push(false);
    if (cholesterol == true) {
          Ailments.push(true);
    } else Ailments.push(false);
    if (arthiritis == true) {
        Ailments.push(true);
    } else Ailments.push(false);
      console.log(Ailments);
  };

  //-------------------------------------------------------

  const getValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result == "true" ? true : false;
    else return false;
  };

  async function setValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    getValueDB("diabetes").then((value) => {
      //console.log(value);
    });
  }, []);

  //-------------------------------------------------------

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
        style={{ flex: 1 /*justifyContent: "center",*/ }}
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
            onPress={() => {navigation.goBack();}}
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
            Ailments
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 12,
            marginTop: "5%",
            flexDirection: "column",
            //justifyContent: "center",
            paddingTop: 20,
            backgroundColor: "rgba(109, 149, 222, 0.2)",
            height: "90%",
          }}
        >
          <CheckBox
            title="Diabetes"
            checked={diabetes}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
                setDiabetes(!diabetes);
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="PreDiabetes"
            checked={preDiabetes}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setPreDiabetes(!preDiabetes)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="High Blood Pressure"
            checked={highBloodPressure}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setHighBloodPressure(!highBloodPressure)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Low Blood Pressure"
            checked={lowBloodPressure}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setLowBloodPressure(!lowBloodPressure)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Obesity"
            checked={obesity}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setObesity(!obesity)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Cholesterol"
            checked={cholesterol}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setCholesterol(!cholesterol)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Arthiritis"
            checked={arthiritis}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => setArthiritis(!arthiritis)}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
            />
          <Button title="Update" onPress = {click}/>
        </View>
      </ImageBackground>
      </SafeAreaView>
  );
};
