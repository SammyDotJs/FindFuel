import { Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const CustomMarkers = ({ place, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}
      onPress={onPress}
    >
      <Image
        source={require("../../../assets/FuelMapMarkers.png")}
        style={{ width: 50, height: 50, resizeMode: "contain" }}
      />
    </Marker>
  );
};

export default CustomMarkers;
