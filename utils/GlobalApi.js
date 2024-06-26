import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyBvIMi_8BTDRiLwAFj6ZlRqe17M9c3r-es";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.location",
      "places.photos",
      "places.shortFormattedAddress",
    ],
  },
};

const NewNearbyPlace = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data, config);
    return response;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error; 
  }
};

export default {
  NewNearbyPlace,
  API_KEY
};
