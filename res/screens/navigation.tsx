

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from './loginScreen';
import splashScreen from './splashScreen';
import dashbordScreen from './dashbordScreen';
import orderDetailsScreen from './orderDetailsScreen';
import inventoryScreen from './inventoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrderProvider } from '../context/orderContext';
import { Image } from 'react-native';
import profile from './profile';
import { colors } from '../constants/colors';
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


function bottomTabsNew() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconPath;
                    if (route.name === 'invetory') {
                        // iconPath = focused ? images.ic_home : images.ic_home;
                    } else if (route.name === 'dashbord') {
                        // iconPath = focused ? images.forecast : images.forecast;
                    } else if (route.name === 'profile') {
                        // iconPath = focused ? images.ic_search : images.ic_search;
                    }

                    return;
                    //   <Image source={iconPath} style={{ width: size, height: size, tintColor: color }} />;
                },
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#2C0E55', // set background color here
                    borderTopColor: '#2C0E55', // set border color here

                },

            })}
        >
            <Tab.Screen name="inventoryScreen" component={inventoryScreen} />
            <Tab.Screen name="dashbordScreen" component={dashbordScreen} />
            <Tab.Screen name="profile" component={profile} />
        </Tab.Navigator>
    );
}
const navigation: React.FC = () => {
    return (
        <OrderProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="splashScreen" component={splashScreen} />
                        <Stack.Screen name="loginScreen" component={loginScreen} />
                        <Stack.Screen name="orderDetailsScreen" component={orderDetailsScreen} />
                        <Stack.Screen name="dashbordScreen" component={dashbordScreen} />
                        <Stack.Screen name="inventoryScreen" component={inventoryScreen} />
                        <Stack.Screen name="profile" component={profile} />
                        <Stack.Screen name="bottomTabsNew" component={bottomTabsNew} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView></OrderProvider>

    )
}
export default navigation;