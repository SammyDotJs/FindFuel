import {
  View,
  Text,
  BackHandler,
  Alert,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { theme } from "../../../infrastructure/theme";
import { Button } from "@rneui/themed";
import { UserContext } from "../../../services/user/UserContext";
import { HomeScreenStyles as hs } from "./Styles/homeScreen.styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { SafeArea } from "../../../components/utils/Safe-area.component";
import StationsCard from "../../../components/StationsCard";
import { LocationContext } from "../../../services/LocationContext";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { UserLocationContext } from "../../../services/user/UserLocationContext";
import GlobalApi from "../../../utils/GlobalApi";
import { SelectMarkerContext } from "../../../services/SelectMarkerContext";
import { useBottomSheet } from "../../../services/BottomSheetContext";

const Spacer = ({ height = hp(1) }) => <MotiView style={{ height }} />;

const greeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const SkeletonLoader = () => {
  return (
    <View style={{ marginHorizontal: 10 }} colorMode="light">
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
        }}
        colorMode="light"
      >
        <Skeleton
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            justifyContent: "center",
          }}
          colorMode="light"
          width={wp(35)}
          height={hp(11)}
        />
        <Spacer height={40} />
        <View style={{ alignItems: "center" }}>
          <Skeleton colorMode="light" width={wp(30)} height={hp(3)} />
          <Spacer />
          <Skeleton
            colorMode="light"
            width={wp(20)}
            height={hp(4)}
            radius={"round"}
            title="Locate"
            buttonStyle={hs.buttonStyle}
            titleStyle={hs.titleStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen({ route, navigation }) {
  const {
    location,
    setLocation,
    isFetching,
    setIsFetching,
    setPlaceListData,
    stationLocation,
    setShowDirections,
  } = useContext(UserLocationContext);

  const translateY = useSharedValue(0);
  const { loggedInDetails } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [profileLetter, setProfileLetter] = useState("");

  const { setSelectedMarker } = useContext(SelectMarkerContext);

  const flatListRef = useRef(null);
  const sheetRef = useBottomSheet();
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    stationLocation && GetNearByPLace();
  }, [stationLocation]);

  const GetNearByPLace = async () => {
    try {
      const data = {
        latitude: stationLocation.coords.latitude,
        longitude: stationLocation.coords.longitude,
        radius: 5000,
      };
      const response = await GlobalApi.NewNearbyPlace(data);
      console.log(response)
      setPlaceList(response?.results.slice(0, 10));
      setPlaceListData(response?.results.slice(0, 10));
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const slicedData = placeList && placeList.slice(0, 3);

  const readMore = () => {
    navigation.navigate("DashboardInfo");
  };
  const viewNotifications = () => {
    navigation.navigate("Notifications");
  };
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
    },
  });

  const viewAll = () => {
    placeList && navigation.navigate("AllStations", placeList);
  };

  useEffect(() => {
    // setUserName(loggedInDetails?.user.first_name)
    // setProfileLetter(loggedInDetails?.user.first_name?.charAt(0).toUpperCase())
    setUserName("Guest");
    setProfileLetter("G");
  }, [loggedInDetails]);
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

  const renderSkeletonLoader = () => (
    <View style={{ flexDirection: "row" }}>
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </View>
  );

  const locate = (item) => {
    setShowDirections(false);
    setSelectedMarker(item);
    navigation.navigate("Map");
    sheetRef.current !== null && sheetRef.current?.present();
    sheetRef.current === null &&
      setTimeout(() => {
        sheetRef.current?.present();
      }, 1500); // Open the bottom sheet
  };
  return (
    <SafeArea>
      {/* <PanGestureHandler> */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: hp(11) }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={hs.welcome}>
          <View style={hs.welcomeInfo}>
            {/* <Image /> */}
            <View style={hs.profileImage}>
              <Text style={hs.profileText}>{profileLetter}</Text>
            </View>
            <View style={hs.welcomeTexts}>
              <Text style={hs.h6}>{greeting()},</Text>
              <Text style={hs.h2}>{userName}</Text>
            </View>
          </View>
          {/* notification */}
          <View style={hs.notification}>
            <TouchableOpacity activeOpacity={0.4} onPress={viewNotifications}>
              <Octicons
                name="bell-fill"
                size={hp(2.4)}
                color={theme.colors.bg.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Dashboard */}
        <ImageBackground
          style={hs.dashboardImage}
          source={require("../../../assets/Rectangle.png")}
          imageStyle={hs.imageStyle}
        >
          <Text style={hs.dashboardText}>
            Dangote refinery begins sale of petroleum products
          </Text>
          <Button
            title="Read more"
            buttonStyle={hs.buttonStyle}
            titleStyle={hs.titleStyle}
            onPress={readMore}
          />
        </ImageBackground>
        {/* Map close to you */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Close to you</Text>
            <TouchableOpacity onPress={viewAll}>
              <Text style={hs.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {isFetching ? (
            renderSkeletonLoader()
          ) : (
            <FlatList
              data={slicedData}
              ref={flatListRef}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback>
                    <StationsCard stations={item} locate={() => locate(item)} />
                  </TouchableWithoutFeedback>
                );
              }}
              keyExtractor={(item, index) =>
                `${item?.name}-${item?.geometry.location.lat}-${index}`
              }
              horizontal={true}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        {/* Map recently visited */}
        <View style={hs.listsContainer}>
          <View style={hs.listTextContainer}>
            <Text style={hs.listHeader}>Recently Visited</Text>
          </View>
          {isFetching ? (
            renderSkeletonLoader()
          ) : (
            <FlatList
              data={slicedData}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback>
                    <StationsCard stations={item} locate={() => locate(item)} />
                  </TouchableWithoutFeedback>
                );
              }}
              keyExtractor={(item, index) =>
                `${item?.name}-${item?.geometry.location.lat}-${index}`
              }
              horizontal={true}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </Animated.ScrollView>
      {/* </PanGestureHandler> */}
    </SafeArea>
  );
}
