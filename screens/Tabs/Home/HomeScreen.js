import {
  View,
  Text,
  BackHandler,
  Alert,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { theme } from "../../../infrastructure/theme";
import { TextInput } from "react-native-paper";
import { Image } from "react-native";
import { Button } from "@rneui/themed";
import { UserContext } from "../../../services/user/UserContext";
import { HomeScreenStyles as hs } from "./HomeScreenStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from '@expo/vector-icons';
import { SafeArea } from "../../../components/utils/Safe-area.component";

export default function HomeScreen({ route }) {
  const { userDetails } = useContext(UserContext)
  console.log(userDetails);
  const userName = userDetails?.name
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            route.name === "Home" ? BackHandler.exitApp() : () => null,
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      route.name === "Home" ? backAction : () => null
    );

    return () => backHandler.remove();
  }, [route]);

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={{ paddingBottom: hp(11) }} showsVerticalScrollIndicator={false}>
        <View style={hs.welcome}>
          <View style={hs.welcomeInfo}>
            {/* <Image /> */}
            <View style={hs.profileImage}>
              <Text style={hs.profileText}>S</Text>
            </View>
            <View style={hs.welcomeTexts}>
              <Text style={hs.h6}>Good Morning,</Text>
              {/* <Text style={hs.h2}>{userName}</Text> */}
              <Text style={hs.h2}>John Doe</Text>

            </View>
          </View>
          {/* notification */}
          <View style={hs.notification}>
            <Octicons name="bell-fill" size={hp(2.4)} color={theme.colors.bg.primary} />
          </View>
        </View>
        {/* Dashboard */}
        <ImageBackground style={hs.dashboardImage} source={require("../../../assets/Rectangle.png")} imageStyle={hs.imageStyle}>
          <Text style={hs.dashboardText}>Dangote refinery begins sale of petroleum products</Text>
          <Button title="Read more" buttonStyle={hs.buttonStyle} titleStyle={hs.titleStyle} />
        </ImageBackground>
        {/* Map close to you */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Close to you</Text>
            <Text style={hs.viewAll}>View All</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* Map recently visited */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Recently Visited</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
            <View style={hs.fillingStation}>
              <ImageBackground style={hs.fillingStationImage} source={{ uri: "https://gazettengr.com/wp-content/uploads/IMG_5987.jpg" }} imageStyle={hs.imageStyle}>

              </ImageBackground>
              <View style={hs.fillingStationInfo}>
                <Text style={hs.fillingStationName}>AA Rano Fuel Station</Text>
                <Text style={hs.fillingStationPrice}>N680 per liter</Text>
                <Button title="Locate" buttonStyle={hs.fsButtonStyle} titleStyle={hs.titleStyle} />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeArea>

  );
}
