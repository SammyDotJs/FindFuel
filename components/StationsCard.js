import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { HomeScreenStyles as hs } from "../screens/Tabs/Home/HomeScreenStyles";


export default function StationsCard({ stations, viewAll, locate }) {
    const navLocation = () => {
        locate()
    }
    return viewAll ? <View style={hs.fillingStationAll}>
        <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg" }} imageStyle={hs.imageStyle}>

        </ImageBackground>
        <View style={hs.fillingStationInfoAll}>
            <View>
                <Text style={hs.fillingStationName}>{stations.name}</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
            </View>
            <View style={hs.fsButtonViewAll}>
                <Button title="Locate" buttonStyle={hs.fsButtonStyleAll} titleStyle={hs.titleStyle} onPress={() => navLocation()} />
            </View>
        </View>
    </View> : <View style={hs.fillingStation}>
        <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg" }} imageStyle={hs.imageStyle}>

        </ImageBackground>
        <View style={hs.fillingStationInfo}>
            <Text style={hs.fillingStationName}>{stations.name}</Text>
            <Text style={hs.fillingStationPrice}>N680 per liter</Text>
            <Button title="Locate" buttonStyle={hs.buttonStyle} titleStyle={hs.titleStyle} onPress={() => navLocation()} />
        </View>
    </View>


}