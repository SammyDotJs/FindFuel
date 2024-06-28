import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
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
    <View style={hs.fillingStation}>
      <View style={hs.imageStyleContainer}>
        {isImageLoading && (
        <ImageBackground
          style={hs.loadingImage}
          imageStyle={hs.imageStyle}
          source={require("../assets/ImageLoading.png")}
        />
      )}
        <ImageBackground
          style={hs.fillingStationImage}
          imageStyle={hs.imageStyle}
          source={
            stations?.photos
              ? {
                  uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&maxheight=800&photo_reference=${stations?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
                }
              : require("../assets/ImageLoading.png")
          }
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
        />
      </View>
      <View style={hs.fillingStationInfo}>
        <View style={hs.fillingStationNameContainer}>
          <Text style={hs.fillingStationName}>{stations?.name}</Text>
        </View>
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
