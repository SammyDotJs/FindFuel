import { View, Text } from 'react-native'
import React from 'react'
import { theme } from '../../infrastructure/theme'

export default function HomeScreen() {
  return (
    <View style={{flex:1,backgroundColor:theme.colors.bg.white}}>
      <Text>HomeScreen</Text>
    </View>
  )
}