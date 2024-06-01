import { View, Text } from "react-native";
import React from "react";

export default function ProfileScreen({ route }) {
  console.log(route.name);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
}
