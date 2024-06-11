// 
import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { searchStyles } from "./SearchBarStyles";
import { theme } from "../infrastructure/theme";
import { Fontisto, SimpleLineIcons, Feather } from "@expo/vector-icons";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SearchBarComponent({ onSearch }) {
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const width = useSharedValue(50);

  useEffect(() => {
    if (isExpanded) {
      width.value = withTiming(wp(80), { duration: 300, easing: Easing.out(Easing.exp) });
      inputRef.current.focus();
    } else {
      width.value = withTiming(40, { duration: 300, easing: Easing.out(Easing.exp) });
    }
  }, [isExpanded, width]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const handleSearch = () => {
    console.log(search);
    setSearch("");
  };

  useEffect(() => {
    console.log(search);
    onSearch(search)
  }, [search])

  const updateSearch = (search) => {
    setSearch(search);
  };

  const handleBodyPress = () => {
    if (isExpanded) {
      setIsExpanded(false);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleBodyPress}>
      <View style={searchStyles.searchContainer}>
        <Animated.View style={[styles.searchBar, animatedStyles]}>
          <Fontisto
            name="search"
            size={hp(2)}
            color={theme.colors.bg.primary}
            style={searchStyles.searchIcon}
            onPress={() => setIsExpanded(!isExpanded)}
          />
          {isExpanded && (
            <TextInput
              ref={inputRef}
              style={searchStyles.searchInput}
              placeholder="Search for a Fuel station"
              placeholderTextColor={theme.colors.text.placeholder}
              onChangeText={updateSearch}
              value={search}
              mode="bar"
              onBlur={() => setIsExpanded(false)}
            />
          )}
          {isExpanded && (
            <Feather
              name="x"
              size={hp(2.5)}
              color={theme.colors.bg.primary}
              style={styles.equalizerIcon}
            />
          )}

        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    overflow: "hidden",
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
  equalizerIcon: {
    marginHorizontal: wp(3),
    marginLeft: "auto",

  },
});
