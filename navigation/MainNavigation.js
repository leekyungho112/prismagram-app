import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const MainNavigation = createStackNavigator({
    TabNavigation,
    PhotoNavigation
   
},{
    headerMode:"none",
    mode:"modal"
});

export default NavigationContainer(MainNavigation);