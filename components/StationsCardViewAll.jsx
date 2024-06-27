import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { HomeScreenStyles as hs } from "../screens/Tabs/Home/Styles/homeScreen.styles";
import GlobalApi from "../utils/GlobalApi";

export default function StationsCard({ stations, locate }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const PLACE_PHOTO_BASE_URL =
    "https://maps.googleapis.com/maps/api/place/photo?";
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
      {isImageLoading && (
        <ImageBackground
          style={hs.loadingImageAll}
          imageStyle={hs.imageStyle}
          source={require("../assets/ImageLoading.png")}
        />
      )}
      <ImageBackground
        style={hs.fillingStationImage}
        source={
          stations?.photos
            ? {
                uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&photo_reference=${stations?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
              }
            : require("../assets/ImageLoading.png")
        }
        imageStyle={hs.imageStyle}
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
      ></ImageBackground>
      <View style={hs.fillingStationInfoAll}>
        <View>
          <Text style={hs.fillingStationName}>{stations?.name}</Text>
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
