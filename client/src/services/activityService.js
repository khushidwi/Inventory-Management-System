import API from "./api";

// ===========================
// GET ALL ACTIVITIES
// ===========================

export const getActivities = () => {

    return API.get("/activity");

};

// ===========================
// DELETE ACTIVITY
// ===========================

export const deleteActivity = (id) => {

    return API.delete(`/activity/${id}`);

};

// ===========================
// CLEAR ALL ACTIVITIES
// ===========================

export const clearActivities = () => {

    return API.delete("/activity");

};