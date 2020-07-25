import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import { View, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";



const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
          title: "Home",
          headerRight: (
            <TouchableOpacity>
              <Text>Hello</Text>
            </TouchableOpacity>
          )
        })
      },
    Search,
    Add: {
        screen: View,
        navigationOptions: {
          tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation")
        }
      },
    Notifications,
    Profile

});

