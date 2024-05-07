import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
  return (
    <View>
      {/* <Image source={require("./assets/splash_screen.png")} /> */}
      <Text>HomeScreen</Text>
      <StatusBar style="auto" />
    </View>
  )
}