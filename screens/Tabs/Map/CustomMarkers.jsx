import { Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const CustomMarkers = ({ place, onPress, isSelected }) => {
  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location?.lat,
        longitude: place.geometry.location?.lng,
      }}
      onPress={onPress}
    >
      <Image
        source={
          isSelected
            ? require("../../../assets/SelectedMarker.png")
            : require("../../../assets/FuelMapMarkers.png")
        }
        style={{ width: 50, height: 50, resizeMode: "contain" }}
      />
    </Marker>
  );
};

export default CustomMarkers;
