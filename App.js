import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import React from "react";
import BottomTabNav from "./Navigations/BottomTabNav";
import { Profile } from "./Screens";
import { Main } from "./Screens";
import BetterAilments from "./Screens/BetterAilments";
import GlucoseGraph from "./Screens/GlucoseGraph";
import BloodPressureGraph from "./Screens/BloodPressureGraph";
import DietChart from "./Screens/DietChart";
import WorkoutPlan from "./Screens/WorkoutPlan";
import Allergies from "./Screens/Allergies";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({});

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="BottomTabNavigation">
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BetterAilments"
          component={BetterAilments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Allergies"
          component={Allergies}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Glucose"
          component={GlucoseGraph}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BloodPressure"
          component={BloodPressureGraph}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DietChart"
          component={DietChart}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WorkoutPlan"
          component={WorkoutPlan}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
