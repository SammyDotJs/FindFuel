import {
  View,
  Text,
  BackHandler,
  Alert,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { theme } from "../../../infrastructure/theme";
import { Button } from "@rneui/themed";
import { UserContext } from "../../../services/user/UserContext";
import { HomeScreenStyles as hs } from "./HomeScreenStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from '@expo/vector-icons';
import { SafeArea } from "../../../components/utils/Safe-area.component";
import StationsCard from "../../../components/StationsCard";
import { LocationContext } from "../../../services/LocationContext";
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Skeleton } from "moti/skeleton";
import { MotiView } from 'moti'

const Spacer = ({ height = hp(1) }) => <MotiView style={{ height }} />

const SkeletonLoader = () => {
  return (
    <View style={{ marginHorizontal: 10 }} colorMode="light">
      <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 20 }} colorMode="light">
        <Skeleton style={{ width: 120, height: 120, borderRadius: 10, justifyContent: "center" }} colorMode="light" width={wp(35)} height={hp(11)} />
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <Skeleton colorMode="light" width={wp(30)} height={hp(3)} />
          <Spacer />
          <Skeleton colorMode="light" width={wp(20)} height={hp(4)} radius={"round"} title="Locate" buttonStyle={hs.buttonStyle} titleStyle={hs.titleStyle} />
        </View>
      </View>
    </View>
  );
};


export default function HomeScreen({ route, navigation }) {
  const { fillingStations, isLoading, fetchFillingStations, userLocation, setLoading, handleStationSelect } = useContext(LocationContext);
  const translateY = useSharedValue(0);
  const { loggedInDetails } = useContext(UserContext)
  const [userName, setUserName] = useState("")
  const [profileLetter, setProfileLetter] = useState("")

  const data = fillingStations.slice(0, 3)

  const readMore = () => {
    navigation.navigate("DashboardInfo")
  }
  const viewNotifications = () => {
    navigation.navigate("Notifications")
  }
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
    },
  });

  const viewAll = async () => {
    await navigation.navigate("AllStations", fillingStations)
  }



  useEffect(() => {
    // setUserName(loggedInDetails?.user.first_name)
    // setProfileLetter(loggedInDetails?.user.first_name?.charAt(0).toUpperCase())

    setUserName("John Doe")
    setProfileLetter("J")
  }, [loggedInDetails])
  // console.log(loggedInDetails);
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


  const renderSkeletonLoader = () =>
  (<View style={{ flexDirection: "row" }}>
    <SkeletonLoader />
    <SkeletonLoader />
    <SkeletonLoader />
  </View>)

  const locate = (item) => {
    navigation.navigate("Map")
    handleStationSelect(item)
  }
  return (
    <SafeArea>
      {/* <PanGestureHandler> */}
      <Animated.ScrollView contentContainerStyle={{ paddingBottom: hp(11) }} showsVerticalScrollIndicator={false} bounces={true}
        alwaysBounceVertical={true} onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View style={hs.welcome}>
          <View style={hs.welcomeInfo}>
            {/* <Image /> */}
            <View style={hs.profileImage}>
              <Text style={hs.profileText}>{profileLetter}</Text>
            </View>
            <View style={hs.welcomeTexts}>
              <Text style={hs.h6}>Good Morning,</Text>
              <Text style={hs.h2}>{userName}</Text>

            </View>
          </View>
          {/* notification */}
          <View style={hs.notification}>
            <TouchableOpacity activeOpacity={0.4} onPress={viewNotifications}>
              <Octicons name="bell-fill" size={hp(2.4)} color={theme.colors.bg.primary} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Dashboard */}
        <ImageBackground style={hs.dashboardImage} source={require("../../../assets/Rectangle.png")} imageStyle={hs.imageStyle}>
          <Text style={hs.dashboardText}>Dangote refinery begins sale of petroleum products</Text>
          <Button title="Read more" buttonStyle={hs.buttonStyle} titleStyle={hs.titleStyle} onPress={readMore} />
        </ImageBackground>
        {/* Map close to you */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Close to you</Text>
            <TouchableOpacity onPress={viewAll}>
              <Text style={hs.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? renderSkeletonLoader() :
            <FlatList data={data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => locate(item)}
                    activeOpacity={0.5}
                  >
                    <StationsCard stations={item} locate={() => locate(item)} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => `${item.name}-${item.geometry.location.lat}-${item.geometry.location.lat}`}
              horizontal={true} initialNumToRender={3} maxToRenderPerBatch={3} showsHorizontalScrollIndicator={false} />
          }
        </View>
        {/* Map recently visited */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Recently Visited</Text>
          </View>
          {isLoading ? renderSkeletonLoader() :
            <FlatList data={data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => locate(item)}
                    activeOpacity={0.5}
                  >
                    <StationsCard stations={item} locate={() => locate(item)} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => `${item.name}-${item.geometry.location.lat}-${item.geometry.location.lon}`}
              horizontal={true} initialNumToRender={3} maxToRenderPerBatch={3} showsHorizontalScrollIndicator={false} />
          }
        </View>
      </Animated.ScrollView>
      {/* </PanGestureHandler> */}
    </SafeArea>

  );
}
