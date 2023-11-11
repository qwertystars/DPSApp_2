import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  View,
} from "react-native";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { React, useState, useEffect} from "react";


export default BetterAilments = ({ navigation }) => {

    const [Diabetes, setDiabetes] = useState(false);
    const [PreDiabetes, setPreDiabetes] = useState(false);
    const [HighBloodPressure, setHighBloodPressure] = useState(false);
    const [LowBloodPressure, setLowBloodPressure] = useState(false);
    const [Obesity, setObesity] = useState(false);
    const [Cholesterol, setCholesterol] = useState(false);
    const [Arthiritis, setArthiritis] = useState(false);

    const Ailments = [];

    const click = () => {
        if (Diabetes == true) { Ailments.push("Diabetes") };
        if (PreDiabetes == true) { Ailments.push("PreDiabetes") };
        if (HighBloodPressure == true) { Ailments.push("HighBloodPressure") };
        if (LowBloodPressure == true) { Ailments.push("LowBloodPressure") };
        if (Obesity == true) { Ailments.push("Obesity") };
        if (Arthiritis == true) { Ailments.push("Arthiritis") };
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
        style={{flex: 1, /*justifyContent: "center",*/}} >
              <View
                  style={{
                      marginHorizontal: 0,
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "rgba(109, 149, 222, 0.7)",
                      height: "5%"
                  }}
              >
                  <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                          position: "absolute",
                          left: 0,
                      }}
                  >
                      <MaterialIcons name="keyboard-arrow-left" size={24} color={"rgba(0, 17, 43, 0.83)"} />
                  </TouchableOpacity>

                  <Text
                      style={{
                          fontSize: 20,
                          fontFamily: "sans-serif",
                          fontWeight: "bold",
                          color: "rgba(0, 17, 43, 0.9)"

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
                  justifyContent: "center",
                  backgroundColor: "rgba(109, 149, 222, 0.2)",
                  height: "90%",
              }}>
                  <CheckBox title="Diabetes" checked={Diabetes}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setDiabetes(!Diabetes)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }} />
                  <CheckBox title="PreDiabetes" checked={PreDiabetes}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setPreDiabetes(!PreDiabetes)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }} />
                  <CheckBox title="High Blood Pressure" checked={HighBloodPressure}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setHighBloodPressure(!HighBloodPressure)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }}/>
                  <CheckBox title="Low Blood Pressure" checked={LowBloodPressure}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setLowBloodPressure(!LowBloodPressure)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }}/>
                  <CheckBox title="Obesity" checked={Obesity}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setObesity(!Obesity)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }}/>
                  <CheckBox title="Cholesterol" checked={Cholesterol}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setCholesterol(!Cholesterol)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }}/>
                  <CheckBox title="Arthiritis" checked={Arthiritis}
                      checkedColor="rgba(0, 17, 43, 0.9)" uncheckedColor="rgba(0, 17, 43, 0.9)" onPress={() => setArthiritis(!Arthiritis)}
                      textStyle={{ color: "rgba(0, 17, 43, 0.9)" }} containerStyle={{ backgroundColor: "rgba(178, 198, 217, 0.83)", borderColor: "rgba(0, 17, 43, 0.5)", borderWidth: 2, }}/>
              </View>
    </ImageBackground>
    </SafeAreaView>
  );
};
