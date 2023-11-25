import { View, Text } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  ImageBackground,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main, Profile } from "../Screens";
import { useState, useEffect } from "react";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "rgba(123,185,255,0.8)",
  },
};

const [loggedIn, setLoggedIn] = useState(false);


const BottomTabNav = () => {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
        if (value === null) {
            AsyncStorage.setItem('alreadyLaunched', 'true');
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
    })
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={26}
                color={focused ? "#245B79" : "#F6F4F1"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={26}
                color={focused ? "#245B79" : "#F6F4F1"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
