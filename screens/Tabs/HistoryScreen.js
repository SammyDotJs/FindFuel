import { View, Text } from "react-native";
import React, { useContext } from "react";
import { LocationContext } from "../../services/LocationContext";

export default function HistoryScreen({ route }) {
  console.log(route.name);
  const { userLocation } = useContext(LocationContext);
  console.log(userLocation);

  return (
    <View>
      <Text>HistoryScreen</Text>
    </View>
  );
}
