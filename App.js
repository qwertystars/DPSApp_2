// import { 
//   StyleSheet,
//   SafeAreaView,  
//   StatusBar, 
//   Platform,
//   View,
//   ImageBackground,
//   Button,
//   Image,
//   TouchableWithoutFeedback} from 'react-native';
// import { useDeviceOrientation } from '@react-native-community/hooks'
// import { LineChart } from 'react-native-gifted-charts';

// const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

// export default function App() {
//   console.log("App executed");
//   const orientation = useDeviceOrientation();
//   const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground source={require('./assets/bg.jpg')} resizeMode='cover' style={{
//         flex: 1,
//         justifyContent: 'center'
//       }}>
//         {/* <Image source={require('./assets/favicon.png')} style={{
//           height: 100,
//           width: 100,
//           position: 'absolute',
//           top: 80,
//           left: 155
//         }}></Image>
//         <TouchableWithoutFeedback onPress={() => console.log("Tapped")}>
//           <View style={{
//             backgroundColor: '#fff',
//             height: '7%',
//             width: '100%',
//             position: 'absolute',
//             bottom: '0%'
//           }}></View>
//         </TouchableWithoutFeedback> */}
//         <LineChart data = {data} />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
// });

import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import React from 'react'
import BottomTabNav from './Navigations/BottomTabNav'
import { Profile } from './Screens'
import { SimpleLinearRegression } from 'ml-regression-simple-linear'

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

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName='BottomTabNavigation'
      >
        <Stack.Screen 
          name = 'BottomTabNavigation'
          component={BottomTabNav}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Profile'
          component={Profile}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
