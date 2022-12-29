import * as geolib from "geolib";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/storeContext";
import { useShopStore } from "../../store/ShopStore";

export const useFetchLocation = () => {
  const { storeDetails } = useStore();
  const { information: data } = storeDetails;
  const setStoreData = useShopStore((state) => state.setStoreData);
  const setStoreFound = useShopStore((state) => state.setStoreFound);
  const setStoreLoading = useShopStore((state) => state.setIsStoreLoading);
  const currLatitude = localStorage.getItem("myLat");
  const currLongitude = localStorage.getItem("myLon");

  const navigate = useNavigate();
  const successCallback = (Location, resolve) => {
    try {
      setStoreLoading(true);

      if (currLatitude && currLongitude) {
        if (
          !currLatitude === Location.coords.latitude &&
          !currLongitude === Location.coords.longitude
        ) {
          localStorage.setItem("myLat", Location.coords.latitude);
          localStorage.setItem("myLon", Location.coords.longitude);
        }
      } else {
        localStorage.setItem("myLat", Location.coords.latitude);
        localStorage.setItem("myLon", Location.coords.longitude);
      }

      const dist = { storeDistance: "" };

      if (data && data.stores) {
        //for all the stores in json of data
        for (let i = 0; i < data.stores.length; i++) {
          const element = data.stores[i];

          //calculating distance using lat and long
          const locationDistance = geolib.getPreciseDistance(
            {
              latitude: Location.coords.latitude,
              longitude: Location.coords.longitude,
            },
            {
              latitude: element.latitude,
              longitude: element.longitude,
            }
          );
          //  ? individual Store Distance
          const distance = Math.round(locationDistance / 1000);

          dist.storeDistance = distance;

          //adding distance into data.stores Individual store
          Object.assign(element, dist);
        }
        //sorting with distance
        // Copy
        var byDistance = data.stores.slice(0);
        byDistance.sort((a, b) => a.storeDistance - b.storeDistance);

        data.stores = byDistance;
        resolve(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStoreLoading(false);
    }
  };

  const errorCallback = (error) => {
    console.log(error);
    navigate("Location_Denied");
  };

  const calculateDistance = async (value, type = "") => {
    setStoreLoading(true);
    if (value) {
      const findDistance = new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (Location) => successCallback(Location, resolve),
          errorCallback,
          {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 10000,
          }
        );
      });

      const data = await findDistance;
      setStoreData(data.stores[0]);
      setStoreFound(true);
      setStoreLoading(false);

      if (type === "STORES") {
        navigate("Stores");
      }
    }
  };

  return { calculateDistance };
};
