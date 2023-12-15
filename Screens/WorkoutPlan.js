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
import * as SecureStore from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
export default function WorkoutPlan({ navigation }) {
  const GetValueDB = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) return result;
    else return "";
  };

  var viewStyles = StyleSheet.create({
    View: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    Text: {
      fontSize: 17,
      color: "rgba(255,255,255,1)",
    },
  });

  const getHeightDB = async () => {
    let result = await SecureStore.getItemAsync("Height");
    if (result) setHeight(parseInt(result));
    else setHeight(140);
  };
  const getWeightDB = async () => {
    let result = await SecureStore.getItemAsync("Weight");
    if (result) setWeight(parseInt(result));
    else setWeight(74);
  };
  const getAgeDB = async () => {
    let result = await SecureStore.getItemAsync("Age");
    if (result) setAge(parseInt(result));
    else setAge(50);
    setNext(true);
  };

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);

  const [pgNo, setPgNo] = useState("middle1");

  const [next, setNext] = useState(false);

  useEffect(() => {
    setNext(false);
    console.log("Reloading");

    getHeightDB();
    getWeightDB();
    getAgeDB();
  }, []);

  useEffect(() => {
    const bmi = weight / ((height / 100) * (height / 100));
    console.log(bmi);
    console.log(age);
    if (bmi < 27) {
      if (age < 30) setPgNo("teen1");
      else if (age < 55) setPgNo("middle1");
      else if (age > 55) setPgNo("elderly1");
    } else {
      if (age < 30) setPgNo("teen2");
      else if (age < 55) setPgNo("middle2");
      else if (age > 55) setPgNo("elderly2");
    }

    // if (bmi < 27) {
    //   if (age < 30) console.log("teen1");
    //   else if (age < 55) console.log("middle1");
    //   else if (age > 55) console.log("elderly1");
    // } else {
    //   if (age < 30) console.log("teen2");
    //   else if (age < 55) console.log("middle2");
    //   else if (age > 55) console.log("elderly2");
    // }
  }, [next]);

  useEffect(() => {
    const bmi = weight / ((height / 100) * (height / 100));
    console.log(bmi);
    console.log(age);
    if (bmi < 27) {
      if (age < 30) setPgNo("teen1");
      else if (age < 55) setPgNo("middle1");
      else if (age > 55) setPgNo("elderly1");
    } else {
      if (age < 30) setPgNo("teen2");
      else if (age < 55) setPgNo("middle2");
      else if (age > 55) setPgNo("elderly2");
    }
    console.log(pgNo);
  }, [pgNo]);

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
          Workout Plan
        </Text>
      </View>
      <ImageBackground
        source={require("../assets/_bg.png")}
        resizeMode="cover"
        style={{
          flex: 1 /*justifyContent: "center",*/,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <ScrollView
          style={{
            height: 200,
            paddingLeft: 1,
          }}
        >
          <View
            style={{
              ...viewStyles.View,
              display: pgNo == "teen1" ? "flex" : "none",
            }}
          >
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 1: Cardio and Strength
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 5-10 minutes of light cardio (jumping jacks, high knees){" "}
              {"\n"}
              Cardiovascular Exercise: 30 minutes of running, cycling, or
              another favorite aerobic activity{"\n"}
              Strength Training:{"\n"}
              Body weight squats: 3 sets of 12-15 reps{"\n"}
              Push-ups: 3 sets of 10-12 reps{"\n"}
              Plank: 3 sets, hold for 30-60 seconds{"\n"}
              Cool Down: 5-10 minutes of stretching focusing on major muscle
              groups{"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 2: Active Rest or Light Activity
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Engage in light activities like walking, hiking, or playing a
              sport for fun.
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 3: Interval Training and Core Work
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 5-10 minutes of light cardio{"\n"}
              Interval Training: 20-30 minutes of alternating between
              high-intensity bursts (e.g., sprinting) and low-intensity recovery
              (e.g., walking){"\n"}
              Core Exercises:{"\n"}
              Bicycle crunches: 3 sets of 15-20 reps{"\n"}
              Leg raises: 3 sets of 12-15 reps{"\n"}
              Side plank: 3 sets, hold for 20-30 seconds on each side{"\n"}
              Cool Down: 5-10 minutes of stretching{"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 4: Rest or Active Recovery
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Take a complete rest day or engage in light activities like
              stretching or yoga.
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 5: Strength Training - Full Body
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 5-10 minutes of light cardio{"\n"}
              Full-Body Strength Training:{"\n"}
              Dumbbell or body weight lunges: 3 sets of 12-15 reps per leg{"\n"}
              Lat pulldowns or pull-ups: 3 sets of 10-12 reps{"\n"}
              Bench press or push-ups: 3 sets of 10-12 reps{"\n"}
              Dumbbell curls: 3 sets of 12-15 reps{"\n"}
              Tricep dips: 3 sets of 12-15 reps{"\n"}
              Cool Down: 5 - 10 minutes of stretching for the entire body{"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 6: Flexibility and Balance
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 5-10 minutes of light cardio or dynamic stretching{"\n"}
              Yoga or Pilates: 45 minutes to improve flexibility and balance
              {"\n"}
              Cool Down: 10 - 15 minutes of static stretching for the entire
              body{"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 7: Active Recreation
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Engage in recreational activities like playing sports, swimming,
              or biking for fun and social interaction.
            </Text>
          </View>

          <View
            style={{
              ...viewStyles.View,
              display: pgNo == "middle1" ? "flex" : "none",
            }}
          >
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 1: Cardiovascular Exercise
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 10 minutes of light aerobic exercise (brisk walking,
              cycling) {"\n"}
              Main Workout: 30-40 minutes of moderate-intensity cardio (walking,
              jogging, swimming, cycling) {"\n"}
              Cool Down: 10 minutes of stretching, focusing on major muscle
              groups {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 2: Strength Training - Full Body
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 10 minutes of light cardio (jumping jacks, marching in
              place) {"\n"}
              Main Workout:{"\n"}
              Squats or leg press: 3 sets of 10-12 reps{"\n"}
              Chest press or push-ups: 3 sets of 10-12 reps{"\n"}
              Lat pulldowns or rows: 3 sets of 10-12 reps{"\n"}
              Overhead press or shoulder raises: 3 sets of 10-12 reps{"\n"}
              Planks: 3 sets, holding for 30-60 seconds{"\n"}
              Cool Down: 10 minutes of stretching for the entire body {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 3: Active Recovery or Rest
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Light activities such as walking, yoga, or gentle stretching{" "}
              {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 4: Cardiovascular Exercise
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 10 minutes of light aerobic exercise {"\n"}
              Main Workout: 30-40 minutes of a different cardiovascular activity
              than Day 1 {"\n"}
              Cool Down: 10 minutes of stretching, focusing on major muscle
              groups {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 5: Flexibility and Core Training
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 10 minutes of light cardio or dynamic stretching {"\n"}
              Main Workout:{"\n"}
              Yoga or Pilates for flexibility and core strength: 30-45 minutes
              {"\n"}
              Core exercises (planks, bridges, twists): 3 sets of 12-15 reps
              {"\n"}
              Cool Down: 10-15 minutes of static stretching for the entire body{" "}
              {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 6: Strength Training - Lower Body and Balance
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Warm-up: 10 minutes of light cardio {"\n"}
              Main Workout:{"\n"}
              Lunges or step-ups: 3 sets of 10-12 reps per leg{"\n"}
              Leg curls or bridges: 3 sets of 12-15 reps{"\n"}
              Single-leg balance exercises: 3 sets of 30 seconds per leg{"\n"}
              Cool Down: 10 minutes of stretching for the lower body {"\n"}
            </Text>
            <Text style={{ ...viewStyles.Text, fontWeight: "bold" }}>
              Day 7: Rest or Active Recovery
            </Text>
            <Text style={{ ...viewStyles.Text }}>
              Complete rest or engage in light activities such as walking or
              gentle yoga. {"\n"}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
