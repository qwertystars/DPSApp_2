import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function GlucoseGraph({ navigation }) {
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
          Ailments
        </Text>
      </View>
    </SafeAreaView>
  );
}
