import url from "../settings";
import axios from "axios";

export const getAssets = async () => {
  const assets = await axios.get(`${url}/assets`)
    .then(x => x.data);
  
  return assets;
};

export const getAssetsById = async (id: string) => {
  const assetsById = await axios.get(`${url}/assets/${id}`)
    .then(x => x.data);
  
  return assetsById;
};
