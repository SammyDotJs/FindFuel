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
  const [region, setRegion] = useState(null);
  const [track, setTrack] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } catch (err) {
        setError(err);
        console.error(err);
      }
    })();
  }, []);

  const fetchFillingStations = useCallback(
    debounce(async (latitude, longitude, pageToken = null) => {
      try {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5700&type=gas_station&key=${API_KEY}`;
        if (pageToken) {
          url += `&pagetoken=${pageToken}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        setFillingStations((prevFillingStations) => [
          ...prevFillingStations,
          ...data.results,
        ]);
        setFillingStationsData((prevFillingStations) => [
          ...prevFillingStations,
          ...data.results,
        ]);
        setIsLoading(false);
        setTrack(true);
        if (data.next_page_token) {
          setTimeout(() => {
            setTrack(false);
            fetchFillingStations(latitude, longitude, data.next_page_token);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }, 500), // 500 milliseconds debounce time
    []
  );

  const searchFillingStations = (searchTerm) => {
    setFillingStations(
      searchTerm.length == 0
        ? fillingStationsData
        : fillingStationsData.filter((station) =>
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
    if (userLocation) {
      fetchFillingStations(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
    }
  }, [userLocation, fetchFillingStations]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
    setRegion({
      latitude: station.geometry.location.lat,
      longitude: station.geometry.location.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const setMapRegion = (reg) => {
    setRegion(reg);
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
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
