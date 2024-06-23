import { Platform } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  HomeScreen,
  ViewAllFillingStations,
  DashboardInfo,
  Notifications,
} from "../../index";

const ios = Platform.OS === "ios";

const HomeScreenStack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
  // ...(ios
  //     ? TransitionPresets.ModalPresentationIOS
  //     : TransitionPresets.FadeFromBottomAndroid)
};

export default function HomeScreenNavigator() {
  return (
    <HomeScreenStack.Navigator
      screenOptions={ScreenOptions}
      initialRouteName="HomeScreen"
    >
      <HomeScreenStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeScreenStack.Screen
        name="AllStations"
        component={ViewAllFillingStations}
      />
      <HomeScreenStack.Screen name="DashboardInfo" component={DashboardInfo} />
      <HomeScreenStack.Screen name="Notifications" component={Notifications} />
    </HomeScreenStack.Navigator>
  );
}
