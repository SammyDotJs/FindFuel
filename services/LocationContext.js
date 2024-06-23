import React, { createContext, useState, useEffect, useCallback } from "react";
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
  const [uniqueStations, setUniqueStations] = useState(new Set());

  const setMapRegion = (reg) => {
    setRegion(reg);
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

        // Optionally, you can subscribe to location updates
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 100, // Update every meter
          },
          (newLocation) => {
            setUserLocation(newLocation);
            setRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.004,
            });
          }
        );
      } catch (err) {
        setError(err);
        console.error(err);
      }
    })();
  }, []);

  const fetchFillingStations = useCallback(
    debounce(async (latitude, longitude, pageToken = null) => {
      // console.log(latitude, longitude);
      try {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gas_station&key=${API_KEY}`;
        if (pageToken) {
          url += `&pagetoken=${pageToken}`;
        }
        const response = await axios.get(url);
        const data = response.data;

        // const newStations = data.results.filter(station => (
        //   !fillingStations.some(existingStation => existingStation.place_id === station.place_id)
        // ));
        // setFillingStations((prevFillingStations) => [
        //   // ...prevFillingStations,
        //   ...data.results,
        // ]);
        // setFillingStationsData((prevFillingStations) => [
        //   // ...prevFillingStations,
        //   ...data.results,
        // ]);

        // Use a Set to keep track of unique stations
        const newStationsSet = new Set([...uniqueStations]);
        data.results.forEach(station => {
          newStationsSet.add(station.place_id);
        });

        // Convert Set back to array and filter unique stations
        const uniqueStationsArray = Array.from(newStationsSet).map(id => 
          data.results.find(station => station.place_id === id)
        );

        setFillingStations(uniqueStationsArray);
        setUniqueStations(newStationsSet);

        setIsLoading(false);
        setTrack(true);
        if (data.next_page_token) {
          setTimeout(() => {
            setTrack(false);
            fetchFillingStations(latitude, longitude, data.next_page_token);
          }, 2000);
        }
        // console.log(fillingStations);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }, 500), // 500 milliseconds debounce time
    [uniqueStations]
  );

  const searchFillingStations = (searchTerm) => {
    // console.log(fillingStations.length);
    setFillingStations(
      searchTerm.length == 0
        ? fillingStations
        : fillingStations.filter((station) =>
            station.name.toUpperCase().includes(searchTerm.toUpperCase())
          )
    );
  };
  const setFillingStation = (marker) => {
    setFillingStations(marker);
  };

  useEffect(() => {
    !modalVisible && setSelectedStation(null);
  }, [modalVisible]);

  useEffect(() => {
    userLocation &&
      fetchFillingStations(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
  }, [userLocation]);

  const onChangeLocation = useCallback(
    debounce(
      () => {
        fetchFillingStations(region.latitude, region.longitude);
      },
      1000,
      { trailing: true, leading: false }
    )
  );

  useEffect(() => {
    onChangeLocation
  }, [region]);

  const onRegionChangeComplete = useCallback(
    debounce((newRegion) => {
      // setRegion(newRegion);
      fetchFillingStations(newRegion.latitude, newRegion.longitude);
    }, 1000), // Adjust debounce delay as needed
    []
  );

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
    setRegion({
      latitude: station.geometry.location.lat,
      longitude: station.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.004,
    });
  };
  const myLocation = () => {
    setRegion({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.004,
    });
  };

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
        setMapRegion,
        fetchFillingStations,
        setFillingStation,
        myLocation,
        onRegionChangeComplete,
        setSelectedStation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
