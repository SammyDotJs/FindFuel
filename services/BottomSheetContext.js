import React, { createContext, useRef, useContext } from "react";

// Create a context with a default value of null
const BottomSheetContext = createContext();

// Create a provider component
export const BottomSheetProvider = ({ children }) => {
  const sheetRef = useRef(null);

  return (
    <BottomSheetContext.Provider value={sheetRef}>
      {children}
    </BottomSheetContext.Provider>
  );
};

// Custom hook to use the BottomSheetContext
export const useBottomSheet = () => useContext(BottomSheetContext);
