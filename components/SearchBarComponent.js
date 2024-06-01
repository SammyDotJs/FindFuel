import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { searchStyles } from "./SearchBarStyles";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";



export default function SearchBarComponent() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(search);
    setSearch("");
  };

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View style={searchStyles.searchContainer}>
      <View style={searchStyles.searchInputContainer}>
        <SimpleLineIcons
          name="equalizer"
          size={20}
          color={theme.colors.bg.primary}
          style={{
            marginHorizontal: 20,
            // marginRight: 20,
            transform: [{ rotate: "90deg" }],
          }}
        />
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Seach for a Fuel station"
          placeholderTextColor={theme.colors.text.foundation}
          onChangeText={updateSearch}
          value={search}
          mode="bar"
        />
        <Fontisto
          name="search"
          size={20}
          color={theme.colors.bg.primary}
          style={{ marginHorizontal: 20, marginLeft: "auto" }}
          onPress={handleSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#f5f5f5", // Set background color for search bar itself
    borderRadius: 25, // Adjust border radius if needed
    height: 40,
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
});
