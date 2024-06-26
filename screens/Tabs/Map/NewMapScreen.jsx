import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React, { useCallback, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NewMapStyle } from "./Styles/NEWMAPSTYLE";
import { UserLocationContext } from "../../../services/user/UserLocationContext";
import GoogleSearchBar from "../../../components/GoogleSearchBar";
import CustomMarkers from "./CustomMarkers";
import BackButton from "../../../components/BackButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SelectMarkerContext } from "../../../services/SelectMarkerContext";
import { useBottomSheet } from "../../../services/BottomSheetContext";
import { theme } from "../../../infrastructure/theme";
import { Button } from "@rneui/themed";
import { Feather, AntDesign } from "@expo/vector-icons";
import { styles as bs } from "./components/bottomSheet.styles.js";
import GlobalApi from "../../../utils/GlobalApi";
import { styles } from "./Styles/mapscreen.styles.js";

const NewMapScreen = ({ navigation }) => {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const bottomSheetRef = useBottomSheet();
  const { location, setLocation, placeListData } =
    useContext(UserLocationContext);

  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleMarkerPress = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
    bottomSheetRef.current?.expand(); // Open the bottom sheet
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
  const renderBottomSheet = () => {
    console.log(selectedMarker);
    rating = 4;
    const ratingArray = Array.from(new Array(Math.floor(rating)));

    for (let i = 0; i < rating; i++) {
      ratingArray[i] = i;
    }
    const gasStationPrices = [
      { name: "Fuel", price: 617.0, availability: "Available" },
      { name: "Kerosene", price: 200.0, availability: "Available" },
      { name: "Gas", price: 100.0, availability: "Available" },
    ];

    return selectedMarker ? (
      <BottomSheetView style={styles.contentContainer}>
        <View style={bs.container}>
          <ImageBackground
            style={bs.fillingStationImage}
            imageStyle={bs.imageStyle}
            source={
              selectedMarker?.photos
                ? {
                    uri: `${PLACE_PHOTO_BASE_URL}${selectedMarker?.photos[0]?.name}/media?key=${GlobalApi?.API_KEY}&maxHeightPx=800&maxWidthPx=1200`,
                  }
                : {
                    uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg",
                  }
            }
          />
          <View>
            <View style={bs.nameAvailabilityContainer}>
              <Text style={bs.name}>
                {truncateText(selectedMarker?.displayName.text, 20)}
              </Text>
              <Text style={bs.availability}>Opened</Text>
            </View>
            <View style={bs.rating}>
              {ratingArray.map((_, i) => (
                <AntDesign
                  key={i}
                  name="star"
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
              <Text style={bs.location}>
                {selectedMarker.shortFormattedAddress}
              </Text>
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
          />
        </View>
      </BottomSheetView>
    ) : (
      <Text>No Station Selected</Text>
    );
  };
  return (
    location?.latitude && (
      <TouchableWithoutFeedback onPress={handleCloseSheet}>
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
                  searchedLocation={(location) => console.log(location)}
                  placeList={placeListData}
                />
              </View>
            </View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={NewMapStyle}
              region={{
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.05922,
                longitudeDelta: 0.02731,
              }}
            >
              {location ? (
                <Marker
                  coordinate={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
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
                    onPress={() => handleMarkerPress(item)}
                  />
                ))}
            </MapView>
            <BottomSheet
              ref={bottomSheetRef}
              onChange={handleSheetChanges}
              enableDynamicSizing={true}
              snapPoints={[600, 2]}
              index={-1}
              backgroundStyle={{ borderRadius: 50 }}
              enablePanDownToClose={true}
              style={{ zIndex: 9999999999 }}
              containerStyle={{ zIndex: 9999 }}
              handleHeight={10}
              handleIndicatorStyle={{
                width: 100,
                marginTop: 10,
                height: 5,
                backgroundColor: "#455A64",
              }}
            >
              {renderBottomSheet()}
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    )
  );
};

export default NewMapScreen;