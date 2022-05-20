import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const getProductList = () => {
  return axios.get(API_URL + "products.json");
};
const getProductId = (id) => {
  return axios.get(API_URL + "products/" + id + ".json");
};
const createProduct = (productname, qty, notes) => {
    return axios.post(API_URL + "products.json", {
        productname, 
        qty, 
        notes
    });
};

const editProduct = (id, productname, qty, notes) => {
  return axios.put(API_URL + "products/" + id + ".json", {
      productname, 
      qty, 
      notes
  });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + "products/" + id + ".json")
}
export default {
  getProductId,
  getProductList,
  createProduct,
  editProduct,
  deleteProduct
};