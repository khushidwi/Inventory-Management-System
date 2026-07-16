import API from "./api";

export const changePassword = (data) =>
    API.put("/auth/user/change-password", data);

export const updateEmail = (data) =>
    API.put("/auth/user/update-email", data);

export const uploadProfile = (formData) =>
    API.put(
        "/auth/user/upload-profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );