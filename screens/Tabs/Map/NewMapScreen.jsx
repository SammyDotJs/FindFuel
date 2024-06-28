import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NewMapStyle } from "./Styles/NEWMAPSTYLE";
import { UserLocationContext } from "../../../services/user/UserLocationContext";
import GoogleSearchBar from "../../../components/GoogleSearchBar";
import CustomMarkers from "./CustomMarkers";
import BackButton from "../../../components/BackButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectMarkerContext } from "../../../services/SelectMarkerContext";
import { useBottomSheet } from "../../../services/BottomSheetContext";
import { styles } from "./Styles/mapscreen.styles.js";
import MapViewDirections from "react-native-maps-directions";
import { useMapRef } from "../../../services/MapViewContext";
import LocationIcon from "./components/LocationIcon";
import { RenderBottomSheet } from "./components/BottomSheetView";
import * as Animatable from "react-native-animatable";
import { theme } from "../../../infrastructure/theme";
import Modal from "react-native-modal";
import GlobalApi from "../../../utils/GlobalApi";

const PLACE_PHOTO_BASE_URL =
  "https://maps.googleapis.com/maps/api/place/photo?";

const NewMapScreen = ({ navigation }) => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const bottomSheetRef = useBottomSheet();
  const {
    location,
    setLocation,
    placeListData,
    stationLocation,
    setStationLocation,
    showDirections,
    setShowDirections,
  } = useContext(UserLocationContext);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const snapPoints = useMemo(() => ["1%", "60%"]);
  const mapRef = useMapRef(null);
  const [findBtn, setFindBtn] = useState(false);

  //UTIL FUNCTIONS
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    distance !== 0 && duration !== 0 && console.log(distance, duration);
  }, [duration, distance]);

  // useEffect(() => {
  //   findBtn === false && setSelectedMarker({});
  // }, [findBtn]);

  // NAVIGATIONS
  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  //BOTTOM SHEET
  const handleSheetChanges = useCallback((index) => {
    console.log("handle change", index);
    if (findBtn === false && index === 0) {
      console.log("close");
    }
  }, []);

  const handleCloseSheet = () => {
    bottomSheetRef?.current.dismiss();
  };
  const handleMarkerPress = (marker) => {
    setShowDirections(false);
    setSelectedMarker(marker);
    console.log(bottomSheetRef.current);
    bottomSheetRef.current !== null && bottomSheetRef?.current.present();
    bottomSheetRef.current === null &&
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 1500); // Open the bottom sheet
  };

  const animateToRegion = () => {
    const newRegion = {
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    };
    mapRef.current.animateToRegion(newRegion, 1000); // 1000 ms for the transition
  };
  // MAP DIRECTIONS
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

  const edgePaddingValue = 300;

  const edgePadding = {
    top: edgePaddingValue,
    bottom: edgePaddingValue,
    right: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  useEffect(() => {
    const getRoutes = () => {
      if (location && selectedMarker) {
        onPLaceSelected(location, "origin");
        onPLaceSelected(selectedMarker, "destination");
      } else {
        console.error("Didn't get origin and destination");
      }
    };
    !isEmpty(selectedMarker) && getRoutes();
  }, [selectedMarker]);
  const traceRoute = () => {
    setFindBtn(true);
    console.log(origin, destination);
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
    bottomSheetRef.current?.dismiss();
    setIsModalVisible(true);
  };
  return (
    location?.coords.latitude && (
      <TouchableWithoutFeedback>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View>
            <View
              style={{
                zIndex: 11,
                width: "90%",
                position: "absolute",
                top: 70,
              }}
            >
              <View style={styles.backButtonContainer}>
                <BackButton onPress={backToHome} />
              </View>
              <View style={styles.searchbar}>
                <GoogleSearchBar
                  searchedLocation={(location) =>
                    setStationLocation({
                      coords: {
                        latitude: location.lat,
                        longitude: location.lng,
                      },
                    })
                  }
                  placeList={placeListData}
                  selectMarker={(item) => {
                    setSelectedMarker(item);
                    setTimeout(() => {
                      bottomSheetRef.current?.present();
                    }, 1500);
                  }}
                />
              </View>
            </View>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={NewMapStyle}
              region={{
                latitude: stationLocation?.coords.latitude,
                longitude: stationLocation?.coords.longitude,
                latitudeDelta: 0.005922,
                longitudeDelta: 0.002731,
              }}
              // onPress={handleCloseSheet}
              // onMapLoaded={{}}
            >
              {location ? (
                <Marker
                  coordinate={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                  }}
                >
                  <Image
                    source={require("../../../assets/Userpointer.png")}
                    style={{ width: 33, height: 33 }}
                  />
                </Marker>
              ) : null}

              {placeListData &&
                placeListData.map((item, index) => (
                  <CustomMarkers
                    key={index}
                    place={item}
                    isSelected={
                      selectedMarker &&
                      selectedMarker.place_id === item.place_id
                    }
                    onPress={() => handleMarkerPress(item)}
                  />
                ))}

              {showDirections && origin && destination && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={6}
                  strokeColor="#5D43FF"
                  onReady={traceRouteOnReady}
                />
              )}
            </MapView>
            {isModalVisible && distance && duration ? (
              <View>
                <Modal
                  isVisible={isModalVisible}
                  style={styles.modal}
                  backdropOpacity={0}
                  onBackdropPress={() => {
                    setIsModalVisible(false);
                    setSelectedMarker({});
                  }}
                >
                  <View style={styles.modalView}>
                    <Text style={styles.duration}>
                      {Math.ceil(duration)} min away
                    </Text>
                    <View style={styles.imageContainer}>
                      {isImageLoading && (
                        <ImageBackground
                          style={styles.loadingImage}
                          imageStyle={hs.imageStyle}
                          source={require("../../../assets/ImageLoading.png")}
                        />
                      )}
                      <ImageBackground
                        style={styles.fillingStationImage}
                        imageStyle={styles.imageStyle}
                        source={{
                          uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&maxheight=800&photo_reference=${selectedMarker?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
                        }}
                        onLoadStart={() => setIsImageLoading(true)}
                        onLoadEnd={() => setIsImageLoading(false)}
                      />
                    </View>
                    <Text style={styles.duration}>{selectedMarker?.name}</Text>
                  </View>
                </Modal>
              </View>
            ) : null}
            <BottomSheetModal
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              snapPoints={snapPoints}
              index={1}
              backgroundStyle={{ borderRadius: 50 }}
              enablePanDownToClose={true}
              handleHeight={10}
              handleIndicatorStyle={{
                width: 100,
                marginTop: 10,
                height: 5,
                backgroundColor: "#455A64",
              }}
            >
              <RenderBottomSheet
                selectedMarker={selectedMarker}
                traceRoute={() => traceRoute()}
              />
            </BottomSheetModal>

            <LocationIcon goTo={animateToRegion} />
          </View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    )
  );
};

export default NewMapScreen;
