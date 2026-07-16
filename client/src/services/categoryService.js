import API from "./api";

export const getCategories = () =>
    API.get("/categories");

export const addCategory = (data) =>
    API.post("/categories/add", data);

export const updateCategory = (id, data) =>
    API.put(`/categories/${id}`, data);

export const deleteCategory = (id) =>
    API.delete(`/categories/${id}`);