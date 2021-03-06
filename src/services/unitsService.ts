import url from "../settings";
import axios from "axios";

export const getUnits = async () => {
  const units = await axios.get(`${url}/units`)
    .then(x => x.data);
  
  return units;
};

export const getUnitsById = async (id: string) => {
  const unitsById = await axios.get(`${url}/units/${id}`)
    .then(x => x.data);
  
  return unitsById;
};