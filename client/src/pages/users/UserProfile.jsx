import { useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import {
    changePassword,
    updateEmail,
    uploadProfile
} from "../../services/userService";
import { toast } from "react-toastify";

function UserProfile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [newEmail, setNewEmail] = useState(user.email);
    const [emailPassword, setEmailPassword] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const [preview, setPreview] = useState(

        user.profileImage

            ?

            `http://localhost:5000/uploads/${user.profileImage}`

            :

            "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    );

    // ==========================
    // IMAGE
    // ==========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleUploadImage = async () => {

        try {

            const formData = new FormData();

            formData.append("profile", selectedImage);

            formData.append("userId", user.id);

            const res = await uploadProfile(formData);

            const updatedUser = {

                ...user,

                profileImage: res.data.image

            };

            localStorage.setItem(

                "user",

                JSON.stringify(updatedUser)

            );

            toast.success(res.data.message);

            window.location.reload();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Upload Failed"

            );

        }

    };

    // ==========================
    // EMAIL
    // ==========================

    const handleUpdateEmail = async (e) => {

        e.preventDefault();

        try {

            const res = await updateEmail({

                userId: user.id,

                newEmail,

                password: emailPassword

            });

            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );

            toast.success(res.data.message);

            window.location.reload();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Email Update Failed"

            );

        }

    };

    // ==========================
    // PASSWORD
    // ==========================

    const handleChangePassword = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const res = await changePassword({

                userId: user.id,

                currentPassword,

                newPassword

            });

            toast.success(res.data.message);

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password Change Failed"

            );

        }

    };

    return (

        <UserLayout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>User Profile</h3>

                    </div>

                    <div className="card-body">

                        <div className="text-center mb-4">

                            <img

                                src={preview}

                                alt="profile"

                                className="rounded-circle shadow"

                                style={{

                                    width: "160px",

                                    height: "160px",

                                    objectFit: "cover"

                                }}

                            />

                            <div className="mt-3">

                                <input

                                    id="profile"

                                    type="file"

                                    accept="image/*"

                                    style={{ display: "none" }}

                                    onChange={handleImageChange}

                                />

                                <button

                                    className="btn btn-outline-success"

                                    onClick={() =>

                                        document

                                            .getElementById("profile")

                                            .click()

                                    }

                                >

                                    Update Picture

                                </button>

                            </div>

                            {

                                selectedImage &&

                                <button

                                    className="btn btn-success mt-3"

                                    onClick={handleUploadImage}

                                >

                                    Save Picture

                                </button>

                            }

                        </div>

                        <div className="mb-3">

                            <label>Name</label>

                            <input

                                className="form-control"

                                value={user.name}

                                disabled

                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input

                                className="form-control"

                                value={user.email}

                                disabled

                            />

                        </div>

                        <div className="mb-4">

                            <label>Role</label>

                            <input

                                className="form-control"

                                value={user.role}

                                disabled

                            />

                        </div>

                        <hr />

                        <h4>Update Email</h4>

                        <form onSubmit={handleUpdateEmail}>

                            <input

                                className="form-control mb-3"

                                type="email"

                                value={newEmail}

                                onChange={(e)=>setNewEmail(e.target.value)}

                            />

                            <input

                                className="form-control mb-3"

                                type="password"

                                placeholder="Current Password"

                                value={emailPassword}

                                onChange={(e)=>setEmailPassword(e.target.value)}

                            />

                            <button className="btn btn-success">

                                Update Email

                            </button>

                        </form>

                        <hr />

                        <h4>Change Password</h4>

                        <form onSubmit={handleChangePassword}>

                            <input

                                className="form-control mb-3"

                                type="password"

                                placeholder="Current Password"

                                value={currentPassword}

                                onChange={(e)=>setCurrentPassword(e.target.value)}

                            />

                            <input

                                className="form-control mb-3"

                                type="password"

                                placeholder="New Password"

                                value={newPassword}

                                onChange={(e)=>setNewPassword(e.target.value)}

                            />

                            <input

                                className="form-control mb-3"

                                type="password"

                                placeholder="Confirm Password"

                                value={confirmPassword}

                                onChange={(e)=>setConfirmPassword(e.target.value)}

                            />

                            <button className="btn btn-primary">

                                Change Password

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}

export default UserProfile;