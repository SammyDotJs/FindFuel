import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Animatable from "react-native-animatable";
import SearchBarComponent from "../../../components/SearchBarComponent";
import BackButton from "../../../components/BackButton";
import { LocationContext } from "../../../services/LocationContext";
import Modal from "react-native-modal";
import { HomeScreenStyles as hs } from "../Home/HomeScreenStyles";
import { BottomSheet, Button } from "react-native-elements";
import { MapScreenStyles as ms } from "./MapScreenStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { MapStyle } from "./MAPSTYLE";
import LocationIcon from "./components/LocationIcon";
import MapViewDirections from "react-native-maps-directions";

const AnimatedMarker = Animatable.createAnimatableComponent(Marker);
const GOOGLE_MAPS_APIKEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";

export default function MapScreen({ route, navigation }) {
  const mapRef = useRef(null);
  const {
    userLocation,
    region,
    fillingStations,
    searchFillingStations,
    track,
    handleStationSelect,
    modalVisible,
    setModalVisible,
    selectedStation,
    onRegionChangeComplete,
    setSelectedStation,
    setMapRef,
  } = useContext(LocationContext);

  const [filteredStations, setFilteredStations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const calculateMarkerSize = useCallback((latitudeDelta) => {
    if (!latitudeDelta) return 1;
    const maxZoom = 20;
    const minZoom = 1;
    const zoomLevel = Math.log2(360 / latitudeDelta);
    return Math.max(minZoom, Math.min(maxZoom, zoomLevel));
  }, []);

  const markerSize = useMemo(
    () => calculateMarkerSize(region?.latitudeDelta),
    [region, calculateMarkerSize]
  );

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
    if (!modalVisible) {
      setShowDirections(false);
      setSelectedStation(null);
      setOrigin(0);
      setDestination(0);
    }
  }, []);

  const handleBodyPress = useCallback(() => {
    setIsExpanded(false);
    setIsDropdownVisible(false);
    Keyboard.dismiss();
  }, []);

  const getSearch = (data) => {
    searchFillingStations(data);
    const filtered = fillingStations.filter((station) =>
      station.name.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  const animateToRegion = () => {
    const newRegion = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    };
    mapRef.current.animateToRegion(newRegion, 1000); // 1000 ms for the transition
  };


  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const onPLaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;

    const position = {
      latitude:
        flag === "destination"
          ? details?.geometry.location.lat || 0
          : details?.coords.latitude,
      longitude:
        flag === "destination"
          ? details?.geometry.location.lng || 0
          : details?.coords.longitude,
    };
    set(position);
    moveTo(position);
  };

  const onMarkerPress = (station) => {
    handleStationSelect(station);
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    bottom: edgePaddingValue,
    right: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };
  const CustomMarker = ({ isSelected, ...props }) => {
    return (
      <AnimatedMarker {...props} animation={isSelected ? "zoomIn" : "zoomIn"}>
        <View style={styles.markerContainer}>
          <Image
            source={
              isSelected
                ? require("../../../assets/SelectedMarker.png")
                : require("../../../assets/FuelMapMarkers.png")
            }
            style={{
              width: isSelected ? markerSize * 3 : markerSize * 2,
              height: isSelected ? markerSize * 3 : markerSize * 2,
              resizeMode: "contain",
            }}
          />
        </View>
      </AnimatedMarker>
    );
  };

  useEffect(() => {
    const getRoutes = () => {
      if (userLocation && selectedStation) {
        onPLaceSelected(userLocation, "origin");
        onPLaceSelected(selectedStation, "destination");
      } else {
        console.error("Didn't get origin and destination");
      }
    };
    selectedStation && getRoutes();
  }, [selectedStation]);
  return (
    <TouchableWithoutFeedback onPress={handleBodyPress}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={backToHome} />
        </View>
        <View style={styles.searchContainer}>
          <SearchBarComponent
            onSearch={getSearch}
            filteredStations={filteredStations}
            expanded={isExpanded}
            dropdownVisible={isDropdownVisible}
          />
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBox}>
              <ActivityIndicator
                animating={true}
                size={30}
                color={theme.colors.bg.primary}
              />
            </View>
          </View>
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            region={region}
            onRegionChangeComplete={onRegionChangeComplete}
            style={styles.map}
            customMapStyle={MapStyle}
          >
            {userLocation && (
              <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
                title="Your Location"
              >
                <Image
                  source={require("../../../assets/Userpointer.png")}
                  style={{
                    width: markerSize * 2,
                    height: markerSize * 2,
                    // resizeMode: "cover",
                  }}
                />
              </Marker>
            )}

            {fillingStations.map((marker, index) => (
              <CustomMarker
                key={index}
                coordinate={{
                  latitude: marker.geometry.location.lat,
                  longitude: marker.geometry.location.lng,
                }}
                tracksViewChanges={false}
                isSelected={
                  selectedStation &&
                  selectedStation.place_id === marker.place_id
                }
                onPress={() => onMarkerPress(marker)}
                duration={1500}
                calloutName={marker.name}
              />
            ))}
            {showDirections && origin && destination && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="#5D43FF"
              />
            )}
          </MapView>
        )}

        <Modal
          isVisible={modalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
          backdropOpacity={0}
          animationIn="zoomIn"
          animationOut="slideOutDown"
          animationType="zoomIn"
          statusBarTranslucent
        >
          <View style={styles.modalContent}>
            {selectedStation && (
              <View style={ms.modalContainer}>
                <View style={ms.fillingStationInfo}>
                  <View style={ms.fillingStationImageInfo}>
                    <ImageBackground
                      style={ms.fillingStationImage}
                      source={{
                        uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg",
                      }}
                      imageStyle={hs.imageStyle}
                    ></ImageBackground>
                    <View style={ms.fillingStationInfoAll}>
                      <Text style={ms.fillingStationName}>
                        {selectedStation.name}
                      </Text>
                      <Text style={ms.fillingStationAddress}>
                        {selectedStation.vicinity}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={ms.routeButton}>
                  <Button
                    icon={
                      <FontAwesome5
                        name="location-arrow"
                        size={30}
                        color={theme.colors.bg.white}
                      />
                    }
                    buttonStyle={ms.fsButtonStyleAll}
                    titleStyle={hs.titleStyle}
                    onPress={traceRoute}
                  />
                </View>
              </View>
            )}
          </View>
        </Modal>
        <LocationIcon goTo={animateToRegion} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    width: wp(100),
    height: hp(93),
  },
  backButtonContainer: {
    top: hp(9),
    zIndex: 999,
    position: "absolute",
  },
  searchContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: wp(3),
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: hp(2),
    borderRadius: 20,
    width: "100%",
    marginBottom: hp(10),
    shadowColor: "#C7C7C7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadingBox: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: theme.colors.bg.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
});
