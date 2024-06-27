import axios from "axios";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const API_KEY = "AIzaSyDZnqPKvw0Me0Q8Rg_wtQ6ExIfjggD9Mdo";


const NewNearbyPlace = async (data) => {
  const URL = `${BASE_URL}location=${data.latitude},${data.longitude}&radius=${data.radius}&type=gas_station&key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
};

export default {
  NewNearbyPlace,
  API_KEY,
};
