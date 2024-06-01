import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBarComponent from "../../../components/SearchBarComponent";
import BackButton from "../../../components/BackButton";
import { LocationContext } from "../../../services/LocationContext";

export default function MapScreen({ route }) {
  const { userLocation, region, fillingStations, track } = useContext(LocationContext);
  console.log(route);


  const calculateMarkerSize = (latitudeDelta) => {
    if (!latitudeDelta) return 1;
    const maxZoom = 20;
    const minZoom = 1;
    const zoomLevel = Math.log2(360 / latitudeDelta);
    const size = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
    return size;
  };

  const markerSize = useMemo(
    () => calculateMarkerSize(region?.latitudeDelta),
    [region]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <BackButton />
      </View>
      <SearchBarComponent />
      <MapView showsUserLocation={false} region={region} style={styles.map}>
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation?.coords.latitude,
              longitude: userLocation?.coords.longitude,
            }}
            title="Your Location"
          >
            <Image
              source={require("../../../assets/Userpointer.png")}
              style={{ width: markerSize * 2, height: markerSize * 2 }}
            />
          </Marker>
        )}

        {fillingStations?.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
              tracksViewChanges={track}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../../../assets/FuelMapMarkers.png")}
                  style={{
                    width: markerSize * 2,
                    height: markerSize * 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
});
