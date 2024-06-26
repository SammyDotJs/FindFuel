import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { HomeScreenStyles as hs } from "../screens/Tabs/Home/Styles/homeScreen.styles";
import GlobalApi from "../utils/GlobalApi";

export default function StationsCard({ stations, locate }) {
  // console.log(stations,"]]]]]]]]]]]]]]]]]]]]]]]")
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const navLocation = () => {
    locate();
  };
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  const stationImage = `${PLACE_PHOTO_BASE_URL}${stations?.photos[0]?.name}/media?key=${GlobalApi?.API_KEY}&maxHeightPx=800&maxWidthPx=1200`;
  return (
    <View style={hs.fillingStation}>
      <ImageBackground
        style={hs.fillingStationImage}
        source={
          stations?.photos
            ? {
                uri: stationImage,
              }
            : {
                uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg",
              }
        }
        imageStyle={hs.imageStyle}
      ></ImageBackground>
      <View style={hs.fillingStationInfo}>
        <Text style={hs.fillingStationName}>
          {truncateText(stations?.displayName.text, 20)}
        </Text>
        <Text style={hs.fillingStationPrice}>N680 per liter</Text>
        <Button
          title="Locate"
          buttonStyle={hs.buttonStyle}
          titleStyle={hs.titleStyle}
          onPress={() => navLocation()}
        />
      </View>
    </View>
  );
}
