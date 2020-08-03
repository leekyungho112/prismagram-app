import React from "react";
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";
import Detail from "../screens/Detail";
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
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;