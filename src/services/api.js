import axios from "axios";
import { useQuery } from "react-query";

const brandDetailURL = import.meta.env.VITE_OMNIFLO_API;


export const fetchBrandDetails = (brandName) => {


    return useQuery(
      ["brandDetails"],

      () => {
        return axios.get(brandDetailURL + brandName);
      },

      {
        select: (data) => {
           
          const res = data?.data;
          const { name, story, testimonial, rating, logo } = res;

          return { name, story, testimonial, rating, logo };
        },
      }
    );
  };