// import {
//   View,
//   SafeAreaView,
//   Text,
//   Image,
//   StyleSheet,
//   ImageBackground,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import React, { useContext, useMemo, useState, useCallback } from "react";
// import MapView, { Marker } from "react-native-maps";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import SearchBarComponent from "../../../components/SearchBarComponent";
// import BackButton from "../../../components/BackButton";
// import { LocationContext } from "../../../services/LocationContext";
// import Modal from "react-native-modal";
// import { HomeScreenStyles as hs } from "../Home/HomeScreenStyles";
// import { Button } from "react-native-elements";
// import { MapScreenStyles as ms } from "./MapScreenStyles";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { theme } from "../../../infrastructure/theme";
// import { ScrollView } from "react-native";
// import { MapStyle } from "./MAPSTYLE";

// export default function MapScreen({ route, navigation }) {
//   const { userLocation, region, fillingStations, track, searchFillingStations, setMapRegion, handleStationSelect, modalVisible, setModalVisible,
//     selectedStation, } = useContext(LocationContext);

//   // const [isModalVisible, setModalVisible] = useState(false);
//   // const [selectedStation, setSelectedStation] = useState(null);
//   const [filteredStations, setFilteredStations] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const backToHome = useCallback(() => {
//     navigation.navigate("Home");
//   }, [navigation]);

//   const calculateMarkerSize = useCallback((latitudeDelta) => {
//     if (!latitudeDelta) return 1;
//     const maxZoom = 20;
//     const minZoom = 1;
//     const zoomLevel = Math.log2(360 / latitudeDelta);
//     return Math.max(minZoom, Math.min(maxZoom, zoomLevel));
//   }, []);

//   const markerSize = useMemo(() => calculateMarkerSize(region?.latitudeDelta), [region, calculateMarkerSize]);

//   // console.log(selectedStation);

//   const toggleModal = useCallback(() => {
//     setModalVisible((prev) => !prev);
//   }, []);

//   const onMarkerPress = (station) => {
//     handleStationSelect(station);
//     // setModalVisible(true)
//   }



//   const handleBodyPress = useCallback(() => {
//     setIsExpanded(false)
//     setIsDropdownVisible(false)
//     Keyboard.dismiss();
//   }, []);


//   const getSearch = (data) => {
//     searchFillingStations(data);
//     const filtered = fillingStations.filter((station) =>
//       station.name.toLowerCase().includes(data.toLowerCase())
//     );
//     setFilteredStations(filtered);
//   };

//   const CustomMarker = ({ isSelected, ...props }) => {
//     return <Marker
//       {...props}
//     >
//       <View style={styles.markerContainer}>
//         <Image
//           source={isSelected ? require("../../../assets/SelectedMarker.png") : require("../../../assets/FuelMapMarkers.png")}
//           style={{
//             width: isSelected ? markerSize * 3 : markerSize * 2,
//             height: isSelected ? markerSize * 3 : markerSize * 2,
//             resizeMode: "contain",
//           }}
//         />
//       </View>
//     </Marker>
//   }



//   return (
//     <TouchableWithoutFeedback onPress={handleBodyPress}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.backButtonContainer}>
//           <BackButton onPress={backToHome} />
//         </View>
//         <View style={styles.searchContainer}>
//           <SearchBarComponent onSearch={getSearch} filteredStations={filteredStations} expanded={isExpanded} dropdownVisible={isDropdownVisible} />
//         </View>
//         <MapView showsUserLocation={false} region={region} style={styles.map} customMapStyle={MapStyle}>
//           {userLocation && (
//             <Marker
//               coordinate={{
//                 latitude: userLocation.coords.latitude,
//                 longitude: userLocation.coords.longitude,
//               }}
//               title="Your Location"
//             >
//               <Image
//                 source={require("../../../assets/Userpointer.png")}
//                 style={{ width: markerSize * 2, height: markerSize * 2 }}
//               />
//             </Marker>
//           )}

//           {fillingStations?.map((marker, index) => (
//             <CustomMarker key={index}
//               coordinate={{
//                 latitude: marker.geometry.location.lat,
//                 longitude: marker.geometry.location.lng,
//               }}
//               tracksViewChanges={track}
//               isSelected={selectedStation && selectedStation.place_id === marker.place_id}
//               onPress={() => onMarkerPress(marker)} />
//           ))}

