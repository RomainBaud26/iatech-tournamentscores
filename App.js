import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Store from "./store/store";
import {Provider} from "react-redux";
import Accordion from "./Accordion/Accordion";


const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
 
      Accordion: {
        screen: Accordion,
        navigationOptions: {
          title: "Tournament details"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#1E90FF',//StyleGuide.palette.primary, 
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <Provider store={Store}>
   
    <StatusBar barStyle="light-content" />
    <AppNavigator />

  </Provider>
);
