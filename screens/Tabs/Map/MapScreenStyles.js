import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MapScreenStyles = StyleSheet.create({
    fillingStationInfo: {
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: hp(0.5),
        // width: "70%"
        marginRight:"auto"
    },
    fillingStationName: {
        fontSize: hp(1.5),
        fontFamily: theme.fonts.heading,
        color: theme.colors.text.primary
    },
    fillingStationAddress: {
        fontSize: hp(1.2),
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
        marginBottom: hp(0.9)
    },
    fillingStationImageInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    fillingStationImage: {
        // marginHorizontal: wp(3),
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: wp(34),
        height: hp(10),
        padding: wp(3),
    },
    fillingStationInfoAll: {
        width: "40%",
        marginLeft: wp(2)
    },
    modalContainer: {
        flexDirection: "row",
        // justifyContent: "center",
    },
    fsButtonStyleAll: {
        backgroundColor: theme.colors.bg.primary,
        borderRadius: 19,
        paddingVertical: hp(5),
        paddingHorizontal: wp(2),
        marginLeft: "auto"
    },
    routeButton: {
        width: "20%",
        marginLeft: "auto"
    }
})