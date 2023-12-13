import "react-native-gesture-handler";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./Screens";
import BottomTabNav from "./Navigations/BottomTabNav";
import Main from "./Screens/Main";
import BetterAilments from "./Screens/BetterAilments";
import GlucoseGraph from "./Screens/GlucoseGraph";
import BloodPressureGraph from "./Screens/BloodPressureGraph";
import DietChart from "./Screens/DietChart";
import WorkoutPlan from "./Screens/WorkoutPlan";
import Allergies from "./Screens/Allergies";
import Loading from "./Screens/Loading";
import Login from "./Screens/Login";
import TimerSettings from "./Screens/TimerSettings";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BetterAilments"
          component={BetterAilments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Glucose"
          component={GlucoseGraph}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Allergies"
          component={Allergies}
          options={{ headerShown: false }}
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
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TimerSettings"
          component={TimerSettings}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
