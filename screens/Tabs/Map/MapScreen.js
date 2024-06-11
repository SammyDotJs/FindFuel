import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
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
import Modal from 'react-native-modal';
import { HomeScreenStyles as hs } from "../Home/HomeScreenStyles";
import { Button } from "react-native-elements";
import { MapScreenStyles as ms } from "./MapScreenStyles";
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from "../../../infrastructure/theme";


export default function MapScreen({ route, navigation }) {
  const { userLocation, region, fillingStations, track, searchFillingStations } = useContext(LocationContext);
  const backToHome = () => {
    navigation.navigate("Home")
  }

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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onMarkerPress = (station) => {
    setSelectedStation(station);
    toggleModal();
  };
  const handleBodyPress = () => {
    // if (isExpanded) {
    // setIsExpanded(false);
    Keyboard.dismiss();
    // }
  };
  const getSearch = (data) => {
    // console.log(data);
    searchFillingStations(data)
  }

  return (
    <TouchableWithoutFeedback onPress={handleBodyPress}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View style={{ width: "100%", position: "absolute", marginTop: hp(5), backgroundColor: "#000" }}> */}
        <View style={{ top: hp(9), zIndex: 999, position: "absolute" }}>
          <BackButton onPress={backToHome} />
        </View>
        <View style={{ width: "95%", justifyContent: "center", alignItems: "flex-end", marginRight: wp(3), }}>
          <SearchBarComponent onSearch={getSearch} />
          <View style={{
            backgroundColor: "#fff", justifyContent: "center",
            padding: hp(2),
            position: "absolute",
            zIndex: 999,
            top: hp(15),
            width: "80%",
            borderRadius: 10
          }}>
            {fillingStations.map(item => <Text style={{ marginBottom: hp(1) }}>{item.name}</Text>)}
          </View>
        </View>
        {/* </View> */}
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
                // title={marker.name}
                // description={marker.vicinity}
                tracksViewChanges={track}
                onPress={() => onMarkerPress(marker)}
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
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={{
          alignItems: "center",
          justifyContent: "flex-end"
        }} backdropOpacity={0}>
          <View style={styles.modalContent}>
            {selectedStation &&
              <View style={ms.modalContainer}>
                <View style={ms.fillingStationInfo}>
                  <View style={ms.fillingStationImageInfo}>
                    <ImageBackground style={ms.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

                    </ImageBackground>
                    <View style={ms.fillingStationInfoAll}>
                      <Text style={ms.fillingStationName}>{selectedStation.name}</Text>
                      <Text style={ms.fillingStationAddress}>{selectedStation.vicinity}</Text>
                    </View>
                  </View>
                  <View>
                  </View>
                </View>
                <View style={ms.routeButton}>
                  <Button icon={<FontAwesome5 name="location-arrow" size={30} color={theme.colors.bg.white} />} buttonStyle={ms.fsButtonStyleAll} titleStyle={hs.titleStyle} />
                </View>
              </View>
            }
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
  modalContent: {
    backgroundColor: 'white',
    padding: hp(2),
    borderRadius: 20,
    // alignItems: 'center',
    width: "100%",
    marginBottom: hp(10),
    shadowColor: '#C7C7C7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 7,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalDetails: {
    fontSize: 14,
    marginTop: 10,
  },
});
