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
import { Ailmetnts } from "./Screens";
import { SimpleLinearRegression } from "ml-regression-simple-linear";
import Ailments from "./Screens/Ailments";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    //black: require('./assets/fonts/Inter-Black.ttf'),
    //bold: require('./assets/fonts/Inter-Bold.ttf'),
    //medium: require('./assets/fonts/Inter-Medium.ttf'),
    //regular: require('./assets/fonts/Inter-Regular.ttf'),
    //semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

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
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ailments"
          component={Ailments}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
