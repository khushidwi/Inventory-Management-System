import API from "./api";

export const getProducts = () => API.get("/products");

export const addProduct = (data) =>
    API.post("/products/add", data);

export const updateProduct = (id, data) =>
    API.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
    API.delete(`/products/${id}`);

export const searchProducts = (keyword) =>
    API.get(`/products/search?keyword=${keyword}`);