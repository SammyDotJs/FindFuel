import { View, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import SearchBarComponent from "../../../components/SearchBarComponent";

const API_KEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";
export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

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

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchFillingStations(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
    }
  }, [userLocation]);

  const fetchFillingStations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=50000&type=gas_station&key=${API_KEY}`
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000000&type=gas_station&key=${API_KEY}`
      );
      const data = await response.json();
      console.log(userLocation?.coords.latitude);
      setMarkers(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
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

        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
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
    width: wp(100),
    height: hp(100),
  },
});
