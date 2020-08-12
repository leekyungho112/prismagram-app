import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";
import Followers from "../screens/Followers";
import Followings from "../screens/Followings";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


const FollowerTabs = () => {
  return (
    <Tab.Navigator tabBarPosition="top" >
      <Tab.Screen name="Followers" component={Followers} options={ 
        { tabBarLabel: '팔로워'}
      } />
      <Tab.Screen name="Followings" component={Followings} options={ 
        { tabBarLabel: '팔로잉'}
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
    <Stack.Screen name="FollowerTabs"  component={FollowerTabs} options={
    {
      title:'팔로우'
    }
    } />
    </Stack.Navigator>
  
);
