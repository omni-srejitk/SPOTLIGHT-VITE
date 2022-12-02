import axios from 'axios';

const URL = 'https://api.omniflo.in';

export const formInput = async(data) => {
  try{
    return await axios.post(`${URL}/formentry`, data)
  } catch (error){
    console.log('Error while calling form api', error)
    return error.response;
  }
}