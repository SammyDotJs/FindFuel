import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { Searchbar } from "react-native-paper";
import { theme } from "../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const SearchContainer = styled(View)`
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;
`;

const SearchInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  background: ${theme.colors.bg.white};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const SearchInput = styled(TextInput)`
  width: auto;
  padding: 6px;
  font-family: ${theme.fonts.medium};
  width: 65%;
`;

export default function SearchBarComponent() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(search);
  };

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SearchContainer>
      <SearchInputContainer>
        <SimpleLineIcons
          name="equalizer"
          size={24}
          color={theme.colors.bg.primary}
          style={{
            marginHorizontal: 20,
            // marginRight: 20,
            transform: [{ rotate: "90deg" }],
          }}
        />
        <SearchInput
          placeholder="Seach for a Fuel station"
          placeholderTextColor={theme.colors.text.primary}
          onChangeText={updateSearch}
          value={search}
        />
        <Fontisto
          name="search"
          size={24}
          color={theme.colors.bg.primary}
          style={{ marginHorizontal: 20, marginLeft: "auto" }}
          onPress={handleSearch}
        />
      </SearchInputContainer>
    </SearchContainer>
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
