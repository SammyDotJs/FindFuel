import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import * as Location from "expo-location";
import axios from "axios";

export const LocationContext = createContext();
const API_KEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export const LocationContextProvider = ({ children }) => {
  const [fillingStations, setFillingStations] = useState([]);
  const [fillingStationsData, setFillingStationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState({});
  const [track, setTrack] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [uniqueStations, setUniqueStations] = useState(new Set());

  const mapRef = useRef(null);

  const setMapRef = (ref) => {
    mapRef.current = ref;
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.004,
        });

        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000, // Update every 2 seconds
            distanceInterval: 1, // Update every meter
          },
          (newLocation) => {
            setUserLocation(newLocation);
          }
        );
      } catch (err) {
        setError(err);
        console.error(err);
      }
    })();
  }, []);

  const fetchFillingStations = useCallback(
    async (latitude, longitude, pageToken = null) => {
      try {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gas_station&key=${API_KEY}`;
        if (pageToken) {
          url += `&pagetoken=${pageToken}`;
        }
        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data.results)) {
          console.error("Invalid response format", data);
          return;
        }

        setFillingStations((previousStations) => {
          const newStationsMap = new Map(
            previousStations.map((station) => [station.place_id, station])
          );
          data.results.forEach((station) => {
            newStationsMap.set(station.place_id, station);
          });
          return Array.from(newStationsMap.values());
        });

        setFillingStationsData((previousStations) => {
          const newStationsMap = new Map(
            previousStations.map((station) => [station.place_id, station])
          );
          data.results.forEach((station) => {
            newStationsMap.set(station.place_id, station);
          });
          return Array.from(newStationsMap.values());
        });
        // Use a Set to keep track of unique stations
        // const newStationsSet = new Set([...uniqueStations]);
        // data.results.forEach((station) => {
        //   newStationsSet.add(station.place_id);
        // });

        // // Convert Set back to array and filter unique stations
        // const uniqueStationsArray = Array.from(newStationsSet).map((id) =>
        //   data.results.find((station) => station.place_id === id)
        // );

        // setFillingStations(uniqueStationsArray);
        // setUniqueStations(newStationsSet);
        // setFillingStationsData(uniqueStationsArray);


        setIsLoading(false);

        if (data.next_page_token) {
          setTimeout(() => {
            fetchFillingStations(latitude, longitude, data.next_page_token);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [uniqueStations]
  );
  const searchFillingStations = useCallback(
    (searchTerm) => {
      setFillingStations(
        searchTerm.length === 0
          ? fillingStationsData
          : fillingStationsData.filter((station) =>
              station.name.toUpperCase().includes(searchTerm.toUpperCase())
            )
      );
    },
    [fillingStationsData]
  );

  useEffect(() => {
    if (userLocation) {
      fetchFillingStations(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (!modalVisible) {
      setSelectedStation(null);
    }
  }, [modalVisible]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    if (station && station.geometry && station.geometry.location) {
      const newRegion = {
        latitude: station.geometry.location.lat,
        longitude: station.geometry.location.lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.004,
      };
      setRegion(newRegion);
    }
    setModalVisible(true);
  };

  const myLocation = () => {
    if (userLocation) {
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.004,
      });
    }
  };

  // const onChangeLocation = useCallback(
  //   debounce(
  //     (newLocation) => {
  //       // setFillingStations([]);
  //       if (newLocation) {
  //         fetchFillingStations(
  //           newLocation.coords.latitude,
  //           newLocation.coords.longitude
  //         );
  //       }
  //     },
  //     1000,
  //     { trailing: true, leading: false }
  //   ),
  //   [fetchFillingStations]
  // );

  // useEffect(() => {
  //   if (userLocation) {
  //     onChangeLocation(userLocation);
  //   }
  // }, [userLocation, onChangeLocation]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        userLocation,
        region,
        fillingStations,
        track,
        searchFillingStations,
        handleStationSelect,
        modalVisible,
        setModalVisible,
        selectedStation,
        fetchFillingStations,
        myLocation,
        setSelectedStation,
        setMapRef,
        setIsUserInteracting,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
