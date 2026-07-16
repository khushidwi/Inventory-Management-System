import API from "./api";

export const getOrders = () =>
    API.get("/orders");

export const createOrder = (data) =>
    API.post("/orders/create", data);

export const updateOrder = (id, data) =>
    API.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
    API.delete(`/orders/${id}`);

export const searchOrders = (keyword) =>
    API.get(`/orders/search?keyword=${keyword}`);

export const getUserOrders = (userId) =>
    API.get(`/orders/user/${userId}`);