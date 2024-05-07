import { View, Text } from 'react-native'
import React from 'react'
import { theme } from '../infrastructure/theme'
import { Button } from 'react-native-elements'

export default function AuthButton(props) {
    return (
        <Button title={props.title}
            buttonStyle={{
                backgroundColor: props.backgroundColor,
                width: 100 + "%",
                borderRadius: 20,
                color: props.color,
                borderWidth: props.borderWidth,
                borderColor:props.borderColor
            }}
            containerViewStyle={{
                marginVertical: 10,
                width: 70,
                backgroundColor: theme.colors.bg.primary,
            }}
            titleStyle={{
                color: props.color,
                fontFamily: theme.fonts.bold,
                fontSize: 20,
                fontWeight: '600'
            }} onPress={props.handleLogin} />
    )
}