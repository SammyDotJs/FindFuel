import { Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";

const AnimatedMarker = Animatable.createAnimatableComponent(Marker);

const CustomMarkers = ({ place, onPress, isSelected }) => {
  return (
    <AnimatedMarker
      coordinate={{
        latitude: place.geometry.location?.lat,
        longitude: place.geometry.location?.lng,
      }}
      onPress={onPress}
      animation={isSelected ? "zoomIn" : "fadeIn"}
    >
      <Image
        source={
          isSelected
            ? require("../../../assets/SelectedMarker.png")
            : require("../../../assets/FuelMapMarkers.png")
        }
        style={{
          width: isSelected ? 60 : 50,
          height: isSelected ? 50 : 50,
          resizeMode: "contain",
        }}
      />
    </AnimatedMarker>
  );
};

export default CustomMarkers;
