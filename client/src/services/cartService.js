import API from "./api";

// ==========================
// ADD TO CART
// ==========================

export const addToCart = (data) => {

    return API.post("/cart/add", data);

};

// ==========================
// GET USER CART
// ==========================

export const getCart = (userId) => {

    return API.get(`/cart/${userId}`);

};

// ==========================
// UPDATE CART
// ==========================

export const updateCart = (data) => {

    return API.put("/cart/update", data);

};

// ==========================
// REMOVE ITEM
// ==========================

export const removeCartItem = (data) => {

    return API.delete("/cart/remove", {

        data

    });

};

// ==========================
// CLEAR CART
// ==========================

export const clearCart = (userId) => {

    return API.delete(`/cart/clear/${userId}`);

};