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

// NOT boolean value niye kaaj korte hobe stubid react native
export default BetterAilments = ({ navigation }) => {
  const [diabetes, setDiabetes] = useState(false);
  const [preDiabetes, setPreDiabetes] = useState(false);
  const [highBloodPressure, setHighBloodPressure] = useState(false);
  const [lowBloodPressure, setLowBloodPressure] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [arthiritis, setArthiritis] = useState(false);
  const [migraine, setMigraine] = useState(false);
  const [pulmonaryDisease, setPulmonaryDisease] = useState(false);

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

    getValueDB("obesity").then((value) => {
      setObesity(value == true ? true : false);
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
  }, []);

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
            Medical History
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
              setValueDB("diabetes", diabetes == true ? "false" : "true");
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
            onPress={() => {
              setPreDiabetes(!preDiabetes);
              setValueDB("preDiabetes", preDiabetes == true ? "false" : "true");
            }}
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
            onPress={() => {
              setHighBloodPressure(!highBloodPressure);
              setValueDB(
                "highBloodPressure",
                highBloodPressure == true ? "false" : "true"
              );
            }}
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
            onPress={() => {
              setLowBloodPressure(!lowBloodPressure);
              setValueDB(
                "lowBloodPressure",
                lowBloodPressure == true ? "false" : "true"
              );
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          {/* <CheckBox
            title="Obesity"
            checked={obesity}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setObesity(!obesity);
              setValueDB("obesity", obesity == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          /> */}
          <CheckBox
            title="Cholesterol"
            checked={cholesterol}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setCholesterol(!cholesterol);
              setValueDB("cholesterol", cholesterol == true ? "false" : "true");
            }}
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
            onPress={() => {
              setArthiritis(!arthiritis);
              setValueDB("arthiritis", arthiritis == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Migraine"
            checked={migraine}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setMigraine(!migraine);
              setValueDB("migraine", migraine == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Pulmonary Disease"
            checked={pulmonaryDisease}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setPulmonaryDisease(!pulmonaryDisease);
              setValueDB(
                "pulmonaryDisease",
                pulmonaryDisease == true ? "false" : "true"
              );
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          {/*<Button title="Update" onPress={click} />*/}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
