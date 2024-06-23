import { View, Text } from 'react-native'
import React from 'react'
import { SafeArea } from '../../../../components/utils/Safe-area.component'
import { theme } from '../../../../infrastructure/theme'
import BackButton from '../../../../components/BackButton'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Notifications({ navigation }) {
    const backToHome = () => {
        navigation.navigate("HomeScreen");
    };
    return (
        <SafeArea>
            <View
                style={{
                    position: "relative",
                    marginTop: hp(6),
                }}
            >
                <BackButton onPress={backToHome} />
            </View>
            <View style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: theme.colors.text.primary, fontSize: hp(2) }}>This feature isn't available yet.</Text>
            </View>
        </SafeArea>
    )
}