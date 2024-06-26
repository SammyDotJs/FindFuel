import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { HomeScreenStyles as hs } from "../screens/Tabs/Home/Styles/homeScreen.styles";
import GlobalApi from "../utils/GlobalApi";

export default function StationsCard({ stations, locate }) {
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

  return (
    <View style={hs.fillingStationAll}>
      <ImageBackground
        style={hs.fillingStationImage}
        source={
          stations?.photos
            ? {
                uri: `${PLACE_PHOTO_BASE_URL}${stations?.photos[0]?.name}/media?key=${GlobalApi?.API_KEY}&maxHeightPx=800&maxWidthPx=1200`,
              }
            : {
                uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg",
              }
        }
        imageStyle={hs.imageStyle}
      ></ImageBackground>
      <View style={hs.fillingStationInfoAll}>
        <View>
          <Text style={hs.fillingStationName}>
            {stations?.displayName.text}
          </Text>
          <Text style={hs.fillingStationPrice}>N680 per liter</Text>
        </View>
        <View style={hs.fsButtonViewAll}>
          <Button
            title="Locate"
            buttonStyle={hs.fsButtonStyleAll}
            titleStyle={hs.titleStyle}
            onPress={() => navLocation()}
          />
        </View>
      </View>
    </View>
  );
}
