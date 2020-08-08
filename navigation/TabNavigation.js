import React from "react";
import styled from "styled-components";
import { View, Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search/SearchContainer";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import Detail from "../screens/Detail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";
import EditProfile from "../screens/EditProfile";
import Comments from "../screens/Comments";



const ImageView = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
  <Stack.Navigator screenOptions={{headerStyle:  {...stackStyles}}}>
    <Stack.Screen
      name={name}
      component={initialRoute}
      options={{ ...customConfig}}
   />
   <Stack.Screen name="Detail" component={Detail}  options={{title:'Photo'}}
   screenOptions={{
     headerTintColor: styles.blackColor,
     headerStyle:  {...stackStyles}}} />
   <Stack.Screen name="Comments" component={Comments}  options={{title:'댓글'}}
   screenOptions={{
     headerTintColor: styles.blackColor,
     headerStyle:  {...stackStyles}}} />
   <Stack.Screen name="EditProfile" component={EditProfile}  options={{title:'프로필 편집',
   headerBackTitle:'취소'}}
   screenOptions={{
     headerTintColor: styles.blackColor,
     headerStyle:  {...stackStyles}}} />
   <Stack.Screen name="UserDetail" component={UserDetail} options={{title: 'user'}} 
   screenOptions={    {    
           
            headerBackTitle:null,
            headerTintColor: styles.blackColor,
            headerStyle:  {...stackStyles}
    } }
             /> 
  </Stack.Navigator>
);

export default () => (
  <Tab.Navigator tabBarOptions={{
    showLabel:false,
    style: {
      backgroundColor: "#FAFAFA"
    }
  }}>
  
    <Tab.Screen name="Home" options={{tabBarIcon: ({focused}) =>(
    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />),
        }} >
      {() =>
        stackFactory(Home, "Home",        
        {
          
          headerRight: () => <MessagesLink />,
          headerTitle:
          <NavIcon name="logo-instagram"  size={36} />,
               
        })
        }
    </Tab.Screen>
    <Tab.Screen name="Search" options={{tabBarIcon: ({focused}) =>(
    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-search" : "md-search"} />),
        } } >
      {() =>
        stackFactory(Search,"Search",{
          headerBackTitle: null
        })
      }
    </Tab.Screen>
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("PhotoNavigation");
        },
      })}
      options={{tabBarIcon: ({focused}) =>(
        <NavIcon focused={focused} size={32} name={Platform.OS === "ios"
        ? "ios-add-circle-outline"
        : "md-add-circle-outline"} />),
            }}
    />
    <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused}) =>(
    <NavIcon focused={focused} name={ 
      Platform.OS === "ios"
      ? focused
      ? "ios-heart"
      : "ios-heart-empty"
      : focused
      ? "md-heart"
      : "md-heart-empty"} />),
        }}>
      {() =>
        stackFactory(Notifications, "Notifications", {
          title: "Notifications",
        })
      }
    </Tab.Screen>
    <Tab.Screen name="Profile" options={{tabBarIcon: ({focused}) =>(
    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"} />),
        }}>
      {() =>
        stackFactory(Profile, "Profile", {
          title: "Profile",
          tabBarOptions:{
            
            showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
          }
        })
      }
    </Tab.Screen>
  
  </Tab.Navigator>



  );
