import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";



const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="SelectPhoto" component={SelectPhoto} options={
        { tabBarLabel: '라이브러리'}
      } />
      <Tab.Screen name="TakePhoto" component={TakePhoto} options={
        { tabBarLabel: '사진'}
      } />
    </Tab.Navigator>
  );
};

export default () => (
  <Stack.Navigator screenOptions={
    
    {headerStyle: 
      {...stackStyles}
    }    
    }
   >
    <Stack.Screen name="PhotoTabs" component={PhotoTabs} options={{
      title: '사진함'
    }} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{
      title: '새 게시물',
      headerBackTitle: '취소'
    }} />
  </Stack.Navigator>
);