//         </MapView>
//         <Modal isVisible={modalVisible} onBackdropPress={toggleModal} style={styles.modal} backdropOpacity={0}>
//           <View style={styles.modalContent}>
//             {selectedStation && (
//               <View style={ms.modalContainer}>
//                 <View style={ms.fillingStationInfo}>
//                   <View style={ms.fillingStationImageInfo}>
//                     <ImageBackground
//                       style={ms.fillingStationImage}
//                       source={{ uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg" }}
//                       imageStyle={hs.imageStyle}
//                     ></ImageBackground>
//                     <View style={ms.fillingStationInfoAll}>
//                       <Text style={ms.fillingStationName}>{selectedStation.name}</Text>
//                       <Text style={ms.fillingStationAddress}>{selectedStation.vicinity}</Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={ms.routeButton}>
//                   <Button
//                     icon={<FontAwesome5 name="location-arrow" size={30} color={theme.colors.bg.white} />}
//                     buttonStyle={ms.fsButtonStyleAll}
//                     titleStyle={hs.titleStyle}
//                   />
//                 </View>
//               </View>
//             )}
//           </View>
//         </Modal>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//     width: wp(100),
//     height: hp(100),
//   },
//   backButtonContainer: {
//     top: hp(9.2),
//     zIndex: 999,
//     position: "absolute",
//   },
//   searchContainer: {
//     width: "95%",
//     justifyContent: "center",
//     alignItems: "flex-end",
//     marginRight: wp(3),
//   },
//   stationList: {
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     padding: hp(2),
//     position: "absolute",
//     zIndex: 999,
//     top: hp(15),
//     width: "80%",
//     borderRadius: 10,
//   },
//   stationText: {
//     marginBottom: hp(1),
//   },
//   markerContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modal: {
//     alignItems: "center",
//     justifyContent: "flex-end",
//     // position:"absolute"
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: hp(2),
//     borderRadius: 20,
//     width: "100%",
//     marginBottom: hp(10),
//     shadowColor: "#C7C7C7",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 7,
//   },
// });
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useMemo, useState, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBarComponent from "../../../components/SearchBarComponent";
import BackButton from "../../../components/BackButton";
import { LocationContext } from "../../../services/LocationContext";
import Modal from "react-native-modal";
import { HomeScreenStyles as hs } from "../Home/HomeScreenStyles";
import { Button } from "react-native-elements";
import { MapScreenStyles as ms } from "./MapScreenStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { ScrollView } from "react-native";
import { MapStyle } from "./MAPSTYLE";

export default function MapScreen({ route, navigation }) {
  const { userLocation, region, fillingStations, track, searchFillingStations, setMapRegion, handleStationSelect, modalVisible, setModalVisible,
    selectedStation, } = useContext(LocationContext);

  const [filteredStations, setFilteredStations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const calculateMarkerSize = useCallback((latitudeDelta) => {
    if (!latitudeDelta) return 1;
    const maxZoom = 20;
    const minZoom = 1;
    const zoomLevel = Math.log2(360 / latitudeDelta);
    return Math.max(minZoom, Math.min(maxZoom, zoomLevel));
  }, []);

  const markerSize = useMemo(() => calculateMarkerSize(region?.latitudeDelta), [region, calculateMarkerSize]);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const onMarkerPress = (station) => {
    handleStationSelect(station);
  };

  const handleBodyPress = useCallback(() => {
    setIsExpanded(false)
    setIsDropdownVisible(false)
    Keyboard.dismiss();
  }, []);

  const getSearch = (data) => {
    searchFillingStations(data);
    const filtered = fillingStations.filter((station) =>
      station.name.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  const CustomMarker = ({ isSelected, ...props }) => {
    return <Marker {...props}>
      <View style={styles.markerContainer}>
        <Image
          source={isSelected ? require("../../../assets/SelectedMarker.png") : require("../../../assets/FuelMapMarkers.png")}
          style={{
            width: isSelected ? markerSize * 3 : markerSize * 2,
            height: isSelected ? markerSize * 3 : markerSize * 2,
            resizeMode: "contain",
          }}
        />
      </View>
    </Marker>
  };

  return (
    <TouchableWithoutFeedback onPress={handleBodyPress}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={backToHome} />
        </View>
        <View style={styles.searchContainer}>
          <SearchBarComponent onSearch={getSearch} filteredStations={filteredStations} expanded={isExpanded} dropdownVisible={isDropdownVisible} />
        </View>
        <MapView showsUserLocation={false} region={region} style={styles.map} customMapStyle={MapStyle}>
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              title="Your Location"
            >
              <Image
                source={require("../../../assets/Userpointer.png")}
                style={{ width: markerSize * 2, height: markerSize * 2 }}
              />
            </Marker>
          )}

          {fillingStations?.map((marker, index) => (
            <CustomMarker key={index}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              tracksViewChanges={track}
              isSelected={selectedStation && selectedStation.place_id === marker.place_id}
              onPress={() => onMarkerPress(marker)} />
          ))}

        </MapView>
        <Modal isVisible={modalVisible} onBackdropPress={toggleModal} style={styles.modal} backdropOpacity={0}>
          <View style={styles.modalContent}>
            {selectedStation && (
              <View style={ms.modalContainer}>
                <View style={ms.fillingStationInfo}>
                  <View style={ms.fillingStationImageInfo}>
                    <ImageBackground
                      style={ms.fillingStationImage}
                      source={{ uri: "https://nairametrics.com/wp-content/uploads/2023/07/NNPC.jpg" }}
                      imageStyle={hs.imageStyle}
                    ></ImageBackground>
                    <View style={ms.fillingStationInfoAll}>
                      <Text style={ms.fillingStationName}>{selectedStation.name}</Text>
                      <Text style={ms.fillingStationAddress}>{selectedStation.vicinity}</Text>
                    </View>
                  </View>
                </View>
                <View style={ms.routeButton}>
                  <Button
                    icon={<FontAwesome5 name="location-arrow" size={30} color={theme.colors.bg.white} />}
                    buttonStyle={ms.fsButtonStyleAll}
                    titleStyle={hs.titleStyle}
                  />
                </View>
              </View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },
  backButtonContainer: {
    top: hp(9.2),
    zIndex: 999,
    position: "absolute",
  },
  searchContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: wp(3),
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: hp(2),
    borderRadius: 20,
    width: "100%",
    marginBottom: hp(10),
    shadowColor: "#C7C7C7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
});
