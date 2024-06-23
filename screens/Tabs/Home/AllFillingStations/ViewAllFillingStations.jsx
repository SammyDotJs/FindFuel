import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeArea } from '../../../../components/utils/Safe-area.component'
import BackButton from '../../../../components/BackButton'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from '../../../../infrastructure/theme';
import StationsCard from '../../../../components/StationsCard';
import { LocationContext } from '../../../../services/LocationContext';
import { Skeleton } from "moti/skeleton";
import { MotiView } from 'moti'
import { HomeScreenStyles as hs } from "../HomeScreenStyles";


const Spacer = ({ height = hp(1) }) => <MotiView style={{ height }} />

const SkeletonLoader = () => {
    return (
        <View style={{ marginHorizontal: 10 }} colorMode="light">
            <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 20 }} colorMode="light">
                <Skeleton style={{ width: 120, height: 120, borderRadius: 10, justifyContent: "center" }} colorMode="light" width={wp(35)} height={hp(11)} />
                <Spacer />
                <View style={{ alignItems: "center" }}>
                    <Skeleton colorMode="light" width={wp(30)} height={hp(3)} />
                    <Spacer />
                    <Skeleton colorMode="light" width={wp(20)} height={hp(4)} radius={"round"} title="Locate" buttonStyle={hs.buttonStyle} titleStyle={hs.titleStyle} />
                </View>
            </View>
        </View>
    );
};


export default function ViewAllFillingStations({ route, navigation }) {
    const { handleStationSelect, isLoading } = useContext(LocationContext);

    const backToHome = () => {
        navigation.navigate("HomeScreen")
    }

    const renderSkeletonLoader = () =>
    (<View style={{ flexDirection: "column" }}>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />

    </View>)

    const locate = (item) => {
        navigation.navigate("Map")
        handleStationSelect(item)
    }
    const fillingStations = route.params
    return (
        <SafeArea style={{}}>
            <View style={{ position: "relative", flexDirection: "row", marginTop: hp(6) }}>
                <BackButton onPress={backToHome} />
                <Text style={{
                    fontSize: hp(2.5),
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.text.primary,
                    marginLeft: wp(5)
                }}>Close to you</Text>
            </View>
            {isLoading ? renderSkeletonLoader() : <FlatList data={fillingStations}
                style={{ marginTop: hp(5), marginHorizontal: wp(3) }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            // onPress={(e) => navigation.navigate("RestaurantDetail", { item })}
                            activeOpacity={0.5}
                        >
                            <StationsCard viewAll stations={item} locate={() => locate(item)} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => `${index}-${item.latitude}-${item.longitude}`}
                contentContainerStyle={{ paddingBottom: hp(10) }} showsVerticalScrollIndicator={false} />}
        </SafeArea>
    )
}