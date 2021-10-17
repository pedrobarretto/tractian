import url from "../settings";
import axios from "axios";

export const getCompanies = async () => {
  const companies = await axios.get(`${url}/companies`)
    .then(x => x.data);
  
  return companies;
};

export const getCompaniesById = async (id: string) => {
  const companiesById = await axios.get(`${url}/companies/${id}`)
    .then(x => x.data);
  
  return companiesById;
};