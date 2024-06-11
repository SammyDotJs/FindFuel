import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const HomeScreenStyles = StyleSheet.create({
    welcome: {
        // width: wp(90),
        marginHorizontal: wp(3),
        flexDirection: "row",
        marginTop: hp(6),
        justifyContent: "space-between",
        alignItems: "center"

    },
    welcomeInfo: {
        flexDirection: "row"
    },
    profileImage: {
        // borderWidth: 1,
        width: hp(8.5),
        height: hp(8.5),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.bg.tertiary
    },
    profileText: {
        fontSize: hp(3),
        fontFamily: theme.fonts.heading,
        color: theme.colors.text.primary
    },
    welcomeTexts: {
        marginLeft: wp(3),
        justifyContent: "center",
        alignItems: "flex-start"
    },
    h6: {
        fontSize: hp(1.5),
        fontFamily: theme.fonts.medium,
        color: theme.colors.text.primary
    },
    h2: {
        fontSize: hp(2.5),
        fontFamily: theme.fonts.bold,
        color: theme.colors.text.primary
    },
    notification: {
        width: hp(5),
        height: hp(5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: theme.colors.bg.tertiary
    },
    dashboardImage: {
        marginHorizontal: wp(3),
        marginTop: hp(3),
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: hp(16),
        padding: wp(3),
    },
    dashboardText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.text.white,
        fontSize: hp(2.3),
        width: wp(50)
    },
    imageStyle: {
        borderRadius: 15
    },
    buttonStyle: {
        backgroundColor: theme.colors.bg.primary,
        borderRadius: 50,
        paddingVertical: hp(0.6),
        paddingHorizontal: wp(5),
    },
    titleStyle: {
        fontFamily: theme.fonts.medium,
        fontSize: hp(1.5)
    },
    listsContainer: {
        marginTop: hp(3)
    },
    listTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: wp(3),
        marginBottom: hp(1)
    },
    listHeader: {
        fontSize: hp(2.5),
        fontFamily: theme.fonts.heading,
        color: theme.colors.text.primary
    },
    viewAll: {
        fontSize: hp(1.5),
        fontFamily: theme.fonts.medium,
        color: theme.colors.text.secondary
    },
    fillingStation: {
        justifyContent: "center",
        alignItems: "center",
    },
    fillingStationAll: {
        // width:wp(90),
        justifyContent: "start",
        alignItems: "flex-start",
        flexDirection: "row",
        marginBottom: hp(3),
    },
    fillingStationImage: {
        marginHorizontal: wp(3),
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: wp(35),
        height: hp(11),
        padding: wp(3),
    },
    fillingStationInfo: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: hp(1)
    },
    fillingStationInfoAll: {
        width: wp(50),
        justifyContent: "space-between",
        // alignItems: "flex-end",
        marginTop: hp(1),
        // borderWidth:1
    },
    fillingStationName: {
        fontSize: hp(1.5),
        fontFamily: theme.fonts.heading,
        color: theme.colors.text.primary,
        width: wp(25)
    },
    fillingStationPrice: {
        fontSize: hp(1.5),
        fontFamily: theme.fonts.medium,
        color: theme.colors.text.secondary,
        fontStyle: "italic",
        marginBottom: hp(0.9)
    },
    fsButtonStyle: {
        backgroundColor: theme.colors.bg.primary,
        borderRadius: 50,
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(9),
    },
    fsButtonStyleAll: {
        backgroundColor: theme.colors.bg.primary,
        borderRadius: 50,
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(9),
        marginLeft: "auto"
    },
})