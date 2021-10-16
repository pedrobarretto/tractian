import url from "../settings";
import axios from "axios";

export const getAssets = async () => {
  const assets = axios.get(`${url}/assets`)
    .then(x => x.data);
  
  return assets;
};

export const getAssetsById = async (id: string) => {
  const assetsById = axios.get(`${url}/assets/${id}`)
    .then(x => x.data);
  
  return assetsById;
};
