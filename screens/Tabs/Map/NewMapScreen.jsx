import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
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
import { useIsFocused } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { SelectMarkerContext } from "../../../services/SelectMarkerContext";
import { useBottomSheet } from "../../../services/BottomSheetContext";
import { theme } from "../../../infrastructure/theme";
import { Button } from "@rneui/themed";
import { Feather, AntDesign } from "@expo/vector-icons";
import { styles as bs } from "./components/bottomSheet.styles.js";
import GlobalApi from "../../../utils/GlobalApi";
import { styles } from "./Styles/mapscreen.styles.js";
import MapViewDirections from "react-native-maps-directions";
import { useMapRef } from "../../../services/MapViewContext";
import LocationIcon from "./components/LocationIcon";

const NewMapScreen = ({ navigation }) => {
  const PLACE_PHOTO_BASE_URL =
    "https://maps.googleapis.com/maps/api/place/photo?";
  const GOOGLE_MAPS_APIKEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const bottomSheetRef = useBottomSheet();
  const {
    location,
    setLocation,
    placeListData,
    stationLocation,
    setStationLocation,
  } = useContext(UserLocationContext);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const snapPoints = useMemo(() => ["1%", "60%"]);
  const mapRef = useMapRef(null);
  const isFocused = useIsFocused();

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to reset showDirections when component unmounts or goes out of view
      setShowDirections(false);
    };
  }, []);
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
    bottomSheetRef.current?.dismiss();
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleMarkerPress = (marker) => {
    setShowDirections(false);
    setSelectedMarker(marker);
    bottomSheetRef.current !== null && bottomSheetRef.current?.present();
    bottomSheetRef.current === null &&
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 1500); // Open the bottom sheet
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
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
  const renderBottomSheet = () => {
    rating = Math.round(selectedMarker?.rating ? selectedMarker.rating : 0);
    const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1);

    for (let i = 0; i < rating; i++) {
      ratingArray[i] = i;
    }
    const gasStationPrices = [
      { name: "Fuel", price: 617.0, availability: "Available" },
      { name: "Kerosene", price: 200.0, availability: "Available" },
      { name: "Gas", price: 100.0, availability: "Available" },
    ];

    return !isEmpty(selectedMarker) ? (
      <BottomSheetView style={styles.contentContainer}>
        <View style={bs.container}>
          {isImageLoading && (
            <ImageBackground
              style={bs.loadingImage}
              imageStyle={bs.imageStyle}
              source={require("../../../assets/ImageLoading.png")}
            />
          )}
          <ImageBackground
            style={bs.fillingStationImage}
            imageStyle={bs.imageStyle}
            source={
              selectedMarker?.photos
                ? {
                    uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&photo_reference=${selectedMarker?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
                  }
                : require("../../../assets/ImageLoading.png")
            }
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
          />
          <View>
            <View style={bs.nameAvailabilityContainer}>
              <Text style={bs.name}>
                {truncateText(selectedMarker?.name, 20)}
              </Text>
              {selectedMarker.opening_hours ? (
                <Text
                  style={
                    selectedMarker?.opening_hours.open_now === true
                      ? bs.availability
                      : bs.availabilityClosed
                  }
                >
                  {selectedMarker?.opening_hours.open_now === true
                    ? "Opened"
                    : "Closed"}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={bs.rating}>
              {ratingArray.map((_, i) => (
                <AntDesign
                  key={i}
                  name={_ <= rating ? "star" : "staro"}
                  size={15}
                  color={theme.colors.bg.primary}
                />
              ))}
            </View>
            <View style={bs.row}>
              <Feather
                name="map-pin"
                size={20}
                color={theme.colors.bg.primary}
              />
              <Text style={bs.location}>{selectedMarker.vicinity}</Text>
            </View>
          </View>
          <View>
            {gasStationPrices.map((item, index) => (
              <View key={index} style={bs.product}>
                <Text style={bs.productName}>{item.name}:</Text>
                <Text style={bs.productPrice}>{item.price}</Text>
                <Text style={bs.productAvailability}>{item.availability}</Text>
              </View>
            ))}
          </View>
          <Button
            title={"Find Fuel"}
            buttonStyle={bs.buttonStyle}
            containerStyle={bs.buttonContainerStyle}
            onPress={traceRoute}
          />
        </View>
      </BottomSheetView>
    ) : (
      <Text style={{ textAlign: "center", color: theme.colors.text.primary }}>
        No Station Selected
      </Text>
    );
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
                    // setShowDirections(false);
                    setSelectedMarker(item);
                    // bottomSheetRef.current === null &&
                    setTimeout(() => {
                      bottomSheetRef.current?.present();
                    }, 1500); // Open the bottom sheet
                  }}
                />
              </View>
            </View>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              // customMapStyle={NewMapStyle}
              region={{
                latitude: stationLocation?.coords.latitude,
                longitude: stationLocation?.coords.longitude,
                latitudeDelta: 0.05922,
                longitudeDelta: 0.02731,
              }}
              onPress={handleCloseSheet}
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
                  strokeWidth={5}
                  strokeColor="#5D43FF"
                />
              )}
            </MapView>
            {/* <PanGestureHandler> */}
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
              {renderBottomSheet()}
            </BottomSheetModal>
            <LocationIcon goTo={animateToRegion} />
            {/* </PanGestureHandler> */}
          </View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    )
  );
};

export default NewMapScreen;
