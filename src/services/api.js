import axios from "axios";
import { useQuery } from "react-query";

const brandDetailURL = import.meta.env.VITE_SPOTLIGHT_GET


export const fetchBrandDetails = (brandName) => {


    return useQuery(
      ["brandDetails"],

      () => {
        return axios.get(brandDetailURL + brandName);
      },

      {
        select: (data) => {
           
          const res = data?.data;
          const { name,
            story,
            rating_count,
            stores,
            username,
            testimonial,
            rating,
            logo, } = res;

          return { name,
            story,
            rating_count,
            stores,
            username,
            testimonial,
            rating,
            logo, };
        },
      }
    );
  };