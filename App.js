// React imports
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Dimensions, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Import screens
import CalmnessScreen from "./screens/CalmnessScreen";
import Avoid from "./screens/Avoid";
import About from "./screens/About";
import Examples from "./screens/Examples";
import ProblemSolve from "./screens/Problemsolve";
import Start from "./screens/Start";

// Other imports
import DrawerItems from "./constants/DrawerItems";
import {
  AntDesign,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Drawer = createDrawerNavigator();

export default function App() {
  // Import fonts
  const [loaded] = useFonts({
    InterRegular: require("./assets/fonts/Inter/Inter-Regular.ttf"),
    DMSerif: require("./assets/fonts/DM-Serif/DMSerifText-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // This function is used to implement specific styles for certain items in the drawer
  const getDrawerItemStyle = (route) => {
    if (route === "About") {
      return { marginTop: "auto" };
    } else if (route === "Start") {
      return {
        borderBottomColor: "#47665d",
        borderBottomWidth: 8,
      };
    }
  };

  // This function is used to implement specific styles for certain item labels (text) in the drawer
  const getDrawerLabelStyle = (route) => {
    if (route === "Start") {
      return { fontFamily: "DMSerif", fontSize: 30, color: "black" };
    } else return { fontFamily: "DMSerif", fontSize: 20, color: "black" };
  };

  return (
    // Wrap app in navigation
    <NavigationContainer>
      <Drawer.Navigator
        // Drawer settings
        drawerType="front"
        initialRouteName="Start"
        screenOptions={{
          drawerActiveBackgroundColor: "#598074",
          headerTitle: "",
          headerTransparent: true,
          drawerStyle: { backgroundColor: "#82B8A8" },
          drawerContentContainerStyle: { flex: 1 },
        }}
      >
        {DrawerItems.map((drawer) => (
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              drawerIcon: ({ focused }) =>
                drawer.iconType === "Material" ? (
                  <MaterialCommunityIcons name={drawer.iconName} size={24} />
                ) : drawer.iconType === "AntDesign" ? (
                  <AntDesign name={drawer.iconName} size={24} />
                ) : drawer.iconType === "IonIcons" ? (
                  <Ionicons name={drawer.iconName} size={24} />
                ) : drawer.iconType === "Feather" ? (
                  <Feather name={drawer.iconName} size={24} />
                ) : drawer.iconType === "Octicons" ? (
                  <Octicons name={drawer.iconName} size={24} />
                ) : (
                  <Feather name={drawer.iconName} size={24} />
                ),
              drawerItemStyle: getDrawerItemStyle(drawer.name),
              drawerLabelStyle: getDrawerLabelStyle(drawer.name),
              drawerLabel: () => (
                <Text style={getDrawerLabelStyle(drawer.name)}>
                  {drawer.labelText}
                </Text>
              ),
            }}
            component={
              drawer.name === "Calmness"
                ? CalmnessScreen


                : drawer.name === "Start"
                ? Start
                : drawer.name === "Examples"
                ? Examples
                : drawer.name === "Avoid"
                ? Avoid
                : drawer.name === "About"
                ? About
                : ProblemSolve
            }
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}