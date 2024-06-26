import { View, Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../../../components/utils/Safe-area.component";
import BackButton from "../../../../../components/BackButton";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../../infrastructure/theme";
import { ScrollView } from "react-native-gesture-handler";

export default function DashboardInfo({ navigation }) {
    const backToHome = () => {
        navigation.navigate("HomeScreen");
    };
    return (
        <SafeArea style={{}}>
            <View
                style={{
                    position: "relative",
                    flexDirection: "column",
                    marginTop: hp(6),
                }}
            >
                <BackButton onPress={backToHome} />
                <Text
                    style={{
                        fontSize: hp(4),
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.text.primary,
                        marginLeft: wp(5),
                    }}
                >
                    Dangote refinery begins sale of petroleum products
                </Text>
            </View>
            <View style={{ marginVertical: hp(1.5), flexDirection: "row", alignItems: "center", marginHorizontal: wp(5) }}>
                <Text
                    style={{
                        color: theme.colors.text.secondary,
                        fontSize: hp(1.6),
                        fontFamily: theme.fonts.body,
                    }}
                >
                    Punch Ng
                </Text>
                <Text
                    style={{
                        color: theme.colors.text.secondary,
                        fontSize: hp(1.6),
                        fontFamily: theme.fonts.body,
                        marginLeft: wp(5)
                    }}
                >
                    6 days ago
                </Text>
            </View>
            <ScrollView alwaysBounceVertical style={{ marginHorizontal: wp(5) }} contentContainerStyle={{ paddingBottom: hp(10) }}>
                <Text
                    style={{
                        fontFamily: theme.fonts.body,
                        fontSize: hp(2.3),
                        color: theme.colors.text.primary,
                        lineHeight:hp(4)
                    }}
                >
                    Dangote Refinery, Africa's largest oil refinery located in Lagos, has
                    started selling petroleum products, a major achievement for Nigeria's
                    energy sector. Processing 650,000 barrels of crude oil daily, it's
                    among the world's largest. Its entry into the market is set to
                    transform Nigeria's petroleum industry, reducing dependence on imports
                    and bolstering domestic production. The sales launch is anticipated to
                    impact the economy, energy security, and regional dynamics
                    significantly.Processing 650,000 barrels of crude oil daily, it's
                    among the world's largest. Its entry into the market is set to
                    transform Nigeria's petroleum industry, reducing dependence on imports
                    and bolstering domestic production. The sales launch is anticipated to
                    impact the economy, energy security, and regional dynamics
                    significantly.
                </Text>
            </ScrollView>
        </SafeArea>
    );
}
