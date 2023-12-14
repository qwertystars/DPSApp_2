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
import MealList from "./MealList";

// NOT boolean value niye kaaj korte hobe stubid react native
export default Allergies = ({ navigation }) => {
  let mealResetDate = new Date();

  const [lactose, setLactose] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [peanuts, setPeanuts] = useState(false);
  const [soy, setSoy] = useState(false);
  const [treeNuts, setTreeNuts] = useState(false);
  const [seaFood, setSeaFood] = useState(false);

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState();

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

  async function setValueDB(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  function getMealData(calories) {
    const caloriM = parseInt(calories / 3);
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=938e60394e4d435ba65fe5e8139f02f2&includeNutrition=false&cuisine=Indian&minCalories=" +
        parseInt(caloriM / 2) +
        "&maxCalories=" +
        caloriM +
        `&number=21&excludeIngredients=pork,beef,lamb&intolerances=${
          lactose ? "dairy," : ""
        }${eggs ? "egg," : ""}${peanuts ? "peanut," : ""}${soy ? "soy," : ""}${
          treeNuts ? "tree nut," : ""
        }${lactose ? "dairy," : ""}${seaFood ? "seafood," : ""}`
    )
      .then((response) => response.json())
      .then((value) => {
        const arr1json = [value.results[0], value.results[1], value.results[2]];
        const arr1 = [
          JSON.stringify(value.results[0]),
          JSON.stringify(value.results[1]),
          JSON.stringify(value.results[2]),
        ];
        const arr2 = [
          JSON.stringify(value.results[3]),
          JSON.stringify(value.results[4]),
          JSON.stringify(value.results[5]),
        ];
        const arr3 = [
          JSON.stringify(value.results[6]),
          JSON.stringify(value.results[7]),
          JSON.stringify(value.results[8]),
        ];
        const arr4 = [
          JSON.stringify(value.results[9]),
          JSON.stringify(value.results[10]),
          JSON.stringify(value.results[11]),
        ];
        const arr5 = [
          JSON.stringify(value.results[12]),
          JSON.stringify(value.results[13]),
          JSON.stringify(value.results[14]),
        ];
        const arr6 = [
          JSON.stringify(value.results[15]),
          JSON.stringify(value.results[16]),
          JSON.stringify(value.results[17]),
        ];
        const arr7 = [
          JSON.stringify(value.results[18]),
          JSON.stringify(value.results[19]),
          JSON.stringify(value.results[20]),
        ];

        console.log(arr1);
        console.log(arr2);
        console.log(arr3);
        console.log(arr4);
        console.log(arr5);
        console.log(arr6);
        console.log(arr7);

        //setTodaysMeal(arr1json);

        setValueDB("Day1", arr1.join("~"));
        setValueDB("Day2", arr2.join("~"));
        setValueDB("Day3", arr3.join("~"));
        setValueDB("Day4", arr4.join("~"));
        setValueDB("Day5", arr5.join("~"));
        setValueDB("Day6", arr6.join("~"));
        setValueDB("Day7", arr7.join("~"));
      });
  }

  //SecureStore.deleteItemAsync("mealResetDate");

  function ResetMeal() {
    console.log("RESETTING MEAL");

    mealResetDate.setDate(mealResetDate.getDate() + 8);
    mealResetDate.setHours(0, 0, 0);
    //setMealResetDay(mealResetDate);
    setValueDB("mealResetDate", mealResetDate.toDateString());
    //setMealResetRemainingDays(7);

    if (height > 0) {
      const bmi = weight / ((height / 100) * (height / 100));
      let calsNeeded = 2000;

      if (gender == "MALE") {
        calsNeeded = 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (gender == "FEMALE") {
        calsNeeded = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      if (bmi > 24) {
        calsNeeded += 500;
      } else if (bmi < 19) {
        calsNeeded += 1000;
      } else {
        calsNeeded += 700;
      }
      calsNeeded = parseInt(calsNeeded);

      console.log(calsNeeded);

      getMealData(calsNeeded);
    } else {
      console.log("2000 u dombu");
      getMealData(2000);
    }
  }

  useEffect(() => {
    GetValueDB2("Height").then((value) => {
      if (value == "") {
      } else {
        setHeight(parseInt(value));
      }
    });

    GetValueDB2("Age").then((value) => {
      if (value == "") {
      } else {
        setAge(parseInt(value));
      }
    });

    GetValueDB2("Weight").then((value) => {
      if (value == "") {
      } else {
        setWeight(parseInt(value));
      }
    });

    GetValueDB2("Gender").then((value) => {
      if (value == "") {
      } else {
        setGender(value);
      }
    });

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
        <TouchableOpacity onPress={ResetMeal}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: "#FFF",
            }}
          ></View>
        </TouchableOpacity>
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
