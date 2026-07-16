import API from "./api";

export const changePassword = (data) =>
    API.put("/auth/manager/change-password", data);

export const updateEmail = (data) =>
    API.put("/auth/manager/update-email", data);

export const uploadProfile = (formData) =>
    API.put(
        "/auth/manager/upload-profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );