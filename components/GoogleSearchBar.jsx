import React, { useState, useRef, useEffect, useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View, Animated, StyleSheet, Keyboard } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Fontisto, Feather } from "@expo/vector-icons";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { UserLocationContext } from "../services/user/UserLocationContext";

const GoogleSearchBar = ({ searchedLocation, placeList, selectMarker }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputWidth = useRef(new Animated.Value(40)).current; // Initial width
  const searchRef = useRef(null);
  const { location } = useContext(UserLocationContext);

  const searchLocation = {
    lat: location?.coords.latitude,
    lng: location?.coords.longitude,
  };

  useEffect(() => {
    if (isFocused) {
      Animated.timing(inputWidth, {
        toValue: wp(75), // Final width
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(inputWidth, {
        toValue: 50, // Initial width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchRef.current) {
      searchRef.current.setAddressText("");
    }
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handlePlaceSelect = (rowData) => {
    if (!rowData) return;
    console.log(rowData);

    // Set searched location based on selected place
    searchedLocation(rowData.geometry.location);

    // Find the matching place from placeList
    const selectedPlace = placeList.find((place) => place.place_id === rowData.place_id);

    if (selectedPlace) {
      // Set the selected marker
      selectMarker(selectedPlace);
    }

    // Collapse the search bar after selection
    handleBlur();
  };

  const renderRow = (rowData) => {
    console.log(rowData)
    return (
      // <TouchableOpacity>
        <View style={styles.row}>
          <Feather name="map-pin" size={20} color={theme.colors.bg.primary} />
          <Text style={styles.placeName}>{rowData.description}</Text>
        </View>
      // {/* </TouchableOpacity> */}
    );
  };

  const renderDescription = (row) => {
    return (
      <Text style={styles.description}>
        {row.description.split(",")[0]}{" "}
        {/* Displaying only the first part of the address */}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { width: inputWidth }]}>
        {isFocused ? (
          <>
            <Fontisto
              name="search"
              size={20}
              color={theme.colors.bg.primary}
              style={{ marginTop: 14 }}
            />
            <GooglePlacesAutocomplete
              ref={searchRef}
              placeholder="Search for a Fuel station"
              placeholderTextColor={theme.colors.text.placeholder}
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log(details?.place_id, "DETAILS");
                searchedLocation(details?.geometry.location);
                setTimeout(() => {
                  handlePlaceSelect(details)
                }, 2000);
                setTimeout(() => {
                  handleBlur(); // Collapse the search bar after selection
                }, 500);
              }}
              query={{
                key: "AIzaSyBvIMi_8BTDRiLwAFj6ZlRqe17M9c3r-es",
                types: "gas_station",
                language: "en",
                location: `${searchLocation.lat},${searchLocation.lng}`,
                radius: 5000,
              }}
              enablePoweredByContainer={false}
              isRowScrollable={true}
              disableScroll={false}
              onFocus={handleFocus}
              onBlur={handleBlur}
              textInputProps={{
                placeholderTextColor: theme.colors.text.primary,
              }}
              styles={{
                textInputContainer: {
                  flexDirection: "row",
                  flex: 1,
                  width: "90%",
                },
                textInput: {
                  height: 45,
                  margin: 0,
                  borderRadius: 20,
                  paddingLeft: 10,
                  flex: 1,
                  fontSize: 16,
                },
                listView: {
                  width: "120%",
                  zIndex: 10000,
                  // height: 200,
                },
                predefinedPlacesDescription: {
                  color: "#1faadb",
                },
                container: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              renderRow={renderRow} // Custom render for each row
              // renderDescription={renderDescription} // Custom render for description
            />
            <TouchableOpacity onPress={handleBlur} style={{ marginTop: 10 }}>
              <Feather
                name="x"
                size={25}
                color={theme.colors.bg.primary}
                style={styles.equalizerIcon}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleFocus}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fontisto name="search" size={23} color={theme.colors.bg.primary} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    zIndex: 9999,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: theme.colors.bg.white,
    borderRadius: 27,
    backgroundColor: theme.colors.bg.white,
    overflow: "hidden",
    paddingHorizontal: 15,
    shadowColor: "#00000089",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 7,
  },
  icon: {
    paddingHorizontal: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: theme.colors.border,
  },
  placeName: {
    flex: 1,
    fontSize: hp(1.5),
    color: theme.colors.text.primary,
    marginLeft: 10,
  },
  description: {
    fontSize: hp(1.4),
    color: theme.colors.text.secondary,
  },
});
export default GoogleSearchBar;
