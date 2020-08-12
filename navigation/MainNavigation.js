import React from "react";
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import FollowerNavigation from "./FollowerNavigation";
import { stackStyles } from "./config";



const Stack = createStackNavigator();

const MainNavigation = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
      headerMode="none" mode="modal" initialRouteName="TabNavigation"
      screenOptions={{headerStyle: {...stackStyles},}}>
        <Stack.Screen name="취소" component={TabNavigation} />
        <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
        <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
        <Stack.Screen name="FollowerNavigation" component={FollowerNavigation} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;