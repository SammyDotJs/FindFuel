import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components'


const AuthInput = styled(View)`
    justify-content: center;
    align-items: center;
`


export default function AuthTextInput(props) {
    return (
        <AuthInput>
            <View>
                <Text style={styles.authTextLabel}>{props.textLabel}</Text>
                <TextInput
                    onFocus={customOnFocus}
                    onBlur={customOnBlur}
                    style={styles.authTextInput}
                    onChangeText={newText => setText(newText)}
                    defaultValue={text} />
            </View>
        </AuthInput>
    )
}

const styles = StyleSheet.create({
    authTextLabel: {
        color: theme.colors.text.foundation,
        fontSize: hp(2),
        fontFamily: theme.fonts.heading,
        padding: 0,
        textAlign: "left",
        marginTop: hp(2)
    },
    authTextInput: {
        width: wp(90),
        height: hp(3.5),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.text.foundation,
        fontSize: hp(2),
        fontFamily: theme.fonts.bold
    },
})