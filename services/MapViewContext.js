import React, { createContext, useRef, useContext } from "react";

const MapViewContext = createContext();

export const MapViewProvider = ({ children }) => {
  const mapRef = useRef(null);

  return (
    <MapViewContext.Provider value={mapRef}>
      {children}
    </MapViewContext.Provider>
  );
};

export const useMapRef = () => useContext(MapViewContext);
