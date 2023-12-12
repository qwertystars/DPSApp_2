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
import { React, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// NOT boolean value niye kaaj korte hobe stubid react native
export default Allergies = ({ navigation }) => {
  const [lactose, setLactose] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [peanuts, setPeanuts] = useState(false);
  const [soy, setSoy] = useState(false);
  const [treeNuts, setTreeNuts] = useState(false);
  const [seaFood, setSeaFood] = useState(false);
  const [pollen, setPollen] = useState(false);
  const [dust, setDust] = useState(false);

  const getValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result == "true" ? true : false;
    else return false;
  };

  async function setValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    getValueDB("lactose").then((value) => {
      setLactose(value == true ? true : false);
    });

    getValueDB("eggs").then((value) => {
      setEggs(value == true ? true : false);
    });

    getValueDB("peanuts").then((value) => {
      setPeanuts(value == true ? true : false);
    });

    getValueDB("soy").then((value) => {
      setSoy(value == true ? true : false);
    });

    getValueDB("treeNuts").then((value) => {
      setTreeNuts(value == true ? true : false);
    });

    getValueDB("seaFood").then((value) => {
      setSeaFood(value == true ? true : false);
    });

    // getValueDB("pollen").then((value) => {
    //   setPollen(value == true ? true : false);
    // });

    // getValueDB("dust").then((value) => {
    //   setDust(value == true ? true : false);
    // });
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
            Allergies
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
            title="Lactose"
            checked={lactose}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setLactose(!lactose);
              setValueDB("lactose", lactose == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Eggs"
            checked={eggs}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setEggs(!eggs);
              setValueDB("eggs", eggs == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Peanuts"
            checked={peanuts}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setPeanuts(!peanuts);
              setValueDB("peanuts", peanuts == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Soy"
            checked={soy}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setSoy(!soy);
              setValueDB("soy", soy == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Tree Nuts"
            checked={treeNuts}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setTreeNuts(!treeNuts);
              setValueDB("treeNuts", treeNuts == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Sea Food"
            checked={seaFood}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setSeaFood(!seaFood);
              setValueDB("seaFood", seaFood == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          {/* <CheckBox
            title="Pollen"
            checked={pollen}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setPollen(!pollen);
              setValueDB("pollen", pollen == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          />
          <CheckBox
            title="Dust"
            checked={dust}
            checkedColor="rgba(0, 17, 43, 0.9)"
            uncheckedColor="rgba(0, 17, 43, 0.9)"
            onPress={() => {
              setDust(!dust);
              setValueDB("dust", dust == true ? "false" : "true");
            }}
            textStyle={{ color: "rgba(0, 17, 43, 0.9)" }}
            containerStyle={{
              backgroundColor: "rgba(178, 198, 217, 0.83)",
              borderColor: "rgba(0, 17, 43, 0.5)",
              borderWidth: 2,
            }}
          /> */}
          {/*<Button title="Update" onPress={click} />*/}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
