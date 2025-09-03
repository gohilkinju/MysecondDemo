import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import firstScreen from './firstScreen';
import dashbordScreen from './dashbordScreen';
import thirdScreen from './thirdScreen';
import secondScreen from './secondScreen';
import forthScreen from './forthScreen';
import Weather from './weather';
import mainScreen from './mainScreen';
import weatherToday from './weatherToday';
import weatherSearch from './weatherSearch';
import weatherForecast from './weatherForecast';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import bottomTabs from './bottomTabs';
import SpeechToText from './speakToText';
import searchDetails from './searchDetails';
import images from './images';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


function bottomTabsNew() {
  return (
    
    <Tab.Navigator
          screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconPath;
    
          if (route.name === 'weatherToday') {
            iconPath = focused ? images.airQuality : images.airQuality;
          } else if (route.name === 'weatherForecast') {
            iconPath = focused ? images.airQuality : images.airQuality;
          } else if (route.name === 'weatherSearch') {
            iconPath = focused ? images.airQuality : images.airQuality;
          }
    
          return <Image source={iconPath} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
      backgroundColor: '#2C0E55', // set background color here
      borderTopColor: '#2C0E55', // set border color here
    
    },

      })}
        >
      <Tab.Screen name="weatherToday" component={weatherToday} />
      <Tab.Screen name="weatherForecast" component={weatherForecast} />
      <Tab.Screen name="weatherSearch" component={weatherSearch} />
    </Tab.Navigator>
  );
}
export default function navigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mainScreen"  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="firstScreen" component={firstScreen} />
        <Stack.Screen name="secondScreen" component={secondScreen} />
        <Stack.Screen name="dashbordScreen" component={dashbordScreen} />
        <Stack.Screen name="thirdScreen" component={thirdScreen} />
        <Stack.Screen name="forthScreen" component={forthScreen} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="mainScreen" component={mainScreen} />
        <Stack.Screen name="weatherToday" component={weatherToday} />
      <Stack.Screen name="weatherForecast" component={weatherForecast} />
      <Stack.Screen name="weatherSearch" component={weatherSearch} />
      <Stack.Screen name="bottomTabsNew" component={bottomTabsNew} />
      <Stack.Screen name="SpeechToText" component={SpeechToText} />
      <Stack.Screen name="searchDetails" component={searchDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
