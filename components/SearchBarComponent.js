import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { searchStyles } from "./SearchBarStyles";
import { theme } from "../infrastructure/theme";
import { Fontisto, Feather, SimpleLineIcons } from "@expo/vector-icons";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LocationContext } from "../services/LocationContext";

export default function SearchBarComponent({ expanded, dropdownVisible }) {
  const { fillingStations, searchFillingStations, handleStationSelect } = useContext(LocationContext);

  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const isItemSelecting = useRef(false);

  const inputRef = useRef(null);

  const width = useSharedValue(50);
  const height = useSharedValue(50);

  useEffect(() => {
    if (isExpanded) {
      width.value = withTiming(wp(80), { duration: 300, easing: Easing.out(Easing.exp) });
      height.value = withTiming(50, { duration: 300, easing: Easing.out(Easing.exp) });
      inputRef.current.focus();
    } else {
      width.value = withTiming(50, { duration: 300, easing: Easing.out(Easing.exp) });
      height.value = withTiming(50, { duration: 300, easing: Easing.out(Easing.exp) });
    }
  }, [isExpanded, width, height]);

  useEffect(() => {
    if (search.length > 0) {
      setIsDropdownVisible(true);
      height.value = withTiming(hp(30), { duration: 300, easing: Easing.out(Easing.exp) });
    } else {
      setIsDropdownVisible(false);
      height.value = withTiming(50, { duration: 300, easing: Easing.out(Easing.exp) });
    }
    searchFillingStations(search);
  }, [search]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
    };
  });

  const updateSearch = (search) => {
    setSearch(search);
    searchFillingStations(search);
    setIsExpanded(true);
    setIsDropdownVisible(true);
  };

  const handleBodyPress = () => {
    if (isExpanded) {
      setSearch("");
      setIsExpanded(false);
      setIsDropdownVisible(false);
      Keyboard.dismiss();
    }
  };



  const handleSelectItem = (station) => {
    console.log("handleSelectItem called with station:");
    isItemSelecting.current = true;
    setTimeout(() => {
      isItemSelecting.current = false; // Reset after some delay
    }, 0);
    handleStationSelect(station); // Uncomment if handleStationSelect function is defined
    setSearch("")
    setIsExpanded(false);
    setIsDropdownVisible(false);
  }
  const customOnBlur = () => {
    setTimeout(() => {
      if (!isItemSelecting.current) {
        setSearch("");
        setIsExpanded(false);
        setIsDropdownVisible(false);
      }
      isItemSelecting.current = false; // Reset after blur handling
    }, 100);
  };

  const dynamicStyles = createDynamicStyles(isExpanded);
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <TouchableWithoutFeedback onPress={handleBodyPress} >
      <View style={searchStyles.searchContainer}>
        <Animated.View style={[searchStyles.searchInputContainer, animatedStyles, dynamicStyles.searchBar]}>
          <View style={styles.searchRow}>
            <Fontisto
              name="search"
              size={hp(2)}
              color={theme.colors.bg.primary}
              style={searchStyles.searchIcon}
              onPress={() => setIsExpanded(true)}
            />
            {isExpanded && (
              <>
                <TextInput
                  ref={inputRef}
                  style={searchStyles.searchInput}
                  placeholder="Search for a Fuel station"
                  placeholderTextColor={theme.colors.text.placeholder}
                  onChangeText={updateSearch}
                  value={search}
                  mode="bar"
                  onBlur={!isDropdownVisible && customOnBlur}
                />
                <Feather
                  name="x"
                  size={hp(2.5)}
                  color={theme.colors.bg.primary}
                  style={styles.equalizerIcon}
                  onPress={customOnBlur}
                />
              </>
            )}
          </View>
          {isDropdownVisible && (
            fillingStations.length > 0 ? (
              <FlatList
                data={fillingStations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectItem(item)}>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: hp(1) }}>
                      <SimpleLineIcons
                        name={"location-pin"}
                        size={hp(2)}
                        color={theme.colors.bg.primary}
                      />
                      <View style={{ flexDirection: "column", paddingHorizontal: hp(1) }}>
                        <Text style={styles.stationText}>{item.name}</Text>
                        <Text style={styles.stationVicinity}>{truncateText(item.vicinity, 30)}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                style={styles.stationList}
              />
            ) : (
              <View style={styles.unavailableView}>
                <Text style={styles.unavailableText}>
                  Filling Station Unavailable
                </Text>
              </View>
            )
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const createDynamicStyles = (isExpanded) =>
  StyleSheet.create({
    searchBar: {
      justifyContent: !isExpanded ? "center" : "flex-start",
    },
  });

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(80),
    paddingVertical: hp(1),
  },
  equalizerIcon: {
    marginLeft: "auto",
    marginRight: wp(4),
  },
  stationList: {
    maxHeight: hp(20),
    borderTopWidth: 2,
    borderTopColor: theme.colors.text.placeholder,
  },
  stationText: {
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.5),
  },
  stationVicinity: {
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.4),
    width: wp(50),
  },
  unavailableView: {
    marginTop: hp(3),
  },
  unavailableText: {
    color: theme.colors.text.placeholder,
    fontFamily: theme.fonts.medium,
    fontSize: hp(1.5),
  },
});
