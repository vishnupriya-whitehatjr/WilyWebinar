import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Transaction from "./screens/transaction";
import Search from "./screens/search";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Transaction: { screen: Transaction },
    Search: { screen: Search },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName === "Transaction") {
          return (
            <Image
              source={require("./assets/transactionScreenImg.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        } else if (routeName === "Search") {
          return (
            <Image
              source={require("./assets/SearchScreenImage.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        }
      },
    }),
  }
);

const AppContainer = createAppContainer(TabNavigator);
