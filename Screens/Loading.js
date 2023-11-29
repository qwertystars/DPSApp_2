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
} from "react-native";
import { useState, useEffect } from "react";
import Video from "react-native-video";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Slider from "@react-native-community/slider";
import { SelectList } from "react-native-dropdown-select-list";
import { Dimensions } from "react-native";

import * as SecureStore from "expo-secure-store";


export default function Loading({ navigation }) {
    const [currentPage, setCurrentPage] = useState(1);
    const GetValueDB = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) return result;
        else return "";
    };

    async function SetValueDB(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1,
                backgroundColor: "rgba(93, 152, 255, 0.83)",
            }}
        >
            <Video
                source={require("../assets/MidicoachLogo.mp4")}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />
        </SafeAreaView>
    )
}
