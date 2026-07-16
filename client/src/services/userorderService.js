import API from "./api";

// ============================
// GET ALL USER ORDERS
// ============================

export const getUserOrders = (userId) => {

    return API.get(`/orders/user/${userId}`);

};

// ============================
// GET SINGLE ORDER
// ============================

export const getOrder = (id) => {

    return API.get(`/orders/${id}`);

};

// ============================
// CREATE ORDER
// ============================

export const createOrder = (data) => {

    return API.post("/orders/create", data);

};